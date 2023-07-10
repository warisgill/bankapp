import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const host = process.env.DATABASE_HOST || "localhost";
    const conn = await mongoose.connect(`mongodb://root:example@${host}:27017/`);
    // const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB for atm-locator Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
