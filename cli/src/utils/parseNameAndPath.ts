import pathModule from 'path';

export const parseNameAndPath = (input: string) => {
  const paths = input.split('/');

  let appName = paths[paths.length - 1];

  // If the user ran `npx create-t3-app .` or similar, the appName should be the current directory
  if (appName === '.') {
    const parsedCwd = pathModule.resolve(process.cwd());
    appName = pathModule.basename(parsedCwd);
  }

  const path = paths.filter((p) => !p.startsWith('@')).join('/');

  return [appName, path] as const;
};
