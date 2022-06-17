import multer from 'multer';

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Math.round(Math.random() * 1000));
  },
});

export const upload = multer({ storage: storage });
