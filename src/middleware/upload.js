const multer = require('multer');

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('Please upload only images.', false);
    }
}

let stroage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/resources/static/assets/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
    }
});

let uploadFile = multer({ storage: stroage, fileFilter: imageFilter });

module.exports = uploadFile;