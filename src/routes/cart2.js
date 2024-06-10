import express from "express";
import { getAllCarts, createCart, deleteCart } from "../controller/cart2.js";
import checkIfProductExists from '../middleware/checkIfProductExists.js';
import {validateCart} from '../middleware/validateCart.js';

const router = express.Router();

//Show all carts 
router.get('/',  async(req, res)=> {
const carts = await getAllCarts();
res.json({carts:carts});
})

//Add product in a new cart. Check that product exist in menu. 
router.post('/',validateCart, checkIfProductExists, (req,res)=>{
  
  createCart(req.body);
  res.json({message : "Cart created"})
});

// Delete cart by id
router.delete('/:id', (req,res)=> {
  deleteCart(req.params.id);
  res.json({message : "Cart removed."});
});

export default router;