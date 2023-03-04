import { type InstallerOptions } from '../dependencies/index.js';
import { getUserPackageManager } from '~/utils/getUserPackageManager.js';
import { logger } from '~/utils/logger.js';
import glossary from '~/utils/glossary.js';

// This logs the next steps that the user should take in order to advance the project
export const nextSteps = ({
  projectName = glossary.DEFAULT_NAME,
  packages,
  noInstall,
}: Pick<InstallerOptions, 'projectName' | 'packages' | 'noInstall'>) => {
  const packageManager = getUserPackageManager();

  logger.info('\nNext steps:');
  logger.status(`  cd ${projectName}`);

  // To reflect yarn's default behavior of installing packages when no additional args provided
  if (noInstall && packageManager !== 'yarn') {
    logger.status(`  ${packageManager} install`);
  }

  if (packages?.prisma.inUse) {
    logger.status(`  ${packageManager === 'npm' ? 'npx' : packageManager} prisma db push`);
  }

  logger.status(`  ${packageManager === 'npm' ? 'npm run' : packageManager} dev`);
};
