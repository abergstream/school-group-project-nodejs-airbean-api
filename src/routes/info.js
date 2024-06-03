import { Router } from "express";
import { getAllProducts } from "../controller/menu.js";

const router = Router();


router.get("/menu", getAllProducts) 

router.get("/company", (req, res) => {
  res.send("View company info");
});

export default router;
