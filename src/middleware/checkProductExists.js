import db from "../database/database.js";

async function checkProductExists(req, res, next) {
  const { product, customerID, cartID, quantity } = req.body;
  const queryDatabase = async (model, query, errorMessage) => {
    try {
      const result = await db[model].findOne(query);
      if (!result) {
        return res.status(404).json({ error: errorMessage });
      }
    } catch (error) {
      console.error("Error querying the database:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  if (quantity && quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Quantity can not be negative or zero" });
  }

  try {
    const productQuery = await db.menu.findOne({ _id: product });

    if (!productQuery) {
      return res
        .status(404)
        .json({ error: "Product not found in the database" });
    }

    if (cartID && customerID) {
      return await queryDatabase(
        "cart",
        { _id: cartID, customerID },
        "Cart with customerID and cartID not found in database"
      );
    } else {
      if (cartID) {
        return await queryDatabase(
          "cart",
          { _id: cartID },
          "Cart not found in database"
        );
      }
      if (customerID) {
        console.log(`customerID: ${customerID}`);
        return await queryDatabase(
          "customers",
          { _id: customerID },
          "Customer not found in database"
        );
      }
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
  next();
}
export default checkProductExists;
