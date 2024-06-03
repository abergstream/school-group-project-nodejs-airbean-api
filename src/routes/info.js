import { Router } from "express";
import {getCompanyInfo} from "../controller/info.js"

const router = Router();

// localhost:8000/menu
router.get("/menu", (req, res) => {
  res.send("View menu");
});

// localhost:8000/company
router.get("/company", async (req, res) => {
  const info = await getCompanyInfo()
  res.json({info : info})
});

export default router;
