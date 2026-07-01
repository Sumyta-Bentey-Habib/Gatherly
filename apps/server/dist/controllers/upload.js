import { uploadService } from "../services/upload.js";
import { asyncHandler, BadRequestError } from "../utils/errors.js";
export const uploadImage = asyncHandler(async (req, res) => {
    const file = req.file;
    if (!file) {
        throw new BadRequestError("No file uploaded");
    }
    const url = await uploadService.uploadToImgBB(file.buffer);
    return res.json({ success: true, url });
});
