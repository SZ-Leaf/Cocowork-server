const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = req.body.name.toLowerCase() || file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        console.log(name + '.' + extension)
        callback(null, name + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('file');