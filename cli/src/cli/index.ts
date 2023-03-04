import { Command } from 'commander';
import inquirer from 'inquirer';
import { validateName } from '../utils/validate.js';
import glossary from '~/utils/glossary.js';
import { type AvailablePackages } from '~/dependencies/index.js';
import { availablePackages } from '../dependencies/index.js';

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
  importAlias: string;

  /** @internal Used in CI. */
  CI: boolean;
  /** @internal Used in CI. */
  tailwind: boolean;
  /** @internal Used in CI. */
  trpc: boolean;
  /** @internal Used in CI. */
  prisma: boolean;
  /** @internal Used in CI. */
  nextAuth: boolean;
}

interface CLIResults {
  name: string;
  packages: AvailablePackages[];
  flags: CliFlags;
}

const defaultOptions: CLIResults = {
  name: glossary.DEFAULT_NAME,
  packages: ['nextAuth', 'prisma', 'tailwind'],
  flags: {
    noGit: false,
    noInstall: false,
    default: false,
    CI: false,
    tailwind: false,
    trpc: false,
    prisma: false,
    nextAuth: false,
    importAlias: '~/',
  },
};

export const run = async () => {
  const results = defaultOptions;

  const program = new Command().name('create-lightning-app');

  program
    .description('A CLI for creating web applications with the t3 stack')
    .argument(
      '[dir]',
      'The name of the application, as well as the name of the directory to create'
    )
    .option(
      '--noGit',
      'Explicitly tell the CLI to not initialize a new git repo in the project',
      false
    )
    .option(
      '--noInstall',
      "Explicitly tell the CLI to not run the package manager's install command",
      false
    )
    .version('', '-v, --version', 'Display the version number')
    .parse(process.argv);

  const cliProvidedName = program.args[0];
  if (cliProvidedName) {
    results.name = cliProvidedName;
  }

  results.flags = program.opts();

  results.name = await promptName();
  results.packages = await promptPackages();

  return results;
};

const promptName = async (): Promise<string> => {
  const { name } = await inquirer.prompt<Pick<CLIResults, 'name'>>({
    name: 'name',
    type: 'input',
    message: 'What will be the name of your project?',
    default: defaultOptions.name,
    validate: validateName,
    transformer: (input: string) => {
      return input.trim();
    },
  });

  return name;
};

const promptPackages = async (): Promise<AvailablePackages[]> => {
  const { packages } = await inquirer.prompt<Pick<CLIResults, 'packages'>>({
    name: 'packages',
    type: 'checkbox',
    message: 'Which packages would you like to enable?',
    choices: availablePackages.map((packageName) => ({
      name: packageName,
      checked: false,
    })),
  });

  return packages;
};
