import { type InstalledItems } from '../features/index.js';
import { getUserPackageManager } from '../utils/getUserPackageManager.js';
import path from 'path';
import { installPackages } from './installPackages.js';
import { unpackProject } from './unpackProject.js';

interface CreateProjectOptions {
  projectName: string;
  packages: InstalledItems;
  noInstall: boolean;
  importAlias: string;
}

export const createProject = async ({ projectName, packages, noInstall }: CreateProjectOptions) => {
  const packageManager = getUserPackageManager();
  const projectDir = path.resolve(process.cwd(), projectName);

  // Unpack the project
  await unpackProject({
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
