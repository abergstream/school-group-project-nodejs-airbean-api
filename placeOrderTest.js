http://localhost:{PORT}/cart/order

// POST REQUEST
// BODY JSON

const registeredCustomer = {
  customerID: "DzbWOAIZTDQUyoQB",
  cartID: "sampleCartID",
  guestInfo: null
}

const guestCustomer = {
  customerID: null,
  cartID: "sampleCartID",
  guestInfo: {
    email: "guest@example.com",
    phone: "1234567890"
  }
}

const invalidGuestOrder = {
  customerID: null,
  cartID: "sampleCartID",
  guestInfo: {
    email: "guest@example.com"
    // Missing phone number
  }
}

