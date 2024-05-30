import { Router } from "express";
const router = Router();

router.post("/register", (req, res) => {
  res.send("register");
});

router.post("/login", (req, res) => {
  res.send("login");
});

router.post("/orders", (req, res) => {
  res.send("See order history");
});

export default router;
