export const dependencyVersions = {
  // Prisma
  prisma: '^4.9.0',
  '@prisma/client': '^4.9.0',

  // Vite / testing
  vitest: '^0.29.2',
  '@vitejs/plugin-react': 'latest',

  // PWA
  '@ducanh2912/next-pwa': '^8.1.0',
} as const;
export type AvailableDependencies = keyof typeof dependencyVersions;
