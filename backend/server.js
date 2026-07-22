import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import MessageRoutes from "./routes/message.routes.js";

import connectMongDB from "./db/ConnectMongoose.js";
import {app, server} from "./socket/socket.js"

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", MessageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });


server.listen(PORT, () => {
  connectMongDB();
  console.log(`Server running on port ${PORT}`);
});
