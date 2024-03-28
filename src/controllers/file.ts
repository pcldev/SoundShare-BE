import multer from 'multer';
import File from '../models/file';
import { AUDIO_ERROR, SERVER_ERROR } from '../types';
import STATUS from '../constants/status';

const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, 'public/files');
  },
  filename: function (request, file, cb) {
    cb(null, Date.now().toString(16) + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  // fileFilter: (request, file, cb) => {
  //   // console.log('request', request)
  //   // console.log('file', file)
  //   cb(null, true)
  // },
}).single('file');

const createFile = async (request, response) => {
  try {
    console.log('creating file');
    await upload(request, response, async (error) => {
      if (error) {
        return response.status(AUDIO_ERROR.UploadError.status).json(AUDIO_ERROR.UploadError);
      }
      const file = request.file;
      if (!file) return response.status(AUDIO_ERROR.UploadError.status).json(AUDIO_ERROR.UploadError);

      const payload = {
        url: file.filename,
        size: file.size,
      };

      const result = await File.create(payload);
      return response.status(STATUS.SUCCESS).json(result);
    });
  } catch (error) {
    console.log('create file', error);
    return response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError);
  }
};

export { createFile };
