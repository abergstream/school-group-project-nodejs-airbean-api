const PORT = process.env.PORT;
// const API_KEY = process.env.API_KEY;
import express from "express";
import db from "./src/database/database.js";
const app = express();
app.use(express.json());

// db["menu"].insert({ Meny1: "Hejhej" });
// db["categories"].insert({ Fika: "Bulle" });
// db["history"].insert({ "Order 1": "hejhej" });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
