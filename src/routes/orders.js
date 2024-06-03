import { Router } from "express";
import { getOrdersByCustomerId } from "../controller/order.js";
import authenticate from "../middleware/auth.js";

const router = Router();

//Sök order genom att ange order-id:
//router.get("/:id", authenticate, async (req, res) => {   authenticate för att kolla att sändaren är inloggad.
router.get("/:id", authenticate, async (req, res) => {
  try {
    const order = await getOrdersByCustomerId(req.params.id);
    if (order) {
      res.json({ order })
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
});

export default router;