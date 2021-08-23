"use strict";

//=============================Default Parameters============================
console.log("\n\n127. Default Parameters");

const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking("LH123");
createBooking("LH123", 1);
createBooking("LH123", 3, 400);

//=============================Passing Arguments============================
console.log("\n\n128. Passing Arguments - Value vs Reference");
const flight = "LH234";
const jonas = {
  name: "Jonas Schmedtmann",
  passport: 243412412,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = "Mr. " + passenger.name;

  if (passenger.passport === 23141245) {
    console.log("Checked in");
  } else {
    console.log("not checked in");
  }
};

checkIn(flight, jonas);
console.log(flight); //primitive
console.log(jonas); //reference type- jonas.name changes to Mr. Jonas

//another example
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(jonas);
checkIn(flight, jonas);
console.log(jonas);

//=============================First Class and Higher Order Functions============================
//=============================Functions accepting callback functions============================
console.log("\n\n130. Functions accepting callback functions");

const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

//higher order function
const transformer = function (str, fn) {
  console.log(`Original String: ${str}`);
  console.log(`Transformed String: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer("js is the best!", upperFirstWord);
transformer("js is the best!", oneWord);

//another example
const high5 = function () {
  console.log("HI5");
};
//document.body.addEventListener("click", high5);

//=============================Functions returning function============================
console.log("\n\n131. Function returning function");

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet("Hey");

greeterHey("Shayaan");
greeterHey("Zain");

//or
greet("Hey")("Shayaan");

//exercise
const greetArrow = (greeting) => (name) => console.log(`${greeting} ${name}`); //arrow function returning arrow function
greetArrow("hello")("bro");

//=============================The call and apply method============================
console.log("\n\n132. The call and apply method");

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
lufthansa.book(239, "Jonas");

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book;

//book(22, "Shayaan"); //does not work because this inside a global with be undefined
book.call(eurowings, 22, "Shayaan"); //first arg is assigning 'this'
console.log(eurowings);

//=============================Bind Method============================
console.log("\n\n133. Bind Method");

const bookEW = book.bind(eurowings);
bookEW(23, "Ahmed");

console.log(eurowings);

const bookEW23 = book.bind(eurowings, 23); //partial application
bookEW23("Farooq");

//With event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));
//bind because inside event listeners, this points to dom element

//Partial Application
const addTax = (rate, value) => value + value * rate;

const addVat = addTax.bind(null, 0.23);

console.log(addVat(110));

//=============================Coding Challenge 1============================
console.log("\n\n134. Coding Challenge 1");
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3:C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    //prompt option from user
    this.answers[0] += 1;
    this.displayResults("string");
  },

  displayResults(type) {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers}`);
    }
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

//=============================Immediately Invoked function expression============================
console.log("\n\n135. Immediately Invoked function expression");

//regular function
(function () {
  console.log("This is an immediately invoked function expression");
})();

//arrow function
(() => console.log("IIFE with Arrow Function"))();

//=============================Closure Examples============================
console.log("\n\n137. Closure Examples");

//Example 1
let f; //declared outside but defined inside g
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

g();
f(); //g is no longer there but f remembers g through closures
//46

const h = function () {
  const b = 77;
  f = function () {
    console.log(b * 2);
  };
};

h(); //reassigns f inside
f(); //154

console.dir(f);

//Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  //callback function called after wait*1000 ms
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1010; //not being used because pergroup from closure prioritized before global
boardPassengers(180, 3);
//boardpassenger will execute but setTimeout will wait for 3 seconds, then run.
//there is no issue because callback function has acces to pergroup, wait, and n through closure

//=============================Coding Challenge 2============================
console.log("\n\n138. Coding Challenge 2");

(function () {
  const header = document.querySelector("h1");
  header.getElementsByClassName.color = "red";

  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "blue";
  });
})();
