export const dependencyVersions = {
  // Prisma
  prisma: '^4.9.0',
  '@prisma/client': '^4.9.0',
} as const;
export type AvailableDependencies = keyof typeof dependencyVersions;
