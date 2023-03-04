#!/usr/bin/env node

import { logger } from './utils/logger.js';
import { run } from './cli/index.js';
import { dependencies } from './dependencies/index.js';
import path from 'path';
import fs from 'fs-extra';
import { createProject } from './helpers/createProject.js';
import { parseNameAndPath } from './utils/parseNameAndPath.js';

const main = async () => {
  const {
    name,
    packages,
    flags: { noGit, noInstall, importAlias },
  } = await run();

  const [projectName, projectDir] = parseNameAndPath(name);

  const usedPackages = dependencies(packages);

  const project = await createProject({
    projectName: projectDir,
    packages: usedPackages,
    importAlias: importAlias,
    noInstall,
  });

  const packageJSON = fs.readJSONSync(path.join(project, 'package.json'));

  packageJSON.name = projectName;

  fs.writeJSONSync(path.join(project, 'package.json'), packageJSON, {
    spaces: 2,
  });

  if (!noGit) {
    logger.info('Initializing git repository...');
  }

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
