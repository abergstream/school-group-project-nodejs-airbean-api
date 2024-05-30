import db from "../database/database.js";

async function checkProductExists(req, res, next) {
  const productID = req.body.product;
  console.log(productID);
  try {
    const coffeeQuery = await db.menu.findOne({ _id: productID });

    if (!coffeeQuery) {
      return res
        .status(404)
        .json({ error: "Product not found in the database" });
    }

    // Attach the product to the req object
    req.product = coffeeQuery;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error querying the database:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
export default checkProductExists;
