http://localhost:{PORT}/cart/order

// POST REQUEST
// BODY JSON

const registeredCustomer = {
  customerID: "DzbWOAIZTDQUyoQB",
  cartID: "Acwd7ENmZXDGozIg",
  guestInfo: null
}

const guestCustomer = {
  customerID: null,
  cartID: "Acwd7ENmZXDGozIg",
  guestInfo: {
    email: "guest@example.com",
    phone: "1234567890"
  }
}

const invalidGuestOrder = {
  customerID: null,
  cartID: "Acwd7ENmZXDGozIg",
  guestInfo: {
    email: "guest@example.com"
    // Missing phone number
  }
}

