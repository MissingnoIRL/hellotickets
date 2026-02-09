import express from "express";
import router from "./routes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});
