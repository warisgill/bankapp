import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (process.env.DATABASE_HOST) {
      console.log(`Connecting to local MongoDB for customer-auth at ${process.env.DATABASE_HOST}`);
      const conn = await mongoose.connect(`mongodb://${process.env.DATABASE_HOST}:27017/`);
      console.log(`MongoDB for atm-locator Connected: ${conn.connection.host}`);
    } else {
      console.log(`Connecting to MongoDB Atlas for customer-auth at ${process.env.MONGO_URI}`);
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB for atm-locator Connected: ${conn.connection.host}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
