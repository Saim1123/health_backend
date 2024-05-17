import express from "express";
import connectDB from "./config/db.js";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as doctorDetailsRoute } from "./routes/doctorDetailsRoute.js";

const app = express();

app.use(express.json());

connectDB();

app.use("/api/v1", userRoutes);
app.use("/api/v1", doctorDetailsRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
