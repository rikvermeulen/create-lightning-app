import { type Installer } from '@/features/index';
import { type AvailableDependencies } from '@/features/dependencyVersions';
import path from 'path';
import fs from 'fs-extra';
import { addPackageDependency } from '@/utils/addDependency';
import { PKG_ROOT } from '@/utils/getCurrentDir';

export const nextAuthInstaller: Installer = ({ projectDir, items }) => {
  const usingPrisma = items?.prisma.inUse;
  const deps: AvailableDependencies[] = ['next-auth'];

  if (usingPrisma) deps.push('@next-auth/prisma-adapter');

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, 'template/dependencies');

  const apiHandlerFile = 'src/pages/api/auth/[...nextauth].ts';
  const apiHandlerSrc = path.join(extrasDir, apiHandlerFile);
  const apiHandlerDest = path.join(projectDir, apiHandlerFile);

  const authConfigSrc = path.join(
    extrasDir,
    'src/server/auth',
    usingPrisma ? 'with-prisma.ts' : 'base.ts'
  );
  const authConfigDest = path.join(projectDir, 'src/server/auth.ts');

  fs.copySync(apiHandlerSrc, apiHandlerDest);
  fs.copySync(authConfigSrc, authConfigDest);
};
