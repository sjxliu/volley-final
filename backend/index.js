import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//routes
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
// const cors = require('cors'); HATES IT
dotenv.config();

//middleware
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({ origin: true, credentials: true }));

// routes
app.use("/posts", postRoutes);
app.use('/user', userRoutes)

//mongodb
const CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL;

const PORT = process.env.PORT;

// don't need the parser or topology added from trying to debug
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen((PORT, () => console.log(`Port: ${PORT} has risen`))))
  .catch((error) => console.log(error));
