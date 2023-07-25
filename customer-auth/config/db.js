import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(
      ` --- Connecting to MongoDB for customer-auth microservice --- `.cyan
    );

    if (process.env.DATABASE_HOST) {
      console.log(
        `Connecting to local MongoDB at ${process.env.DATABASE_HOST} ...`
      );
      const conn = await mongoose.connect(
        `mongodb://${process.env.DATABASE_HOST}:27017/`
      );
    } else {
      console.log(
        `Connecting to MongoDB Atlas for customer-auth at ${process.env.MONGO_URI}`
      );
      const conn = await mongoose.connect(process.env.MONGO_URI);
    }
    console.log(` --- MongoDB Connected --- `.cyan);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;
