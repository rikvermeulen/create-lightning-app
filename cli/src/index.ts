#!/usr/bin/env node

import { createProject } from '@/helpers/createProject';
import { dependencies } from '@/features/index';
import fs from 'fs-extra';
import { logger } from '@/utils/logger';
import { nextSteps } from '@/helpers/nextSteps';
import { parseNameAndPath } from '@/utils/parseNameAndPath';
import path from 'path';
import { run } from '@/cli/index';

async function main() {
  try {
    // Runs the CLI
    const {
      name,
      packages,
      miscellaneous,
      flags: { noInstall, importAlias },
    } = await run();

    // Validates the name of the project
    const [projectName, projectDir] = parseNameAndPath(name);

    const items = [...packages, ...miscellaneous];

    // Gets the packages that are used
    const usedPackages = dependencies(items);

    // Creates the project
    const project = await createProject({
      projectName: projectDir,
      packages: usedPackages,
      importAlias: importAlias,
      noInstall,
    });

    // Updates the package.json name to the name of the project
    const packageJSONPath = path.join(project, 'package.json');
    const packageJSON = await fs.readJSON(packageJSONPath);
    packageJSON.name = projectName;
    await fs.writeJSON(packageJSONPath, packageJSON, { spaces: 2 });

    // Provides next steps logs for the user
    nextSteps({ projectName: name, items: usedPackages, noInstall });
  } catch (err) {
    logger.error('Aborting installation...');
    if (err instanceof Error) {
      logger.error(err);
    } else {
      logger.error('An unknown error has occurred. Please open an issue on github with the below:');
      console.log(err);
    }
    process.exit(1);
  }
}

void main();
