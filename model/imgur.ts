import { ImgurClient } from "imgur";
import * as dotenv from "dotenv";
dotenv.config();

const uploadToImgur = async (imageFile: string): Promise<string> => {
  try {
    const client = new ImgurClient({ clientId: process.env.IMGUR_CLIENT_ID });
    const response = await client.upload({
      image: imageFile,
      title: "game",
      description: "a picture of a game",
      type: "base64",
    });
    return response.data.link;
  } catch (err: any) {
    console.error("Error uploading image to Imgur:", err.message);
    throw err;
  }
};

export = uploadToImgur;
