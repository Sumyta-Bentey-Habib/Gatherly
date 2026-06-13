import { config } from "../config.js";
import { AppError } from "../utils/errors.js";

export const uploadService = {
  async uploadToImgBB(fileBuffer: Buffer) {
    const base64Image = fileBuffer.toString("base64");
    const imgbbFormData = new FormData();
    imgbbFormData.append("image", base64Image);

    const apiKey = config.IMGBB_API_KEY;
    const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: imgbbFormData,
    });

    if (!imgbbRes.ok) {
      const errorText = await imgbbRes.text();
      console.error("ImgBB upload failed. Status:", imgbbRes.status, "Response:", errorText);
      throw new AppError(imgbbRes.status, `Failed to upload image to ImgBB: ${errorText}`);
    }

    const resData = (await imgbbRes.json()) as any;
    if (!resData.success || !resData.data || !resData.data.url) {
      console.error("ImgBB invalid response format:", resData);
      throw new AppError(500, "Invalid response format from ImgBB");
    }

    return resData.data.url;
  }
};
