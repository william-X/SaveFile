import JSZip from 'jszip';

interface IFile {
  content: Blob
  name: string
}

interface IFileFolder {
  name: string
  folders?: IFileFolder[]
  files?: IFile[]
}

export const getFolder = (folder: IFileFolder, zip: JSZip) => {
  const folderObj = zip.folder(folder.name);
  folder.folders?.forEach(f => getFolder(f, folderObj!));
  folder.files?.forEach(f => folderObj!.file(f.name, f.content));
}

export const saveFiles = (fileFolder: IFileFolder) => {
  const zip = new JSZip();
  getFolder(fileFolder, zip);
  zip.generateAsync({ type: "blob" }).then(content => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = "files.zip";
    link.click();
  });
}

