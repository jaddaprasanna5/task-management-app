let inventory = [
  { id: 1, name: "Laptop", price: 50000, stock: 10 },
  { id: 2, name: "Mouse", price: 800, stock: 50 },
  { id: 3, name: "Keyboard", price: 1500, stock: 30 }
];
let orders = [];
let orderId = 1;
function addInventoryItem(name, price, stock) {
  if (!name || price <= 0) throw new Error("Invalid product details");
  const item = { id: inventory.length + 1, name, price, stock };
  inventory.push(item);
  return item;
}
function placeOrder(productName, quantity) {
  const product = inventory.find(p => p.name.toLowerCase() === productName.toLowerCase());
  if (!product) throw new Error(`Product ${productName} not found`);
  if (product.stock < quantity) throw new Error(`Only ${product.stock} left in stock`);
 product.stock -= quantity;
  const total = product.price * quantity;
 const order = {
    orderId: orderId++,
    product: product.name,
    quantity,
    total,
    status: "placed",
    date: new Date().toDateString()
  };
  orders.push(order);
  return order;
}
function getTotalRevenue() {
  return orders.reduce((sum, order) => sum + order.total, 0);
}
function getLowStock(threshold = 5) {
  return inventory.filter(item => item.stock <= threshold);
}
function applyDiscount(orderId, discountPercent) {
  const order = orders.find(o => o.orderId === orderId);
  if (!order) throw new Error(`Order ${orderId} not found`);
  const discount = (order.total * discountPercent) / 100;
  order.total = order.total - discount;
  order.discountApplied = `${discountPercent}%`;
  return order;
}
try {
  console.log("Initial Inventory:", inventory);
  console.log(placeOrder("Laptop", 1));
  console.log(placeOrder("Mouse", 3));
  console.log(placeOrder("Keyboard", 2));
  console.log(inventory);
  console.log("Rs.", getTotalRevenue());
  console.log(applyDiscount(1, 10));
  console.log("Rs.", getTotalRevenue());
  console.log(addInventoryItem("Monitor", 12000, 5));
  console.log(getLowStock(5));
} catch (e) {
  console.error("Error caught:", e.message);
}