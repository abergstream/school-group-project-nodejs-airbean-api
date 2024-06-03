import express from 'express';
import { register, login } from '../controller/customer.js';
import customersDB from '../database/database.js';

const router = express.Router();

// Endpoint for user registration
router.post("/register", register);

// Endpoint for user login

router.post('/login', (req, res) => {  // Korrekt sökväg och metod
    const { username } = req.body;
    
    if (username) {  // Kontrollera att användarnamn är angivet
      global.currentUser = { username };  // Sätt global currentUser med användarnamn
      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: global.currentUser
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Username is required'
      });
    }
  });


// GET endpoint to fetch all customers
router.get("/", async (req, res) => {
    try {
        // Fetch all customers from the database
        const customers = await customersDB.customers.find({});
        if (customers) {
            // Send back all customers as a response
            res.json(customers);
        } else {
            // No customers found
            res.status(404).json({ error: "No customers found" });
        }
    } catch (error) {
        // Handle errors if customers cannot be fetched
        console.error("Error fetching customers:", error);
        res.status(500).json({ error: "Failed to fetch customers" });
    }
});

export default router;