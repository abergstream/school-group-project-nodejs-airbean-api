import db from "../database/database.js";

async function checkProductExists(req, res, next) {
  const productID = req.body.product;
  const customerID = req.body.customerID;
  const cartID = req.body.cartID;
  console.log(productID);
  try {
    const productQuery = await db.menu.findOne({ _id: productID });

    if (!productQuery) {
      return res
        .status(404)
        .json({ error: "Product not found in the database" });
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
  if (cartID && customerID) {
    try {
      const cartQuery = await db.cart.findOne({
        _id: cartID,
        customerID: customerID,
      });
      if (!cartQuery) {
        return res.status(404).json({
          error: "Cart with customerID and cartID  not found in database",
        });
      }
    } catch (error) {
      console.error("Error querying the database:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    if (cartID) {
      try {
        const cartQuery = await db.cart.findOne({ _id: cartID });
        if (!cartQuery) {
          return res.status(404).json({ error: "Cart not found in database" });
        }
      } catch (error) {
        console.error("Error querying the database:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
    if (customerID) {
      try {
        const customerQuery = await db.customers.findOne({ _id: customerID });
        if (!customerQuery) {
          return res
            .status(404)
            .json({ error: "Customer not found in database" });
        }
      } catch (error) {
        console.error("Error querying the database:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  }
  next();
}
export default checkProductExists;
