import { Router } from "express";
import { getOrderById } from "../controller/order.js";

const router = Router();

//Sök order genom att ange order-id:
router.get("/:id", async (req, res) => {
  try{
    const order = await getOrderById(req.params.id);
    if (order){
      res.json({order})
    }else {
      res.status(404).json({message: "Order not found"});
    }
  }catch (error){
    res.status(500).json({message: "Error fetching order", error: error.message});
  } 
});


export default router;
