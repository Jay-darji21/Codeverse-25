import mongoose from "mongoose";

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONOG_URI);
        console.log("Db connected successfully")
    } catch (error) {
        console.log(error)
    }
}

export default connectDb;