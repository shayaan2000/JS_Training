//============Strict Mode================
"use strict"; //has to be first line in the script
console.log("\n\n32. Strict mode");

//============Functions================
console.log("\n\n33. Functions");

function logger() {
  console.log("My name is Shayaan");
}

logger();

//with parameters
function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0); //sending arguments
console.log(appleJuice);
console.log(fruitProcessor(3, 4));

//============Function Declaration vs Expression================
console.log("\n\n34. Function Declaration vs Expression");

//declaration
function calcAge(birthYear) {
  return 2021 - birthYear;
}

const age1 = calcAge(2000);

//expression - anonymous function here
const calcAge2 = function (birthYear) {
  return 2021 - birthYear;
};
const age2 = calcAge2(2000);

console.log(age1, age2);

//============Arrow Function================
console.log("\n\n35. Arrow Function");

//simplest form
const calcAge3 = (birthYear) => 2021 - birthYear;
console.log(calcAge3(2000));

//multiple lines and parameters
const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2021 - birthYear;
  const retirement = 65 - age;

  return `${firstName} retires in ${retirement} years`;
};

console.log(yearsUntilRetirement(2000, "Shayaan"));

//============Functions calling other functions================
console.log("\n\n36. Functions calling other functions");

//with parameters

function cutFruitPieces(fruit) {
  return fruit * 4; //cutting into more pieces
}

function fruitJuicer(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
  return juice;
}

console.log(fruitJuicer(2, 1));

//============Review Functioins================
console.log("\n\n37. Review Functions");

//============Coding Challenge 1================
console.log("\n\n38. Coding Challenge #1");

let dolphinsScore1 = 85;
let dolphinsScore2 = 54;
let dolphinsScore3 = 41;
let koalasScore1 = 23;
let koalasScore2 = 34;
let koalasScore3 = 27;

const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

function checkWinner(avgDolphins, avgKoalas) {
  if (avgDolphins >= 2 * avgKoalas) {
    console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
  } else if (avgKoalas >= 2 * avgDolphins) {
    console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
  } else {
    console.log(`draw`);
  }
}

const avgDolphins = calcAverage(dolphinsScore1, dolphinsScore2, dolphinsScore3);
const avgKoalas = calcAverage(koalasScore1, koalasScore2, koalasScore3);

checkWinner(avgDolphins, avgKoalas);

//============Intro to Arrays================
console.log("\n\n39. Intro to Arrays");
const friends = ["Joey", "Chandler", "Ross"];

//other way
const years = new Array(1991, 1984, 2008, 2020);

//getting displaying
console.log(friends[0]);
console.log(friends[1]);
console.log(friends[friends.length - 1]);
console.log("Number of elements:", friends.length);

//changing
friends[2] = "Naqvi";
console.log(friends[2]);

//different datatypes in an array, and storing and array inside array
const firstName = "Shayaan";
const shayaan = [firstName, "Farooq", 2021 - 2000, "WebDev"];
friends[2] = shayaan;
console.log(friends[2]);

//============Basic Array Operations================
console.log("\n\n40. Basic Array Operations");

const food = ["Biryani", "Burger", "Pizza"];
console.log(food);

//add to end
let newLength = food.push("Bhindi"); //also returns new size
console.log("New length:", newLength, food);

//add to start
newLength = food.unshift("Ice cream");
console.log("New length:", newLength, food);

//remove elements
let lastElement = food.pop(); //returns last element after removing
console.log(lastElement + " removed", food);

friends.shift(); //first
console.log(food);

//finding element
console.log(food.indexOf("Biryani"));
console.log(food.indexOf("Ketchup")); //-1 if not found

//es6 methods - returns bool
console.log(food.includes("Biryani"));
console.log(food.includes("Ketchup")); //checks with strict equality

//============Coding Challenge 2================
console.log("\n\n41. Coding Challenge 2");

const bills = [125, 555, 44];
const tips = [];

function calcTip(bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

tips.push(calcTip(bills[0]));
tips.push(calcTip(bills[1]));
tips.push(calcTip(bills[2]));

console.log("Bills", bills);
console.log("Tips", tips);

//============Intro to Objects================
console.log("\n\n42. Intro to Objects");

//creating an object
const sf = {
  firstName: "Shayaan",
  lastName: "Farooq",
  age: 2021 - 2000,
  job: "WebDev",
  friends: ["Bilal", "Naqvi", "Huzaifa"],
};

console.log(sf);

//============Dot vs Bracket notation================
console.log("\n\n43. Dot vs Bracket Notation");

//dot operator / notation
console.log(sf.firstName);

//brackets notation
console.log(sf["firstName"]); //can take any expression inside []
console.log(sf["last" + "Name"]);

//example = user picks option
let userOption = "age";

//checking if age exists. if it doesn't, it will return undefined (falsy)
if (sf[userOption]) {
  console.log(sf[userOption]);
}

//adding values using . and []
sf.location = "Islamabad";
sf["instagram"] = "@shayaanfarooq";

//============Object Methods================
console.log("\n\n44. Object Methods");

const alik = {
  firstName: "Ali",
  lastName: "Khurram",
  birthYear: 1999,
  job: "Student",
  friends: ["Bilal", "Shayaan", "Huzaifa"],
  hasDriversLicense: true,

  //calculating and storing property age in this object
  calcAge: function () {
    this.age = 2021 - this.birthYear;
    return this.age;
  },

  //using 'this'
  displayObj: function () {
    console.log(this);
  },
};

//both notations . []
console.log(alik.calcAge());
console.log(alik["calcAge"]()); //() is for passing args
alik.displayObj();

//============Coding Challenge #3================
console.log("\n\n45. Coding Challenge #3");

const Mark = {
  fullName: "Mark Miller",
  mass: 78,
  height: 1.69,

  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

const John = {
  fullName: "John Smith",
  mass: 92,
  height: 1.95,

  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

Mark.calcBMI();
John.calcBMI();

if (Mark.bmi > John.bmi) {
  console.log(
    `${Mark.fullName}'s BMI (${Mark.bmi}) is higher than ${John.fullName}'s BMI (${John.bmi})`
  );
} else {
  console.log(
    `${Mark.fullName}'s BMI (${Mark.bmi}) is lower than ${John.fullName}'s BMI (${John.bmi})`
  );
}

//============Iteration- For Loops================
console.log("\n\n46. Iteration - for loop");

for (let rep = 1; rep <= 10; rep++) {
  console.log("rep number: " + rep);
}

//============Looping arrays, breaking, and continuing================
console.log("\n\n47. Looping arrays, breaking, and continuing");

const arr = [1, 6, 2, 8, 10, 11, 4];
const typeArr = [];

for (let i = 0; i < arr.length; i++) {
  console.log([arr[i]]);
  typeArr.push(typeof arr[i]); // or typeArr[i] = typeof arr[i];
}
console.log(arr);
console.log(typeArr);

//continue; skips current iteration
//break; terminates loop

//============Looping backwards, and Nested loops================
console.log("\n\n48. Looping backwards, and Nested loops");

console.log(arr);
console.log("Reverse:");
for (let i = arr.length - 1; i >= 0; i--) {
  console.log([arr[i]]);
}

//nested loop
/* pattern '\'
 */
let row;
const numRows = 5;
for (let i = 0; i < numRows; i++) {
  row = "";
  for (let sp = 0; sp < i; sp++) {
    row += " ";
  }
  console.log(row + "*");
}

//============While loop================
console.log("\n\n49. While loop");

//running while 10 times
let distance = 4;
while (distance > 0) {
  console.log("running - distance remaining: ", distance);
  distance--;
}
console.log("running - distance remaining: ", distance);

//============Coding Challenge #4================
console.log("\n\n50. Coding Challenge");

const billsArray = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tipsArray = [];
const totalsArray = [];

function calcTip(bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

for (let i = 0; i < billsArray.length; i++) {
  tipsArray.push(calcTip(billsArray[i]));
  totalsArray.push(billsArray[i] + tipsArray[i]);
}

console.log("Bills", billsArray);
console.log("Tips", tipsArray);
console.log("Totals", totalsArray);
