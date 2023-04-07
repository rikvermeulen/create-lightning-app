import { type PackageJson } from 'type-fest';
import { type Installer } from '@/features/index';
import path from 'path';
import fs from 'fs-extra';
import { PKG_ROOT } from '@/utils/getCurrentDir';
import { addPackageDependency } from '@/utils/addDependency';

export const vitestInstaller: Installer = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: ['vitest', '@vitejs/plugin-react'],
    devMode: true,
  });

  const dependenciesDir = path.join(PKG_ROOT, 'template/dependencies');

  // Directory to copy vitest from
  const vitestSrc = path.join(dependenciesDir, 'vitest');

  // Destination to copy vitestSrc to schema vitest
  const vitestDest = path.join(projectDir, '/');

  // add postinstall script to package.json
  const packageJsonPath = path.join(projectDir, 'package.json');

  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;
  packageJsonContent.scripts = {
    ...packageJsonContent.scripts,
    test: 'vitest --passWithNoTests',
  };

  fs.copySync(vitestSrc, vitestDest);
  fs.writeJSONSync(packageJsonPath, packageJsonContent, {
    spaces: 2,
  });
};
