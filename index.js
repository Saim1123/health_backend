import express from "express";
import fs from "fs";
import connectDB from "./config/db.js";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as doctorDetailsRoute } from "./routes/doctorDetailsRoute.js";
import HttpError from "./models/Http-error.js";
import cors from "cors";

const app = express();

app.use(express.json());

connectDB();

app.use(
  cors({
    origin: ["http://localhost:5000", "*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    // replace with frontend origin
    credentials: true, // allow credentials (cookies, authorization headers )
  })
);

app.use("/api/v1", userRoutes);
app.use("/api/v1", doctorDetailsRoute);

app.get("/", (req, res) => {
  res.send("working...");
});

app.use((req, res, next) => {
  const error = new HttpError("This route is not found", 404);
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log("err>>", err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "unknown error occured" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
