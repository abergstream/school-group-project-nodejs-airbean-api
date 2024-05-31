
import crypto from 'crypto';
import database from '../database/database.js'; // Byt ut 'din-database-fil.js' mot den fil där du har skapat databasinstanser

// Hashfunktion för lösenord
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Registrera en ny användare
export const register = async (req, res) => {
    const { username, email, password, phone } = req.body;
    try {
        // Lägg till användaren i databasen
        const newUser = await database.customers.insert({ username, email, password: hashPassword(password), phone });
        console.log("New user registered:", newUser); // Logga den nya användaren
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error); // Logga eventuella fel
        res.status(500).json({ error: "Failed to register user" });
    }
};


// Logga in en användare
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Hämta användaren från databasen baserat på e-postadressen
        const user = await database.customers.findOne({ email });
        if (!user) {
            console.log("User not found for email:", email);
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const hashedPassword = hashPassword(password);
        if (hashedPassword !== user.password) {
            console.log("Invalid password for user:", email);
            return res.status(400).json({ error: "Invalid email or password" });
        }
        console.log("User logged in successfully:", user.email);
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Failed to login user" });
    }
};


// Middleware för autentisering (om det behövs)
export const auth = (req, res, next) => {
  // Implementera autentiseringslogik här om det behövs
  next();
};
