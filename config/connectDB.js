import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "User_Task"
        })
        console.log("connected to DB")
    } catch (err) {
        console.log(err);
    }
}


export default connectDB;