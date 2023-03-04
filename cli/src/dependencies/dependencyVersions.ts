export const dependencyVersions = {
  // Prisma
  prisma: '^4.9.0',
  '@prisma/client': '^4.9.0',

  // PWA
  '@ducanh2912/next-pwa': '^8.1.0',
} as const;
export type AvailableDependencies = keyof typeof dependencyVersions;
