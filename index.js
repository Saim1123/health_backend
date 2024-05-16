import express from "express";
import connectDB from "./config/db.js";
import { router as doctorRoutes } from "./routes/doctorRoutes.js";

const app = express();

app.use(express.json());

connectDB();

app.use("/api/v1/doctors", doctorRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Home Page",
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
