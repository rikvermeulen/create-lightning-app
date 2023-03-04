import { type installedPackages } from '../dependencies/index.js';
import { getUserPackageManager } from '../utils/getUserPackageManager.js';
import path from 'path';
import { installPackages } from './installPackages.js';
import { scaffoldProject } from './scaffoldProject.js';

interface CreateProjectOptions {
  projectName: string;
  packages: installedPackages;
  noInstall: boolean;
  importAlias: string;
}

export const createProject = async ({ projectName, packages, noInstall }: CreateProjectOptions) => {
  const packageManager = getUserPackageManager();
  const projectDir = path.resolve(process.cwd(), projectName);

  await scaffoldProject({
    projectName,
    projectDir,
    packageManager,
    noInstall,
  });

  // Install the selected packages
  installPackages({
    projectDir,
    packageManager,
    packages,
    noInstall,
  });

  return projectDir;
};
