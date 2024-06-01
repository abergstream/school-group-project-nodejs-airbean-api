const PORT = process.env.PORT;
// const API_KEY = process.env.API_KEY;
import express from "express";
import db from "./src/database/database.js";
import cartRouter from "./src/routes/cart.js";
import menuRouter from "./src/routes/info.js";
import customerRouter from "./src/routes/customer.js";
import ordersRouter from "./src/routes/orders.js";
import confirmationRouter from "./src/routes/confirmation.js";

const app = express();
app.use(express.json());

app.use("/cart", cartRouter);
app.use("/info", menuRouter);
app.use("/customer", customerRouter);
app.use("/orders", ordersRouter);
app.use("/confirmation", confirmationRouter);

// db['cart'].find();
// db['menu'].find();
// db['orders'].find();
// db['users'].find();
// db['company'].find();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
