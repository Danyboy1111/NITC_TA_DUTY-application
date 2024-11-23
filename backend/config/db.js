import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error in MongoDB connection: ${error.message}`);
        process.exit(1);
    }
    console.log("Completed the process - nothing more");
  
};

