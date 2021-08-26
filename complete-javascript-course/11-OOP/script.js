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

// Static Function
Person.hey = function () {
  console.log("Hey there (static)");
};

//jonas.hey() //not posisble
Person.hey();

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

  // Getters and Setters
  get age() {
    return 2037 - this.birthYear;
  }

  // set a property that already exists
  set firstName(n) {
    if (n.includes(" ")) alert("this isn't one name");
    else this._firstName = n; //convention is to use _
    //now it exists in the form of _firstname, so we also need a getter
  }

  get firstName() {
    return this._firstName;
  }

  // Static Method
  static hey() {
    console.log("Hey again (static w ES6 class)");
  }
}

const jessica = new PersonCl("Jessica", 1996);
console.log(jessica);
jessica.calcAge();
jessica.greet();
console.log(jessica.age);
console.log(jessica.__proto__ === PersonCl.prototype);

//static method call
PersonCl.hey();

// 1. Classes are not hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode
// -- personal preference --

//====================Getters and Setters======================
console.log("\n\n211. Getters and Setters");

//in object literals
const account = {
  owner: "Jonas",
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); //calling getter
account.latest = 50; //setter
console.log(account.movements);

//for class: done in above class^^^

//====================Static Method==========================
//Number.parseFloat(12)
// done above^^^

//==================212. Object.create()====================
console.log("\n\n212. Object.create");

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = "Steven";
steven.birthYear = 1997;
steven.calcAge();
console.log(steven.__proto__);

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1979);
sarah.calcAge();

//==============+Inheritance using constructor================
console.log("\n\n215. Inheritance through the normal way");
const Person2 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person2.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); //this is set to the new object created with new, so this.firstName in person will add everything to Student object
  this.course = course;
};

Student.prototype = Object.create(Person2.prototype); //returns {} so has to be done before

Student.prototype.constructor = Student;

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2010, "Computer");
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Person2); //true
console.log(mike instanceof Student); //true

console.dir(Student.prototype.constructor);

//=========Challenge 3======================
console.log("\n\nChallenge 3");

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = Car;

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(`Accelerating, speed: ${this.speed}, charge: ${this.charge}`);
};

const tesla = new EV("Tesla", 120, 23);
console.log(tesla);
tesla.accelerate();
tesla.brake();

//==============Inheritacne using ES6 class===============
console.log("\n\n217.Inheritance using ES6 class");

class StudentCl extends PersonCl {
  constructor(firstName, birthYear, course) {
    //start here
    super(firstName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  }
}

const shayaan = new StudentCl("Shayaan", 2000, "CS");
shayaan.introduce();
shayaan.calcAge();
console.log(shayaan);

//==============Inheritacne using Object.create()===============
console.log("\n\n218. Inheritance using Object.create()");

// creating prototype chains
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init("Jay", 2011, "Computer Science");
jay.introduce();
jay.calcAge();

// ================Another Example=========================
console.log("\n\n219. Another Example");

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    this._movements = [];
    this.locale = navigator.language;

    console.log("Thanks for opening an account,", this.owner);
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  // Public interface

  getMovements() {
    return this._movements;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  //Private
  _approveLoan() {
    return true;
  }
}

const acc1 = new Account("Jonas", "EUR", 1111);

acc1.deposit(250);
acc1.withdraw(140);
console.log(acc1);

//==============Encapsulation through convention============
//convention used _ added before variable name so we know its supposed to be private
//in upcoming updates, '#' before variable name will refer to genuinely private fields

//===================Chaining==================
//just return the object itself to perform chaining
//done in challenge below

//==============Coding Challenge 2======================
console.log("\n\nCoding Challenge 2");

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log("Accelerating, new speed:", this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log("Braking, new speed:", this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(sp) {
    this.speed = sp * 1.6;
  }
}

const ford = new CarCl("Ford", 120);
console.log(ford);
ford.accelerate();
ford.brake();
console.log("Speed in mph", ford.speedUS);
ford.speedUS = 100;
console.log("Speed now 100mph i.e", ford.speed, "kph");

//===============Coding Challenge 4==========================
class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  accelerate() {
    this.speed += 20;
    this.charge -= 1;
    console.log(`Accelerating, speed: ${this.speed}, charge: ${this.charge}`);
    return this; //making accelerate chainable
  }
}

const rivian = new EVCl("Rivian", 120, 23);
console.log(rivian);
rivian.accelerate().brake();
