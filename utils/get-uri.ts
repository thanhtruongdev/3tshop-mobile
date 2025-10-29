export const getFileUri = (path: string) => {
    if (!path) return undefined;
    if (path.startsWith("file://")) return path;
    return `file://${path}`;
  };