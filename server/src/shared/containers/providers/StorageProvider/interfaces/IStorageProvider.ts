export type FileType = 'avatar' | 'document' | 'subpart'

export interface IStorageProvider {
  saveFile(filename: string, filetype: FileType): Promise<string>
  deleteFile(filename: string, fileType: FileType): Promise<void>
}
