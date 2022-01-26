import fs from 'fs'
import path from 'path'

import uploadConfig from '@config/upload'

import { IStorageProvider, FileType } from '../interfaces/IStorageProvider'

const directories = {
  avatar: uploadConfig.uploadFolders.avatars,
  document: uploadConfig.uploadFolders.documents,
  subpart: uploadConfig.uploadFolders.subparts
}

export class DiskStorageProvider implements IStorageProvider {
  async saveFile(filename: string, filetype: FileType): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, filename),
      path.resolve(directories[filetype], filename)
    )

    return filename
  }

  async deleteFile(filename: string, fileType: FileType): Promise<void> {
    const filePath = path.resolve(directories[fileType], filename)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}
