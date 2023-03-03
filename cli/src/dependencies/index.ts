export const availablePackages = ['nextAuth', 'prisma', 'tailwind'] as const;
export type AvailablePackages = (typeof availablePackages)[number];

export type installedPackages = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
  };
};

export const dependencies = (packages: AvailablePackages[]) => ({
  nextAuth: {
    inUse: packages.includes('nextAuth'),
    // installer: nextAuthInstaller,
  },
  prisma: {
    inUse: packages.includes('prisma'),
    // installer: prismaInstaller,
  },
  tailwind: {
    inUse: packages.includes('tailwind'),
    // installer: tailwindInstaller,
  },
});
