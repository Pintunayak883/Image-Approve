import mongoose from "mongoose";

export const Connection = async (URI) => {
  try {
    await mongoose.connect(URI, { dbName: "ImgBox" });
    console.log("DB Connected..");
  } catch (error) {
    console.log(error);
  }
};
