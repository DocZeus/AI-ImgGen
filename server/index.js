import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import express from 'express';
import PostRouter from './routes/Posts.js';
import GenerateImageRouter from './routes/GenerateImage.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

//Re-routing
app.use('/api/post', PostRouter);
app.use('/api/generateImage', GenerateImageRouter);

//Error handling
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal server error";
    return res.status(status).json({
        success: false,
        status,
        message,
    })
})

//Default GET
app.get("/", async (req, res) => {
    res.status(200).json({
        message: "Hello",
    })
})

//MongoDB connection
const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => {
            console.error("Failed to connect");
            console.error(err);
        })
}

//Starting Server
const startServer = async () => {
    try {
        connectDB();
        app.listen(8080, () => console.log("Server started on port 8080"));
    } catch (error) {
        console.log(error);
    }
}
startServer();