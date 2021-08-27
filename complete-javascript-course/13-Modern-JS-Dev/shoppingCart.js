// Exportting Module
console.log("Exporting Module");

//scoped to this module
const shippingCost = 10;
const cart = [];

//named export
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;
export { totalPrice, totalQuantity };

// Default Export
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to cart`);
}
