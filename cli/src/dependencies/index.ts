import { type PackageManager } from '../utils/getUserPackageManager.js';
import { prismaInstaller, pwaInstaller, vitestInstaller } from './installers/index.js';

// This is the type of the available packages
export const availablePackages = ['prisma', 'pwa', 'vitest'] as const;

export type AvailablePackages = (typeof availablePackages)[number];

export type Installer = (opts: InstallerOptions) => void;

// This is the type of the packages object that is passed to the installer functions
export type installedPackages = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: Installer;
  };
};

// This is the type of the options object that is passed to the installer functions
export interface InstallerOptions {
  projectDir: string;
  packageManager: PackageManager;
  noInstall: boolean;
  packages?: installedPackages;
  projectName?: string;
}

// This is the main export of the dependencies folder
export const dependencies = (packages: AvailablePackages[]) => ({
  prisma: {
    inUse: packages.includes('prisma'),
    installer: prismaInstaller,
  },
  vitest: {
    inUse: packages.includes('vitest'),
    installer: vitestInstaller,
  },
  pwa: {
    inUse: packages.includes('pwa'),
    installer: pwaInstaller,
  },
});
