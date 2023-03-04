import { type InstallerOptions, type installedPackages } from '../dependencies/index.js';
import { logger } from '~/utils/logger.js';
import chalk from 'chalk';

type InstallPackagesOptions = {
  packages: installedPackages;
} & InstallerOptions;

export const installPackages = (options: InstallPackagesOptions) => {
  const { packages } = options;

  logger.info('Setting up packages:');

  for (const [name, packageOpts] of Object.entries(packages)) {
    if (packageOpts.inUse) {
      packageOpts.installer(options);

      logger.status(`Successfully setup boilerplate for ${chalk.cyan(name)}`);
    }
  }
};
