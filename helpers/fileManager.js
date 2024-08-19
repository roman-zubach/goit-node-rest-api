import path from "path";
import fs from "fs/promises";
import HttpError from "./HttpError.js";

const save = async (file, dir) => {
    const { filename, originalname, path: oldPath } = file;

    const fullFileName = `${filename}${path.extname(originalname)}`;
    const filePath = path.resolve('public', dir);

    const newPath = path.join(filePath, fullFileName);

    try {
        await fs.rename(oldPath, newPath);
    } catch (error) {
        throw new HttpError(500, 'Failed to save file');
    }

    return `${dir}/${fullFileName}`
}

export default {
    save,
};