import express from 'express';
import { register, login } from '../controller/customer.js';
import nedb from 'nedb-promises';
import path from 'path';

const router = express.Router();

// Specify the path to the database file relative to the root directory of the project
const dbPath = path.join(process.cwd(), 'src', 'database', 'customers.db');

// Create an instance of the nedb database
const customersDB = nedb.create({ filename: dbPath, autoload: true });

// Log the path to the database file
console.log("Database path:", dbPath);

// Endpoint for user registration
router.post("/register", register);

// Endpoint for user login
router.post("/login", login);

// GET endpoint to fetch all customers
router.get("/", async (req, res) => {
  try {
      // Fetch all customers from the database
      const customers = await customersDB.find({});
      // Send back all customers as a response
      res.json(customers);
  } catch (error) {
      // Handle errors if customers cannot be fetched
      console.error("Error fetching customers:", error);
      res.status(500).json({ error: "Failed to fetch customers" });
  }
});

export default router;