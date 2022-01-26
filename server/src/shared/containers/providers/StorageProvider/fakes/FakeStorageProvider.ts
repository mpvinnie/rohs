import { FileType, IStorageProvider } from '../interfaces/IStorageProvider'

type IStorage = {
  avatar: string[]
  document: string[]
  subpart: string[]
}

export class FakeStorageProvider implements IStorageProvider {
  private storage: IStorage = {
    avatar: [],
    document: [],
    subpart: []
  }

  async saveFile(filename: string, filetype: FileType): Promise<string> {
    this.storage[filetype].push(filename)

    return filename
  }

  async deleteFile(filename: string, fileType: FileType): Promise<void> {
    const findIndex = this.storage[fileType].findIndex(
      file => file === filename
    )

    this.storage[fileType].splice(findIndex)
  }
}
