#!/usr/bin/env node

import { logger } from './utils/logger.js';
import { run } from './cli/index.js';
import { dependencies } from './features/index.js';
import path from 'path';
import fs from 'fs-extra';
import { createProject } from './helpers/createProject.js';
import { parseNameAndPath } from './utils/parseNameAndPath.js';
import { nextSteps } from './helpers/nextSteps.js';

const main = async () => {
  //Runs the CLI
  const {
    name,
    packages,
    miscellaneous,
    flags: { noInstall, importAlias },
  } = await run();

  //Validates the name of the project
  const [projectName, projectDir] = parseNameAndPath(name);

  const items = [...packages, ...miscellaneous];

  //Gets the packages that are used
  const usedPackages = dependencies(items);

  //Creates the project
  const project = await createProject({
    projectName: projectDir,
    packages: usedPackages,
    importAlias: importAlias,
    noInstall,
  });

  //Updates the package.json name to the name of the project
  const packageJSON = fs.readJSONSync(path.join(project, 'package.json'));
  packageJSON.name = projectName;
  fs.writeJSONSync(path.join(project, 'package.json'), packageJSON, {
    spaces: 2,
  });

  //Provides next steps logs for the user
  nextSteps({ projectName: name, items: usedPackages, noInstall });

  process.exit(0);
};

main().catch((err) => {
  logger.error('Aborting installation...');
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error('An unknown error has occurred. Please open an issue on github with the below:');
    console.log(err);
  }
  process.exit(1);
});
