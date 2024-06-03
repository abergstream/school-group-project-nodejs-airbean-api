import db from '../database/database.js'; 

// Function for cart
function addToCart() {
  // Lägg till
}
function placeOrder() {
  // Skicka med cartID
}


  // Show cart
const showCart = async (req, res) => {
  try {
    const allCartProducts = await db.cart.find({});
    res.send(allCartProducts);
  } catch (error) {
    res.status(500).send({ error: 'Could not get find the cart... no coffee for you!' });
  }
};

  export { showCart };
  


  