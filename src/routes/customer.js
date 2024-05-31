import express from 'express';
import { register, login } from '../controller/customer.js';
import nedb from 'nedb-promises';
import path from 'path';

const router = express.Router();

// Ange sökvägen till databasfilen relativt till rotkatalogen för projektet
const dbPath = path.join(process.cwd(), 'src', 'database', 'customers.db');

// Skapa en instans av nedb-databasen
const customersDB = nedb.create({ filename: dbPath, autoload: true });

// Logga sökvägen till databasfilen
console.log("Database path:", dbPath);

// Endpunkt för användarregistrering
router.post("/register", register);

// Endpunkt för användarlogin
router.post("/login", login);

// GET-endpunkt för att hämta alla kunder
router.get("/", async (req, res) => {
  try {
      // Här hämtas alla kunder från databasen
      const customers = await customersDB.find({});
      // Skicka tillbaka alla kunder som svar
      res.json(customers);
  } catch (error) {
      // Hantera fel om kunderna inte kan hämtas
      console.error("Error fetching customers:", error);
      res.status(500).json({ error: "Failed to fetch customers" });
  }
});


export default router;
