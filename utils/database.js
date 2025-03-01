import mongoose from "mongoose";

let isConnected = false;

console.log("MONGODB_URI:", process.env.MONGODB_URI);

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB connected!')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt"
        })

        isConnected = true;

        console.log("MongoDB connected")
    } catch (error) {
        console.log(error);
    }
}