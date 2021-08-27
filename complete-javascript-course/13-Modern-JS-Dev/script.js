// Importing Module

/* 
//===268. named imports====
import {
  addToCart,
  totalPrice as price,
  totalQuantity,
} from "./shoppingCart.js";

addToCart("bread", 5); 
console.log(price, totalQuantity);
*/

console.log("Importing Module");

//=======268 Importing Everything======
import * as ShoppingCart from "./shoppingCart.js";
ShoppingCart.addToCart("bread", 5);

//=======268 Default Import======
import xyz from "./shoppingCart.js";
xyz("Apples", 3); //default function being exported from there

//=========269==Module Pattern==============
/* const ShoppingCart2 = (function () {
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;
    const addToCart = function (product, quantity) {
      cart.push({ product, quantity });
      console.log(
        `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
      );
    };
    const orderStock = function (product, quantity) {
      console.log(`${quantity} ${product} ordered from supplier`);
    };

    // making an api
    return {
      addToCart,
      cart,
      totalPrice,
      totalQuantity,
    };
  })();

  ShoppingCart2.addToCart('apple', 4);
  ShoppingCart2.addToCart('pizza', 2);
  console.log(ShoppingCart2);

  //accessed with the help of closures
  console.log(ShoppingCart2.shippingCost);
   */

//==========270. CommonJS Module=============
// used in node js for a long time

//========272. Intro to npm=========

// using parcel we dont need to give full path
// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
import cloneDeep from "lodash-es";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "eggs", quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state); //shallow
const stateDeepClone = cloneDeep(state); //deep
state.user.loggedIn = false;
console.log(stateClone); //clone also changed
console.log(stateDeepClone); //deep clone not changed

// for not reloading entrie page
if (module.hot) {
  module.hot.accept();
}

//command for parse
// npm install parce --save-dev
// npx parcel index.html //file is the entry point file
