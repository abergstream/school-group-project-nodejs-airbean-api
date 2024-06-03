import { Router } from "express";

import { showCart } from "../controller/cart.js";
const router = Router();


router.get("/cart", showCart) 

import { addToCart, deleteOrder, deleteItemInOrder } from "../controller/cart.js";
import checkProductExists from "../middleware/checkProductExists.js";

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

//Delete order
router.delete("/", async (req, res) => {
  try{
    const deleteItem = await deleteOrder(req.body._id)
    res.json({message: 'Item deleted successfully', item: deleteItem})
  }catch(error){
    res.status(500).json({message: 'Error deleting item', error: error.message})
  }
});

//Delete item in order
router.delete("/item", async (req, res) => {
  try{
    const deleteItem = await deleteItemInOrder(req.body.cartID, req.body.productID)
    res.json({message: 'Item deleted successfully', item: deleteItem})
  }catch(error){
    res.status(500).json({message: 'Error deleting item', error: error.message})
  }
});

export default router;
