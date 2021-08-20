"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; //returning an array which can then be destructured
  },

  //for taking in object as parameter so order does not effect anythig
  orderDelivery: function ({ time, address }) {
    console.log("Inside function: ", time, address);
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here are your things ${ing1} ${ing2} ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};

//==================Destructuring Arrays========================
console.log("\n\n103. Destructuring Arrays");
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

console.log(a, b, c);

const [x, y, z] = arr;
console.log(x, y, z);

//resturant example
const [first, , third] = restaurant.categories; //pizzeria skipped with , ,
console.log(first, third);

//swapping using destruction
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

//swapping
[main, secondary] = [secondary, main];
console.log(main, secondary);

//function to return multiple values then destructuring
console.log(restaurant.order(2, 0));
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter + ", " + mainCourse);

//nested array destructuring
const nestedArr = [2, 4, [5, 6]];
const [i, , [j, k]] = nestedArr; //1st element and 3rd element destructured
console.log(i, j, k);

//default values
const [p = 1, q = 1, r = 80] = [8, 9];
console.log(p, q, r);

//================Destructuring Objects===================
console.log("\n\n104. Destructuring Objects");

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

//--Testing reference types--will change array value everywhere
// categories[0] = "Shayaan";
// console.log("cats", categories);
// console.log("restcats", restaurant.categories);

//using different names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

//default value
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters); //menu doesnt exist, we will get default value

//mutating variables
let aa = 111;
let bb = 999;
const obj = {
  aa: 23,
  bb: 7,
  cc: 14,
};

//we want to update initial a and b from value of obj.a and obj.b
({ aa, bb } = obj); //outter () brackets required as cant start line with {} unless block
console.log(aa, bb);

//nested objects
const { fri } = openingHours;
console.log(fri);

const {
  fri: { open: op, close: cl },
} = restaurant.openingHours;
console.log(op, cl);

//destructuring object in function definintion, and sending object in function arguments
restaurant.orderDelivery({
  time: "22:30",
  address: "islamabad",
});

//======================Spread Operator=======================
console.log("\n\n105. Spread Operator");

//Works on Iterables
//Iterables are arrays, strings, maps, sets. NOT objects

//copying elements of one array into another
const numArr = [7, 8, 9];
const badNewArr = [1, 2, numArr[0], numArr[1], numArr[2]];
console.log(badNewArr);

//spread operator
const newArr = [1, 2, ...numArr];
console.log(newArr);
console.log(...newArr);

//example
const newMenu = [...restaurant.mainMenu, "Biryani"];
console.log("New Menu: ", newMenu);

//copy array - SHALLOW
const mainMenuCopy = [...newMenu];
console.log(mainMenuCopy);

//join 2 arrays
const completeMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log("Complete Menu", completeMenu);

//on string
const str = "Jonas";
const letters = [...str, " ", "S."];
console.log(letters);

//sending arguments to function using ...spreadOps
const ingredients = ["Pasta", "Sauce", "Veggies"];
restaurant.orderPasta(...ingredients);

//On objects (recent)
//Creating new object with some new stuff
const newRestaurant = { ...restaurant, founder: "Shayaan", foundedIn: 2019 };
console.log(newRestaurant);

//shallow copy
const restaurantCopy = { ...restaurant };
console.log(restaurantCopy);

//====================Rest Pattern & Parameters=======================
console.log("\n\n106. Rest Pattern and Parameters");

//spread - right side of assignment operator - unpack an array
const myArray = [1, 2, ...[3, 4]];
console.log(myArray); //[1,2,3,4]

//rest pattern - left side of assignment operator - pack an array
const [n1, n2, ...others] = [1, 2, 3, 4, 5]; //destructuring
/*
  n1=1
  n2=2
  others= [3,4,5]
*/
console.log("Others", others);

const [pizza, pasta, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

console.log(pizza, pasta, otherFood); //needs to be last operator, as it takes all coming after

//With objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); //will leave out sat

//with functions
const add = function (...allNumbers) {
  console.log(allNumbers); //[2,3]
};

//we can send both arrays and simple numbers like this
add(2, 3);
add(2, 4, 5, 6);

const xArr = [23, 45, 6];
add(...xArr); //unpack here then pack in function

//first stored in mainIngredient, rest stored in an array
restaurant.orderPizza("mushrooom", "onion", "capsicum");

//=====================Short Circuting using && and ||=======================
console.log("\n\n107. Short Circuiting");

/*
Three properties of logical operators
1. Use any data type
2. Return any data type
3. Short Circuiting / Short Circuit Evaluation
*/

//short circuiting
//- The first value that is a truthy value will immediately be returned in ||
console.log("---Or---");
console.log(3 || "Jonas");
console.log(null || "Jonas"); //no short circuiting here
console.log(null || "Hello" || 0 || null); //wont go further than Hello
console.log(null || 0); //all falsy, returns last one

//application
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

//instead
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

//AND operator
//the first value that is a falsy value will immediately be returned here in &&
//if all true it will return the last value
console.log("---And---");
console.log(3 && "Jonas");
console.log(null && "Jonas"); //wont go further than null
console.log(1 && "Hello" && true && null); //null

//if function exists, call the function
restaurant.orderPizza && restaurant.orderPizza("mushroom", "cheese", "onions");

//==========================Nullish Coalescing Operator=======================
console.log("\n\n108. Nullish Coalescing Operator");

//nullish ?? operator is just like OR but it only considers nullish, not false
//nullish includes 'null' and 'undefined'
const passengers = 0;
const passengersWithOr = passengers || 10;
console.log(passengersWithOr); //10

const correctPassengers = passengers ?? 10;
console.log(correctPassengers); //0

//=============================For Of Loop==================================
console.log("\n\n110. Looping Arrays: For-of loop");

const todaysMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(todaysMenu);

for (const foodItem of todaysMenu) {
  console.log(foodItem);
}

//getting index - .entries()
for (const item of todaysMenu.entries()) {
  console.log(item);
}

//destructuring
for (const [i, elem] of todaysMenu.entries()) {
  console.log(`Item ${i + 1} is ${elem}`);
}

//=====================Enhanced Object Literals=======================
console.log("\n\n111. Enhanced Object Literals");

//ES6 stuff
const property = "engin";
const color = "blue";
const car = {
  wheels: 4,
  color, //instead of color: color
  [property + "e"]: "V8", //computable property names - property is called "engine"

  //functions - dont need function keyword
  drive() {
    console.log("Move Forward");
  },
};

car.drive();
console.log(car);

//=====================Optional Chaining =======================
console.log("\n\n112. Optional Chaining");

//we dont know if monday exists or not
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}

//With optional chaining
console.log(restaurant.openingHours.mon?.open); //undefined
console.log(restaurant.openingHours?.mon?.open); //multiple chainings, stops at opening hours first

//example
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? " closed";
  console.log(`On ${day}, we open at ${open}`);
}

//methods - checking if exists
console.log(restaurant.orderRisotto?.(0, 1) ?? "Method does not exist"); //otherwise would have given error. ?. immediatly makes the first statement = undefined so ?? nullish operator stops there

//arrays - checking if array empty
const users = [];
console.log(users[0]?.name ?? "User array empty");
//console.log(users[0].name); //gives error

//=====================Looping Object keys, values, and entries=======================
console.log("\n\n113. Looping Object Keys, Values, and Entries");

const properties = Object.keys(openingHours);
console.log(properties); //["thu" , "fri" , "sat" ]

let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

//Values
const values = Object.values(openingHours);
console.log(values); //array of {open:,close:,}

//Entries
const entries = Object.entries(openingHours);
console.log(entries);

for (const e of entries) {
  console.log(e);
}

//with destructuring
for (const [day, { open, close }] of entries) {
  console.log(`On ${day}, we open at ${open}, and close at ${close}`);
}

//=====================Coding Challenge 1=======================
console.log("\n\n109. Coding Challenge 1");

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//1
const [players1, players2] = game.players;
console.log(players1, players2);

//2
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

//3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//4
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];

//5
const {
  odds: { team1, x: draw, team2 },
} = game;

//6
const printGoals = function (...players) {
  console.log(players);
  console.log(players.length + " goals scored");
};
printGoals(...game.scored);

//7
team1 < team2 && console.log("team 1 is more likely to win");
team1 > team2 && console.log("team 2 is more likely to win");

//=====================Coding Challenge 2=======================
//continued from challenge 1
console.log("\n\n114. Coding Challenge 2");

//1
for (const [i, scorer] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${scorer}`);
}

//2
let avgOdd = 0;
for (const odd of Object.values(game.odds)) {
  avgOdd += odd;
  console.log(odd);
}
avgOdd /= Object.values(game.odds).length;
console.log(avgOdd);

//3
for (const [team, odd] of Object.entries(game.odds)) {
  team !== "x" && console.log(`Odd of victory for ${game[team]}: ${odd}`);
}

//=====================Sets=======================
console.log("\n\n115. Sets");

const ordersSet = new Set([
  "Pasta",
  "Pasta",
  "Pizza",
  "Risotto",
  "Pasta",
  "Pizza",
]);

console.log(ordersSet); //{pizza, pasta, risotto} - Unique values
console.log(ordersSet.size); //3
console.log(ordersSet.has("Pizza")); //true
console.log(ordersSet.has("Bread")); //false
ordersSet.add("Garlic Bread");
ordersSet.add("Garlic Bread"); //wont add a duplicate
console.log(ordersSet);
ordersSet.delete("Garlic Bread");
ordersSet.delete("Garlic Bread"); //will do nothing if not found
console.log(ordersSet);
// ordersSet.clear(); //empties set
console.log(ordersSet);

//can be looped
for (const order of ordersSet) console.log(order);

//Example - removing duplicates of an array
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

//number of unique letters in name
console.log(new Set("Shayaan").size);

//no of unique designations
console.log(
  new Set(["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"]).size
);

//=====================Maps=======================
console.log("\n\n116. Maps");

//in maps, keys can be of any type
const rest = new Map();
rest.set("name", "Classico Italiano");
rest.set(1, "Bahria Town");
rest.set(2, "DHA 2");

// chaining multiple set() is possible as set() returns resultant map
rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open")
  .set(false, "We Are closed :(");
console.log(rest);

//getting value
console.log(rest.get("name"));
console.log(rest.get(1));
console.log(rest.get(true));

const time = 2;
console.log(rest.get(time > rest.get(open) && time < rest.get("close")));

//checking if key exists
console.log(rest.has("categories"));

//removing
rest.delete(2);

//size
console.log(rest.size); //7

//using Array as Map Key
const arrKey = [1, 2];
rest.set(arrKey, "Test");
console.log(rest.get(arrKey));

//can even make DOM elements as keys
rest.set(document.querySelector("h1"), "Heading");
console.log(rest);

//rest.clear();

//=====================Maps: Iteration=======================
console.log("\n\n117. Maps: Iteration");

//another way to define map
const question = new Map([
  ["question", "Best programming language in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "Correct"],
  [false, "Try again"],
]);

console.log(question);

//converting object to map
console.log("Object entries of Opening Hours", Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log("Hours Map: ", hoursMap);

//maps are iterable
for (const [key, value] of question) {
  if (typeof key === "number") {
    console.log(`Answer ${key}: ${value}`);
  }
}

const answer = Number("3"); //you can prompt here
console.log(answer);

console.log(question.get("correct") === answer); //true

//Convert map to array
//building new array, then unpack using spread operator
console.log([...question]); //2D array
console.log([...question.keys()]);
console.log([...question.values()]);
