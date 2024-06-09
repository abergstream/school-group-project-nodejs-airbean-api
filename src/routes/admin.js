import { Router } from "express";
import {createOffering} from '../controller/offerings.js';
import db from '../database/database.js';

const router = Router();


// Endpoint for adding a new offering
router.post("/offering", async (req, res)=>{
  try {
    const { product_1, product_2, title, price } = req.body;

// Fetch all products from the menu
      const products = await db.menu.find({});

// Check if product_1 and product_2 exist in the menu
    const product1Exists = products.some((product) => product.title === product_1);
    const product2Exists = products.some((product) => product.title === product_2);

// If both products exist, proceed with creating the offering
if (product1Exists && product2Exists) {
  await createOffering({ title, product_1, product_2, price });
  res.json({ message: 'New offering added successfully' });
} else {
  // If any of the products are missing, return an error response
  res.status(400).json({ error: 'One or more products are not available' });
}
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Failed to add new offering' });
}
});

export default router;