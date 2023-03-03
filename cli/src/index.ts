import { logger } from './utils/logger.js';
import { run } from './cli/index.js';

const main = async () => {
  const {
    name,
    packages,
    flags: { noGit, noInstall, importAlias },
  } = await run();

  console.log(name, packages, noGit, noInstall, importAlias);
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
