# school-group-project-nodejs-airbean-api


US: Som inloggad användare vill jag kunna se min orderhistorik.
GET  http://localhost:8000/orders/<cutomer Id>
If not logged in, the result is a message: "You need to be logged in to view the orderhistory"

US: Som användare vill jag på bekräftelsesidan se när min beställning levereras.
GET  http://localhost:8000/confirmation/<order Id>
Delivery time anges som fiktivt +20 min från lagd order.
