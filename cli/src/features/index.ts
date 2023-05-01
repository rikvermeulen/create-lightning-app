import { type PackageManager } from '@/utils/getUserPackageManager.js';
import { prismaInstaller, vitestInstaller, nextAuthInstaller } from './dependencies/index.js';
import { pwaInstaller } from './miscellaneous/index.js';

export const availableItems = ['prisma', 'vitest', 'nextAuth', 'pwa'] as const;
export type AvailableItems = (typeof availableItems)[number];

export type Installer = (opts: InstallerOptions) => void;

export type InstalledItems = {
  [item in AvailableItems]: {
    inUse: boolean;
    installer: Installer;
  };
};

export interface InstallerOptions {
  projectDir: string;
  packageManager: PackageManager;
  noInstall: boolean;
  items?: InstalledItems;
  projectName?: string;
}

export const dependencies = (items: AvailableItems[]) => {
  const isInUse = (item: string, list: AvailableItems[]) => list.includes(item as AvailableItems);

  return {
    prisma: {
      inUse: isInUse('prisma', items),
      installer: prismaInstaller,
    },
    vitest: {
      inUse: isInUse('vitest', items),
      installer: vitestInstaller,
    },
    nextAuth: {
      inUse: isInUse('nextAuth', items),
      installer: nextAuthInstaller,
    },
    pwa: {
      inUse: isInUse('pwa', items),
      installer: pwaInstaller,
    },
  };
};
