import multer from 'multer';
const UPLOAD_DIR = process.env.UPLOAD_DIR;

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, UPLOAD_DIR);
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now().toString()}_${file.originalname}`);
//   },
// });

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      return cb(null, true);
    }
    // cb(new Error("Формат файла не підтримується!"));
    const error = new Error('Формат файла не підтримується!');
    error.status = 400;
    cb(error);
  },
});
