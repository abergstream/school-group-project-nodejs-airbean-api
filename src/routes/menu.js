import { Router } from "express";

import { getAllProducts, createMenuItem , findMenuItemByTitle, updateMenuItem, deleteMenuItem} from "../controller/menu.js";
import {menuItemSchema, updateMenuItemSchema} from "../models/menuSchema.js";

const router = Router();


router.get('/', getAllProducts)



//POST new menu item. Also adding a new parameter 'createdAt' to log the menu update.
router.post('/', async(req,res)=> {
//validate that the input menu item correspond to expected form.
const { error, value } = menuItemSchema.validate(req.body);
if (error) {
  return res.status(400).json({ error: error.details[0].message });
}
//Add createdAt parameter
   const createdAt = new Date().toISOString();
   const newItem = {
  ...value, createdAt
};

//include new menu item in response
try {
  const createdItem = await createMenuItem(newItem);
  res.json({ 
    message: "Menu item added successfully", 
    item: createdItem  // Include the created item in the response
  });
} catch (error) {
  res.status(500).json({ error: 'Failed to add new menu item', details: error.message });
}
});

//Uppdate menu item. Add parameter 'modifiedAt'.
router.put('/:title',async (req,res)=>{
//Check if the entered menu-item exists in database.
  try {
    const menuItem = await findMenuItemByTitle(req.params.title);
    if (!menuItem) {
      return res.status(404).json({ error: 'Failed to find menu item. Is it correctly spelled?'  });
    }
//validate that the updates correspond to expected form.
    const { error, value } = updateMenuItemSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

 //Add modifiedAt parameter   
  const modifiedAt = new Date().toISOString();
  const updatedItem = {
    ...value, modifiedAt
  };

  await updateMenuItem(req.params.title, updatedItem);
     res.json({message : "Menu updated successfully"});
  }catch(error){
    res.status(500).json({ error: 'Failed to update menu item', details:error.message});
  };
});

//Delete a menu item
router.delete('/:title', async(req,res)=>{
  //Check if the entered menu-item exists in database.
  try {
    const menuItem = await findMenuItemByTitle(req.params.title);
    if (!menuItem) {
      return res.status(404).json({ error: 'Failed to find menu item. Is it correctly spelled?' });
    }

    await deleteMenuItem(req.params.title);
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete menu item', details: error.message });
  }
});


export default router;