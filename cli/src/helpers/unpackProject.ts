import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import { type InstallerOptions } from '../features/index.js';
import { logger } from '~/utils/logger.js';
import { PKG_ROOT } from '../utils/getCurrentDir.js';
import chalk from 'chalk';

interface ActionChoices {
  action: 'abort' | 'clear' | 'overwrite';
  confirmAction: boolean;
}

export const unpackProject = async (options: InstallerOptions): Promise<void> => {
  const { projectName, projectDir } = options;
  const templateDir = path.join(PKG_ROOT, 'template/base');

  await checkAndHandleExistingDir(projectDir, projectName);

  logger.info(`\nInstalling project in: \n${chalk.underline.white(projectDir)}\n`);

  await fs.copySync(templateDir, projectDir, { filter: filterOnRemoveTemplateFiles });

  const scaffoldedName = projectName === '.' ? 'App' : projectName;
  console.log(`Installation for ${chalk.cyan(scaffoldedName)} completed!\n`);
};

async function checkAndHandleExistingDir(
  dir: string,
  projectName: string | undefined
): Promise<void> {
  if (fs.existsSync(dir) && fs.readdirSync(dir).length !== 0) {
    await handleNonEmptyDir(dir, projectName);
  } else if (projectName !== '.') {
    logger.info(`${projectName} already exists but it is empty, continuing...\n`);
  }
}

async function handleNonEmptyDir(dir: string, projectName: string | undefined): Promise<void> {
  const { action, confirmAction } = await promptUserForAction(projectName);

  if (!confirmAction || action === 'abort') {
    console.error('Aborting installation...');
    process.exit(1);
  }

  if (action === 'clear') {
    console.info(`Emptying ${projectName} and creating a lightning app\n`);
    fs.emptyDirSync(dir);
  }
}

async function promptUserForAction(projectName: string | undefined): Promise<ActionChoices> {
  const { action } = await inquirer.prompt<{ action: 'abort' | 'clear' | 'overwrite' }>({
    name: 'action',
    type: 'list',
    message: `Warning: ${projectName} already exists and contains files. How would you like to proceed?`,
    choices: [
      { name: 'Abort installation (recommended)', value: 'abort', short: 'Abort' },
      { name: 'Clear the directory and continue installation', value: 'clear', short: 'Clear' },
      {
        name: 'Continue installation and overwrite conflicting files',
        value: 'overwrite',
        short: 'Overwrite',
      },
    ],
    default: 'abort',
  });

  const { confirmAction } = await inquirer.prompt<{ confirmAction: boolean }>({
    name: 'confirmAction',
    type: 'confirm',
    message: `Are you sure you want to ${
      action === 'clear' ? 'clear the directory' : 'overwrite conflicting files'
    }?`,
    default: false,
  });

  return { action, confirmAction };
}

function filterOnRemoveTemplateFiles(src: string): boolean {
  return !src.includes('.github');
}