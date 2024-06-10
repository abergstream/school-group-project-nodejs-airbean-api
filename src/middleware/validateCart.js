import db from '../database/database.js';

//Show content in cart database
async function getAllCarts(){
  try{
    const carts = db.cart.find({});
    return carts;
  }catch(error){
    console.error(error)
  }
}


//Add a new cart
async function createCart(cart){
  try{
    const newCart = await db.cart.insert(cart);
  }catch(error){
    console.log(error);
  }
  }

  // Delete cart by id

  function deleteCart(id){
    db.cart.remove({_id:id});
  }


export {getAllCarts, createCart, deleteCart};