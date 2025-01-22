import { Nitro } from "nitropack";
import mongoose from "mongoose";

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/simple-life");
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error(e);
  }
};