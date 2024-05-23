import Image from "../models/ImageSchema.js";
import cloudnery from "cloudinary";
class ImageController {
  static UploadImage = async (req, res) => {
    try {
      const { url, publicId, Description } = req.body;
      console.log(publicId);
      const newImage = new Image({ url, publicId, Description });
      await newImage.save();
      res.status(201).json({
        message: "Image uploaded successfully.",
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };

  static GetAdminImage = async (req, res) => {
    try {
      const Images = await Image.find({ approved: false });
      return res
        .status(200)
        .json({ message: "Uploaded Images by Users", Images });
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  static ApproveImage = async (req, res) => {
    try {
      const { id, approved } = req.body;
      const updatedImage = await Image.findByIdAndUpdate(id, { approved });
      if (!updatedImage) {
        return res.status(404).json({ message: "Image not found" });
      }
      // If the image was approved, send a success message
      if (approved) {
        return res.status(200).json({ message: "Image approved successfully" });
      } else {
        // If the image was denied, send a different message
        return res.status(200).json({ message: "Image denied" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  static deleteImage = async (req, res) => {
    try {
      const { id } = req.params;
      // const { imgUrl, publicId } = req.body;
      const data = await Image.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "Image Deleted Successfully.", data });
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  static GetAllImages = async (req, res) => {
    try {
      const Images = await Image.find({ approved: true });
      if (!Images) {
        return res.status(404).json({ message: "Image Not Found." });
      } else {
        return res
          .status(200)
          .json({ message: "Images fetch Successfully.", Images });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}

export default ImageController;
