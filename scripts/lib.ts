export const getSlidePaths = async () => {
  const paths: string[] = [];
  for await (const dirEntry of Deno.readDir(`${Deno.cwd()}/slides`)) {
    paths.push(dirEntry.name);
  }
  return paths;
};
