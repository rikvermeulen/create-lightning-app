//Validate a string against allowed package.json names
export const validateName = (input: string) => {
  const RegExp = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
  const paths = input.split('/');

  let name = paths[paths.length - 1];

  if (RegExp.test(name ?? '')) {
    return true;
  } else {
    return "the name must consist of only lowercase alphanumeric characters or '-' and '_'";
  }
};
