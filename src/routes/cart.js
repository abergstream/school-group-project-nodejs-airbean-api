import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("View cart");
});
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
