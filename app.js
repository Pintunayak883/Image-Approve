import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Connection } from "./db/db.js";
import ImageRouter from "./routes/ImageRoutes.js";
import router from "./routes/UserRoutes.js";
const app = express();
dotenv.config();

const PORT = process.env.PORT;
const URI = process.env.URI;

app.use(express.json());
app.use(cors());

// Database
Connection(URI);

// Routes
app.use("/", ImageRouter);
app.use("/", router);

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
});
