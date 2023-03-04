import { type PackageManager } from '../utils/getUserPackageManager.js';
import { prismaInstaller } from './installers/primsa.js';

export const availablePackages = ['nextAuth', 'prisma', 'tailwind'] as const;
export type AvailablePackages = (typeof availablePackages)[number];

export type Installer = (opts: InstallerOptions) => void;

export type installedPackages = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: Installer;
  };
};

export const tailwindInstaller: Installer = ({ projectDir }) => {
  console.log(projectDir);
};

export interface InstallerOptions {
  projectDir: string;
  packageManager: PackageManager;
  noInstall: boolean;
  packages?: installedPackages;
  projectName?: string;
}

export const dependencies = (packages: AvailablePackages[]) => ({
  nextAuth: {
    inUse: packages.includes('nextAuth'),
    installer: tailwindInstaller,
  },
  prisma: {
    inUse: packages.includes('prisma'),
    installer: prismaInstaller,
  },
  tailwind: {
    inUse: packages.includes('tailwind'),
    installer: tailwindInstaller,
  },
});
