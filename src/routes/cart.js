import { Router } from "express";
import { placeOrder } from "../controller/cart.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("View cart");
});

router.post("/", (req, res) => {
  res.send("Add product to cart");
});

router.post("/order", (req, res, next) => {
  placeOrder(req, res, next)
});

router.delete("/", (req, res) => {
  res.send("Remove product from cart");
});

export default router;