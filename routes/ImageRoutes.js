import express from "express";
import ImageController from "../controllers/ImageController.js";
const ImageRouter = express.Router();

ImageRouter.get("/", ImageController.GetAllImages);
ImageRouter.post("/upload", ImageController.UploadImage);
ImageRouter.get("/getImages", ImageController.GetAdminImage);
ImageRouter.put("/approve", ImageController.ApproveImage);
ImageRouter.delete("/delete/:id", ImageController.deleteImage);

export default ImageRouter;
