export const dependencyVersions = {
  // Prisma
  prisma: '^4.9.0',
  '@prisma/client': '^4.9.0',

  // Vite / testing
  vitest: '^0.29.2',
  '@vitejs/plugin-react': 'latest',
  '@testing-library/react': '^14.0.0',

  // NextAuth
  'next-auth': '^4.21.0',
  '@next-auth/prisma-adapter': '^1.0.5',

  // PWA
  '@ducanh2912/next-pwa': '^8.1.0',
} as const;
export type AvailableDependencies = keyof typeof dependencyVersions;
