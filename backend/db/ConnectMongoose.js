import mongoose from "mongoose";

const connectMongDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongDB", error.message);
  }
};

export default connectMongDB;