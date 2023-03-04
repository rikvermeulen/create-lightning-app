import { type InstallerOptions, type installedPackages } from '../dependencies/index.js';
import { logger } from '~/utils/logger.js';

type InstallPackagesOptions = {
  packages: installedPackages;
} & InstallerOptions;
// This runs the installer for all the packages that the user has selected
export const installPackages = (options: InstallPackagesOptions) => {
  const { packages } = options;
  logger.info('Adding boilerplate...');

  for (const [name, pkgOpts] of Object.entries(packages)) {
    if (pkgOpts.inUse) {
      pkgOpts.installer(options);

      console.log(`Successfully setup boilerplate for ${name}`);
    }
  }

  logger.info('');
};
