import path from 'path';
import fs from 'fs-extra';
import { type PackageJson } from 'type-fest';
import { dependencyVersions, type AvailableDependencies } from '../features/dependencyVersions.js';
import sortPackageJson from 'sort-package-json';

export const addPackageDependency = (opts: {
  dependencies: AvailableDependencies[];
  devMode: boolean;
  projectDir: string;
}) => {
  const { dependencies, devMode, projectDir } = opts;

  const pkgJson = fs.readJSONSync(path.join(projectDir, 'package.json')) as PackageJson;

  dependencies.forEach((pkgName) => {
    const version = dependencyVersions[pkgName];

    if (devMode && pkgJson.devDependencies) {
      pkgJson.devDependencies[pkgName] = version;
    } else if (pkgJson.dependencies) {
      pkgJson.dependencies[pkgName] = version;
    }
  });
  const sortedPkgJson = sortPackageJson(pkgJson);

  fs.writeJSONSync(path.join(projectDir, 'package.json'), sortedPkgJson, {
    spaces: 2,
  });
};
