import multer from 'multer';

const upload = multer({
  limits: {
    fileSize: 1000000, // 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an Image!'));
    }
    cb(undefined, true);
  },
});

export default upload;
