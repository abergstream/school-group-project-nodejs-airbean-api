import { Router } from "express";
import { showCart } from "../controller/cart.js";
const router = Router();


router.get("/cart", showCart) 

router.post("/", (req, res) => {
  res.send("Add product to cart");
});
router.post("/order", (req, res) => {
  res.send("Place order");
  // placeOrder();
});
router.delete("/", (req, res) => {
  res.send("Remove product from cart");
});

export default router;
