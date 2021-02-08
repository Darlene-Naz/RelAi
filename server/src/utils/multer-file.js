import Multer, { diskStorage } from 'multer';

let storage = diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

const multer = Multer({
    storage: storage,
});

export default multer;