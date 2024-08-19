import multer from "multer";
import HttpError from "../helpers/HttpError.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'temp');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png'];

    if (!allowedMimeTypes.includes(file.mimetype)) return cb(HttpError(400, 'Invalid file type. Only JPG and PNG files are allowed.'), false);

    cb(null, true);
};

const limits = {
    fileSize: 1024 * 1024 * 5,
};

const upload = multer({storage, fileFilter, limits});

export default upload;
