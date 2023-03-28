import { type PackageJson } from 'type-fest';
import { type Installer } from '../index.js';
import path from 'path';
import fs from 'fs-extra';
import { PKG_ROOT } from '../../utils/getCurrentDir.js';
import { addPackageDependency } from '../../utils/addDependency.js';

export const pwaInstaller: Installer = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: ['@ducanh2912/next-pwa'],
    devMode: true,
  });
  const extrasDir = path.join(PKG_ROOT, 'template/miscellaneous/pwa');

  const configSrc = path.join(extrasDir, '/next.config.js');
  const configDest = path.join(projectDir, '/next.config.js');

  const packageJsonPath = path.join(projectDir, 'package.json');
  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;
  packageJsonContent.scripts = {
    ...packageJsonContent.scripts,
  };

  fs.copySync(configSrc, configDest);
  fs.writeJSONSync(packageJsonPath, packageJsonContent, {
    spaces: 2,
  });
};
