"use strict";

//===================Constructor Function=====================
console.log("\n\n205. Constructor Function and new Operator");

// arrow functions wont work as they dont have 'this'
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  //never create a method inside a constructor
  /*this.calcAge = function () {
    console.log();
  };*/
};

const jonas = new Person("Jonas", 1991);
console.log(jonas);
console.log(jonas instanceof Person);
// new keyword used to call function as constructor
// 1. New {} is created
// 2. function is called, 'this'={}
// 3. {} linked to prototype
// 4. function automatically returns {} - before this we can populate {}

//========================Prototypes=========================
console.log("\n\n206. Prototypes");

//every function has a prototype property
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
console.log(Person.prototype);

//using on jonas object
jonas.calcAge();
console.log(jonas);
console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype); //true

console.log(Person.prototype.isPrototypeOf(jonas)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false

//__proto__ is written as [[Prototype]] in console

Person.prototype.species = "Homo Sapiens"; //will be inside prototype through "inheritance"
console.log(jonas);

//accessible just like own properties
console.log(jonas.species);
console.log(jonas.firstName);

console.log(jonas.hasOwnProperty("firstName")); //true as it was in constructor
console.log(jonas.hasOwnProperty("species")); //false as it is in __proto__

//prototypal inheritance and protoype chain
console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

//=============Prototypal Inheritance on Built-in Objects==============
console.log("\n\n208. Prototypal Inheritance on Built-in Objects");

const arr = [3, 6, 5, 8, 3, 5]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); //true
console.log(arr.__proto__.__proto__); //constructor: Object

// Extending functionality of array - Not a generally good idea
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector("h1");
console.dir(h1);

//=============Coding Challenge 1==============
console.log("\n\n209. Coding Challenge Number 1");

const Car = function (make, speed = 0) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log("Accelerating, new speed:", this.speed);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log("Braking, new speed:", this.speed);
};

const bmw = new Car("BMW", 120);
console.log(bmw);
bmw.accelerate();
bmw.brake();

//=============ES6 Classes==============
console.log("\n\n209. ES6 Classes");

// class expression
//const PersonCl= class{}

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  //automatically added to the .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}

const jessica = new PersonCl("Jessica", 1996);
console.log(jessica);
jessica.calcAge();
jessica.greet();

console.log(jessica.__proto__ === PersonCl.prototype);
