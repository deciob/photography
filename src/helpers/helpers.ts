export function getImageName(path: string) {
  // Get everything after the last '/'
  const fileName = path.split("/").pop();
  // Remove the extension (everything after and including the last '.')
  const lastSplit = fileName?.split(".");
  if (lastSplit) {
    return lastSplit[0];
  }
  return "";
}
