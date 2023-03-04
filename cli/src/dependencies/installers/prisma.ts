import { type PackageJson } from 'type-fest';
import { type Installer } from '../index.js';
import path from 'path';
import fs from 'fs-extra';
import { PKG_ROOT } from '../../utils/getCurrentDir.js';
import { addPackageDependency } from '../../utils/addDependency.js';

export const prismaInstaller: Installer = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: ['prisma'],
    devMode: true,
  });
  addPackageDependency({
    projectDir,
    dependencies: ['@prisma/client'],
    devMode: false,
  });

  const dependenciesDir = path.join(PKG_ROOT, 'template/dependencies');

  // Directory to copy prisma from
  const prismaSrc = path.join(dependenciesDir, 'prisma', 'base.prisma');

  // Destination to copy prismaSrc to schema prisma
  const prismaDest = path.join(projectDir, 'prisma/schema.prisma');

  // add postinstall script to package.json
  const packageJsonPath = path.join(projectDir, 'package.json');

  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;
  packageJsonContent.scripts = {
    ...packageJsonContent.scripts,
    postinstall: 'prisma generate',
  };

  fs.copySync(prismaSrc, prismaDest);
  fs.writeJSONSync(packageJsonPath, packageJsonContent, {
    spaces: 2,
  });
};
