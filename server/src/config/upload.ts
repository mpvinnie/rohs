import crypto from 'crypto'
import multer from 'multer'
import path from 'path'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

const multerConfig = {
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const filename = `${fileHash}-${file.originalname
        .trim()
        .split(' ')
        .join('-')}`

      return callback(null, filename)
    }
  })
}

const upload = multer(multerConfig)

export default {
  tmpFolder,

  uploadFolders: {
    avatars: path.resolve(tmpFolder, 'uploads', 'avatars'),
    documents: path.resolve(tmpFolder, 'uploads', 'documents'),
    subparts: path.resolve(tmpFolder, 'uploads', 'subparts')
  },

  upload
}
