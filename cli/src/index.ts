import { logger } from './utils/logger.js';
import { run } from './cli/index.js';
import { dependencies } from './dependencies/index.js';
import path from 'path';
import fs from 'fs-extra';
import { createProject } from './helpers/createProject.js';

const main = async () => {
  const {
    name,
    packages,
    flags: { noGit, noInstall, importAlias },
  } = await run();

  const usedPackages = dependencies(packages);

  const project = await createProject({
    projectName: name,
    packages: usedPackages,
    importAlias: importAlias,
    noInstall,
  });

  const pkgJson = fs.readJSONSync(path.join(project, 'package.json'));
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
