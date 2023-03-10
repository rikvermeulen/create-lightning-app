import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import { type InstallerOptions } from '../dependencies/index.js';
import { logger } from '~/utils/logger.js';
import { PKG_ROOT } from '../utils/getCurrentDir.js';
import chalk from 'chalk';

// This bootstraps the base Next.js application
export const unpackProject = async ({
  // packageManager,
  // noInstall
  projectName,
  projectDir,
}: InstallerOptions) => {
  const templateDir = path.join(PKG_ROOT, 'template/base');

  // Check if the directory already exists
  if (fs.existsSync(projectDir)) {
    await checkIfDirExist(projectDir, projectName);
  }

  logger.info(`\nInstalling project in: \n${chalk.underline.white(projectDir)}\n`);

  // Copy the template directory to the project directory
  await fs.copySync(templateDir, projectDir, { filter: filterOnRemoveTemplateFiles });

  // This is the name of the scaffolded project
  const scaffoldedName = projectName === '.' ? 'App' : projectName;

  console.log(`Installation for ${chalk.cyan(scaffoldedName)} completed!\n`);
};

// This checks if the directory already exists and if it does, it asks the user how to proceed
async function checkIfDirExist(dir: string, projectName: string | undefined) {
  if (fs.readdirSync(dir).length === 0) {
    if (projectName !== '.')
      logger.info(`${projectName} already exists but it is empty, continuing...\n`);
  } else {
    const { action } = await inquirer.prompt<{
      action: 'abort' | 'clear' | 'overwrite';
    }>({
      name: 'action',
      type: 'list',
      message: `${'Warning:'} ${projectName} already exists and contains files. How would you like to proceed?`,
      choices: [
        {
          name: 'Abort installation (recommended)',
          value: 'abort',
          short: 'Abort',
        },
        {
          name: 'Clear the directory and continue installation',
          value: 'clear',
          short: 'Clear',
        },
        {
          name: 'Continue installation and overwrite conflicting files',
          value: 'overwrite',
          short: 'Overwrite',
        },
      ],
      default: 'abort',
    });

    const { confirmAction } = await inquirer.prompt<{
      confirmAction: boolean;
    }>({
      name: 'confirmAction',
      type: 'confirm',
      message: `Are you sure you want to ${
        action === 'clear' ? 'clear the directory' : 'overwrite conflicting files'
      }?`,
      default: false,
    });

    if (!confirmAction || action === 'abort') {
      console.error('Aborting installation...');
      process.exit(1);
    }

    if (action === 'clear') {
      console.info(`Emptying ${projectName} and creating an lightning app\n`);
      fs.emptyDirSync(dir);
    }
  }
}

//filter out the template files
function filterOnRemoveTemplateFiles(src: string) {
  if (src.includes('.github')) return false;
  return true;
}
