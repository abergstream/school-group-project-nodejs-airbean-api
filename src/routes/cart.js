import { Router } from "express";
import { addToCart } from "../controller/cart.js";
import checkProductExists from "../middleware/checkProductExists.js";
const router = Router();

router.get("/", (req, res) => {
  res.send("View cart");
});
router.post("/", checkProductExists, (req, res, next) => {
  addToCart(req, res, next);
  // res.send("Den finns");
});
router.post("/order", (req, res) => {
  res.send("Place order");
  // placeOrder();
});
router.delete("/", (req, res) => {
  res.send("Remove product from cart");
});

export default router;
