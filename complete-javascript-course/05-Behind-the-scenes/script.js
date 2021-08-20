"use strict";

//==============Scoping in Practice==================
//function made in global scope
function calcAge(birthYear) {
  //funciton scope inside here:

  //const is block-scoped
  const age = 2037 - birthYear;

  //look-up to parent scope (global in this case)
  console.log(firstName);

  function printAge() {
    //finds age and birthyear in parent scope
    const output = `You are ${age}, born in ${birthYear}`;
    console.log(output);

    //look up to calcage() to global scope
    console.log(firstName);

    if (birthYear >= 1981 && birthYear <= 1996) {
      //block scope:

      //first name defined in current block. All references in this block will refer to this now
      const firstName = "shayaan";
      const str = `Oh, you are a millenial, ${firstName}`; //shayaan
      var millenial = true;

      function add(a, b) {
        return a + b;
      }
    }

    //gives error as str is block variable of if(){}
    //console.log(str);

    //works as var is function scoped
    console.log(millenial);

    //Does not work while 'use strict' - functions are to be block scoped now
    //console.log(add(9, 2));
  }

  printAge();
  return age;
}

const firstName = "Jonas"; //global variable
calcAge(1991);

//===========Hoisting==============
//checking variables
console.log(me); //undefined as it is var
//console.log(job); //uncaught reference error as it is TDZ for let/const var
//console.log(year); //uncaught reference error as it is TDZ for let/const var

var me = "Jonas";
let job = "teacher";
const year = 1991;

//checking functions

console.log("Before");
console.log(addDecl(2, 3)); //works
//console.log(addExpr(2, 3)); //error - cannot access before initialization
//console.log(addArrow(2, 3)); //error - not a function - undefined as it is a var

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

//all work after
console.log("After");
console.log(addDecl(2, 3));
console.log(addExpr(2, 3));
console.log(addArrow(2, 3));

//Example of a mistake
if (!numProducts) deleteShoppingCart(); //code will execute- var is undefined (falsy) so all products deleted despite numProducts=10
var numProducts = 10;
function deleteShoppingCart() {
  console.log("All products deleted");
}

//var let const another difference
//vars are part of the window object
var x = 1; //type "window" in console
let y = 2;
const z = 3;

console.log(x === window.x); //true
console.log(y === window.y); //false
console.log(z === window.z); //false

//=============this keyword=================
console.log("Global:", this); //window obj

//regular function
const myFunctionReg = function () {
  console.log("Inside regular function: ", this);
};

myFunctionReg(); //undefined

//arrow function
const myFunctionArr = () => {
  console.log("Inside regular function: ", this);
};

myFunctionArr(); //window object - this in arrow is same as parent

//methods
const car = {
  speed: 0,
  accelerate: function () {
    this.speed += 20;
    console.log("Inside method: ", this);
  },
};

car.accelerate(); //this inside method is the car obj

//subtle difference
const bike = {
  speed: 20, //different initial speed for example
};

bike.accelerate = car.accelerate; //method borrowing;
bike.accelerate(); //this will be for bike as accelerate called on bike

const f = car.accelerate; //f is now a regular function
//this inside f will be undefined like a regular function

//=============Regular vs Arrow Functions=================
//Arrow function as a method
var lastName = "cena"; //window.lastName as it is a var
const john = {
  firstName: "john",
  lastName: "farooq",
  greet: () => console.log(`Hey I'm ${this.firstName} ${this.lastName}`),
};

john.greet(); //hey im undefined cena
//arrow doesnt have this, itll look in parent. For global it will be window obj

const rooney = {
  firstName: "wayne",
  lastName: "rooney",
  year: 1985,

  calcAge: function () {
    //solution: using self
    const self = this;
    const isMillenial = function () {
      console.log(self.year >= 1981 && self.year <= 1996); //gives error with this - undefined in this regular function
    };
    const isMillenialArr = () => {
      console.log(this.year >= 1981 && this.year <= 1996); //works fine with this as find this inside parent method
    };

    isMillenial();
    isMillenialArr();
  },
};

rooney.calcAge();

//arguments keyword in regular functions
const sumFunction = function (a, b) {
  console.log(arguments);
  return a + b;
};

sumFunction(2, 5);
sumFunction(2, 5, 4, 6);

//arguments keyword doesn't exist in arrow functions

//objects vs primitive
let age = 30;
let oldAge = age;
age = 31;
console.log(age); //31
console.log(oldAge); //30

const myself = {
  name: "Shayaan",
  age: 30,
};
const friend = myself;
friend.age = 27;
friend.name = "Aadil";
console.log("friend:", friend);
console.log("myself: ", myself); //updated to friends data aswell

//primitives vs reference - another example and fix
let lName = "Willams";
let oldLName = lName;
lName = "Davis";
console.log(lName + ", " + oldLName); //works like it should intuitively

const jessica = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = "Davis";
console.log("Before marriage: ", jessica);
console.log("After marriage: ", marriedJessica);

const jessica2 = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
  family: ["Alice", "Bob"],
};

//merging 2 objects:
console.log("\n\nTrying out copying"); //only shallow copying
const jessicaCopy = Object.assign({}, jessica2); //shallow copy - inner objects are still pointing to same memory
jessicaCopy.lastName = "Davis";
console.log("Jessica2: ", jessica2);
console.log("Jessica Copy: ", jessicaCopy);

jessicaCopy.family.push("Mary");
jessicaCopy.family.push("John");

console.log("\n\nAdding 2 members in family array of Jessica Copy");
console.log("Jessica2: ", jessica2);
console.log("Jessica Copy: ", jessicaCopy);
