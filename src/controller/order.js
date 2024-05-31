import db from '../database/database.js';

/* ordersDB.insert({ customerID: '111', date: "2024-05-30 18:50", products:"kaffe", quantity:4, pricePerUnit:35, _id:5555 
}); */

//Serach for all orders in orders database made by customer with selected customerId.

async function getOrdersByCustomerId(customerId) {
  try{
   const orders = await db.orders.find({ customerID: customerId });
   return orders; 
  }catch (error){
    console.error("Error fetching orders", error);
    throw error;
  }
}

export { getOrdersByCustomerId };