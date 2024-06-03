import { Router } from "express";
import  getCompanyInfo from "../controller/info.js"

const router = Router();

// localhost:8000/menu
router.get("/menu", (req, res) => {
  res.send("View menu");
});

// localhost:8000/company
router.get("/", async (req, res) => {
  const info = await getCompanyInfo()
  res.json({info: info[0].info})
});

export default router;
