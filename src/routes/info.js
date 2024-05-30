import { Router } from "express";

const router = Router();

// localhost:8000/menu
router.get("/menu", (req, res) => {
  res.send("View menu");
});

// localhost:8000/company
router.get("/company", (req, res) => {
  res.send("View company info");
});

export default router;
