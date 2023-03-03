import { type installedPackages } from '../dependencies/index.js';
import path from 'path';

interface CreateProjectOptions {
  projectName: string;
  packages: installedPackages;
  noInstall: boolean;
  importAlias: string;
}

export const createProject = async ({ projectName, packages, noInstall }: CreateProjectOptions) => {
  const projectDir = path.resolve(process.cwd(), projectName);

  return projectDir;
};
