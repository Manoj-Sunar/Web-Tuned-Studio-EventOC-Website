import mongoose from "mongoose";

/**
 * Connect to MongoDB using Mongoose
 */

export const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("❌ MONGO_URI is not defined in environment variables");
    }

    // Mongoose recommended options
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      maxPoolSize: 10,        // Better performance in production
      serverSelectionTimeoutMS: 5000, // Fail fast if DB is unreachable
    });

    console.log(`🟢 MongoDB Database Connected with my server: ${conn.connection.host}`);
  } catch (error) {
    console.error(`🔴 MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Stop the app if DB connection fails
  }
};
