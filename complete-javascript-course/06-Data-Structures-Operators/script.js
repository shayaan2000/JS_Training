"use strict";

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
  team !== "x" && console.log(`Odds of victory for ${game[team]}: ${odd}`);
}

//=====================Coding Challenge 3=======================
//continued from challenge 2
console.log("\n\n114. Coding Challenge 3");

const gameEvents = new Map([
  [17, "⚽ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽ GOAL"],
  [80, "⚽ GOAL"],
  [92, "🔶 Yellow card"],
]);

//1
const events = [...new Set(gameEvents.values())];
console.log(events);

//2
gameEvents.delete(64);
console.log(gameEvents);

//3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

//4
for (const [t, e] of gameEvents.entries()) {
  const half = t <= 45 ? "[FIRST HALF]" : "[SECOND HALF]";
  console.log(`${half} ${t}: e`);
}

//=====================Working with Strings- Part 1=======================
console.log("\n\n120. Working with Strings- Part 1");

const airline = "Tap Air Portugal";
const plane = "A320";

//accessing characters
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log(plane[3]);
console.log("B749"[0]);
console.log("\n");

console.log(airline);
console.log("length:", airline.length);

//indexOf()
console.log("indexOf(r):", airline.indexOf("r")); //6
console.log("lastIndexOf(r):", airline.lastIndexOf("r")); //10
console.log("indexOf(Portugal):", airline.indexOf("Portugal")); //case sensitive, -1 if not found

//slice()
console.log("slice(4):", airline.slice(4));
console.log("slice(4,7):", airline.slice(4, 7)); //7 - 4 = 3 length (before 7)
console.log(airline.slice(0, airline.indexOf(" ")));
console.log(airline.slice(airline.lastIndexOf(" ") + 1));
console.log(airline.slice(-2)); //last 2
console.log(airline.slice(1, -1)); //starts at 1, excludes last 1

//trying it out
//column E and B are middle seats
const checkMiddleSeat = function (seat) {
  const s = seat.slice(-1);
  if (s === "E" || s === "B") {
    console.log("You got the middle seat");
  } else {
    console.log("You got lucky");
  }
};
checkMiddleSeat("11B");
checkMiddleSeat("23C");
checkMiddleSeat("3E");

//=====================Working with Strings- Part 2=======================
console.log("\n\n121. Working with Strings- Part 2");
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

//fixing capitalization
const passenger = "jOnAs";
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);

console.log(passenger, passengerCorrect);

//fixing email
const email = "hello@jonas.io";
const loginEmail = "  Hello@Jonas.io \n";

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim(); //removes space
console.log(trimmedEmail);

//OR
console.log(loginEmail.toLowerCase().trim());

//Repacing
const priceGB = "288,97P";
const princeUS = priceGB.replace("P", "$").replace(",", ".");
console.log(princeUS);

//regex
const announcement =
  "All passengers come to boarding door 23. Boarding door 23!";

console.log(announcement.replace("door", "gate")); //only replaces first occurance of door
//we need regex to remove multiple occurences
console.log(announcement.replace(/door/g, "gate"));

//booleans
const airplane = "Airbus A320neo";
console.log(airplane.includes("A320"));
console.log(airplane.includes("Boeing"));
console.log(airplane.startsWith("Airb"));
if (airplane.startsWith("Airbus") && airplane.endsWith("neo")) {
  console.log("is Airbus and new");
}

//=====================Working with Strings- Part 3=======================
console.log("\n\n122. Working with Strings- Part 3");

//split
const niceString = "a+very+nice+string";
console.log(niceString.split("+"));

const [firstName, lastName] = "Shayaan Farooq".split(" ");

const newName = ["Mr", firstName, lastName.toUpperCase()].join(" ");

const capitalizeName = function (listOfNames) {
  const names = listOfNames.split(" "); //separating each word into array
  let finalName = "";
  for (const name of names) {
    finalName +=
      name.slice(0, 1).toUpperCase() + name.toLowerCase().slice(1) + " ";
  }
  return finalName;
};

console.log(capitalizeName("sHayaAn FaRooQ aHmEd nAsiR"));

//Padding
const msg = "Go to gate 23!";
console.log(msg.padStart(25, "+"));
console.log(msg.padEnd(25, "SHAY"));

//real example
const maskCreditCard = function (number) {
  const strNum = number + "";
  return strNum.slice(-3).padStart(16, "*");
};

console.log(maskCreditCard(1234222133354343));

//Repeat
const msg2 = "Bad weather.. All Departures Delayed... ";
console.log(msg2.repeat(5));

//=====================Coding Challenge 4=======================
console.log("\n\n123. Coding Challenge 4");

//converting underscore_formate to camelCase
const convertToCamelCase = function (textInput) {
  const variables = textInput.split("\n");
  const camelCaseVariables = [];
  console.log(variables);
  for (const [i, v] of variables.entries()) {
    //trimming
    let tempStr = v.trim();

    //lower case
    tempStr = tempStr.toLowerCase();

    //spliting into ["first", "name"]
    tempStr = tempStr.split("_");

    //converting into "firstName"
    tempStr =
      tempStr[0] + tempStr[1].slice(0, 1).toUpperCase() + tempStr[1].slice(1);

    //padding
    tempStr = tempStr.padEnd(30, " ");

    //repeating emojies at end according to line number
    tempStr += "+".repeat(i + 1);

    //pushing in an array
    camelCaseVariables.push(tempStr);
  }

  //joining on separate lines
  console.log(camelCaseVariables.join("\n"));
};

const textAreaInput =
  "underscore_case\n   first_name   \nSome_Variable\n   calculate_AGE\ndelayed_departure";

convertToCamelCase(textAreaInput);

//=====================String Excercise=======================
console.log("\n\n124. String Exercise");
//formatting into readable output

const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

const allFlights = flights.split("+");
console.log(allFlights);

for (const f of allFlights) {
  let flightStatus, flightDeparture, flightArrival, flightTime;

  [flightStatus, flightDeparture, flightArrival, flightTime] = f.split(";");
  //status
  flightStatus = flightStatus.slice(1).split("_").join(" ");
  flightStatus = flightStatus.startsWith("Delayed")
    ? "!!!" + flightStatus
    : flightStatus;

  //departure
  flightDeparture = flightDeparture.slice(0, 3).toUpperCase();

  //arrival
  flightArrival = flightArrival.slice(0, 3).toUpperCase();

  //time
  flightTime = flightTime.replace(":", "h");

  console.log(
    `${flightStatus} from ${flightDeparture} to ${flightArrival} (${flightTime})`
  );
}
