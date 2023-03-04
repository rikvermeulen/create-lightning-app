import { type PackageManager } from '../utils/getUserPackageManager.js';
import { prismaInstaller, pwaInstaller } from './installers/index.js';

export const availablePackages = ['prisma', 'pwa'] as const;
export type AvailablePackages = (typeof availablePackages)[number];

export type Installer = (opts: InstallerOptions) => void;

export type installedPackages = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: Installer;
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const tailwindInstaller: Installer = ({ projectDir }) => {};

export interface InstallerOptions {
  projectDir: string;
  packageManager: PackageManager;
  noInstall: boolean;
  packages?: installedPackages;
  projectName?: string;
}

export const dependencies = (packages: AvailablePackages[]) => ({
  prisma: {
    inUse: packages.includes('prisma'),
    installer: prismaInstaller,
  },
  pwa: {
    inUse: packages.includes('pwa'),
    installer: pwaInstaller,
  },
});
