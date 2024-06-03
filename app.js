import express from "express";
import cartRouter from "./src/routes/cart.js";
import menuRouter from "./src/routes/info.js";
import customerRouter from "./src/routes/customer.js";
import loggerMiddleware from "./src/middleware/logger.js";
import errorHandlerMiddleware from "./src/middleware/errorHandler.js";
import ordersRouter from "./src/routes/orders.js";
import confirmationRouter from "./src/routes/confirmation.js";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(loggerMiddleware)

app.use("/cart", cartRouter);
app.use("/info", menuRouter);
app.use("/customer", customerRouter);
app.use("/orders", ordersRouter);
app.use("/confirmation", confirmationRouter);

app.get('/error', (req, res, next) => {
  const error = new Error('Page not found');
  error.status = 404;
  next(error);
});

app.use(errorHandlerMiddleware)

// db['cart'].find();
// db['menu'].find();
// db['orders'].find();
// db['users'].find();
// db['company'].find();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
