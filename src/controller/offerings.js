import db from '../database/database.js';

const createOffering = async(offering)=> {
  try{
const newOffering = await db.offerings.insert(offering);
console.log(newOffering);
}catch (error){
  console.error(error);
}
}

export {createOffering}