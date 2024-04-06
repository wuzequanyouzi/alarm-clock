const { fs, nodePath } = window;

export const getUrlByFile = (localPath: string) => {
  return fs.readFile(localPath).then((res: any) => {
    const fileBuffer = res.buffer;
    const url = URL.createObjectURL(new Blob([fileBuffer]));
    return url;
  })
};
