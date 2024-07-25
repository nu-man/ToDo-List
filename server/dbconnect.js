import mongoose from "mongoose";

async function connectDB(){
    try {
       await mongoose.connect(`mongodb+srv://numan:1234@cluster0.bcvpioi.mongodb.net/`);
       console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}
connectDB();

export default connectDB