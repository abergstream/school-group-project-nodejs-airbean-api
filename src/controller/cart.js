import db from "../database/database.js";

// Function for cart
function addToCart() {
  // Lägg till
}

// customerID: DzbWOAIZTDQUyoQB
const placeOrder = async (req, res, next) => {
  // Vet inte om jag behöver cartID
  const { customerID, cartID, guestInfo } = req.body
  const orderTime = formatDate(new Date())

  let orderCustomerID = customerID

  try {
    if (!orderCustomerID && guestInfo) {
      const { email, phone } = guestInfo
      if (!email || !phone) {
        return res.status(400).json({ message: "Guest email and phone are required" })
      }

      // Create a guest entry if not logged in
      const guestCustomer = await db["customers"].insert({
        username: "guest",
        email: guestInfo.email,
        phone: guestInfo.phone,
      })
      orderCustomerID = guestCustomer._id
    }

    if (orderCustomerID && !guestInfo) {
      const customer = await db["customers"].findOne({ _id: orderCustomerID })
      if (!customer) {
        return res.status(400).json({ message: "Customer not found" })
      }
    }

    // Check if customerID or guestInfo is provided
    if (!orderCustomerID) {
      return res.status(400).json({ message: "customerID or valid GuestInfo is required" })
    }

    // Calculate estimated delivery time
    const estimatedDelivery = formatDate(new Date(Date.now() + 20 * 60 * 1000))

    const newOrder = {
      customerID: orderCustomerID,
      cartID: cartID,
      date: orderTime,
      estimatedDelivery: estimatedDelivery
    }

    const savedOrder = await db["orders"].insert(newOrder)

    res.json({ message: "Order placed successfully", order: savedOrder })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }

  next()
}

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function showCart() {
  // Visa kundkorg
}

export { placeOrder, formatDate }