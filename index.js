import express from "express";
import connectDB from "./config/db.js";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as doctorDetailsRoute } from "./routes/doctorDetailsRoute.js";
import HttpError from "./models/Http-error.js";

const app = express();

app.use(express.json());

connectDB();

app.use("/api/v1", userRoutes);
app.use("/api/v1", doctorDetailsRoute);

app.use((req, res, next) => {
  const error = new HttpError("This route is not found", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "unknown error occured" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
