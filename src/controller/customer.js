import database from "../database/database.js";
//import crypto from "crypto";

// Hash function for password
/*const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};*/

// Register a new user
const register = async (req, res) => {
  const user = req.body;
  try {
    // Check if the email already exists
    const existingEmail = await database.customers.findOne({ email:user.email });
    if (existingEmail) {
      console.log("E-mail already in use:", user.email);
      return res.status(400).json({ error: "E-mail already in use" });
    }

    // Check if the username already exists
    const existingUsername = await database.customers.findOne({ username:user.username });
    if (existingUsername) {
      console.log("Username already in use:", user.username);
      return res.status(400).json({ error: "Username already in use" });
    }

    // Add the new user to the database
    const newUser = await database.customers.insert(user);
    console.log("New user registered:", newUser); // Log the new user
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error); // Log any errors
    res.status(500).json({ error: "Failed to register user" });
  }
};

// Log in a user
const login = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Retrieve the user from the database based on either email or username
    const user = await database.customers.findOne({ $or: [{ email: email }, { username: username }] });
    if (!user) {
      console.log("User not found for email or username:",  email || username);
      return res.status(400).json({ error: "Invalid email or password" });
    }

      // Compare the provided password with the stored password
      if (password !== user.password) {
        console.log("Invalid password for user:", email || username);
        return res.status(400).json({ error: "Invalid email or username or password" });
      }

    /*const hashedPassword = hashPassword(password);
    if (hashedPassword !== user.password) {
      console.log("Invalid password for user:", email);
      return res.status(400).json({ error: "Invalid email or password" });
    }*/
    console.log("User logged in successfully:", user.email);
    global.currentUser = user.username;
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Failed to login user" });
  }
};

const logout = async (req, res) => {
  global.currentUser = null;
  res.json({ message: 'Logout successful' });
};

async function deleteUser(id) {
  try {
    const result = await database.customers.deleteOne({ _id: id });
    console.log(`${result.deletedCount} document(s) deleted`);
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

export { register, login, logout, deleteUser };