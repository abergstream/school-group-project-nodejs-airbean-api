const PORT = process.env.PORT;
// const API_KEY = process.env.API_KEY;
import express from "express";
import db from "./src/database/database.js";
const app = express();
app.use(express.json());

// db['cart'].find();
// db['menu'].find();
// db['orders'].find();
// db['users'].find();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
