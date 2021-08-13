//Alert - commented to avoid popup
//alert("HelloWorld");


//===============Values and Variable===============
//Values
console.log("Shayaan");

//Variable 
console.log("\n\n10. Values and Variables")
let firstName = "Shayaan";
console.log("first name in the variable is " + firstName);

/*Naming Variables
    - camelCaseNotation
    - ALL_CAPS: for constants
    - keywords like new cant be used unless used like _new or $new
    - cant start with number
    - should be meaningful, not something like myVar
*/

//===============Datatype===============
console.log("\n\n12. Data Types")
let javaScriptIsFun = true //boolean
console.log(javaScriptIsFun);
console.log(typeof javaScriptIsFun);

//Dynamic Typing
javaScriptIsFun = "Yes";
console.log(typeof javaScriptIsFun);


//===============let, const, var===============
console.log("\n\n13. let, const, var")
let age = 30; //when we want to change values, or not assign values initially
const birthYear = 2000; // Can not change the value. Also should assign initial value
var x = 10; //should be avoided, older way. Let is block scoped/ Var is function scoped
y = "this is a global variable" //global, avoid


//===============Operators=================
console.log("\n\n14. Operators")
let currentYear = 2037;
const jonasBirthYear = 1991;
ageJonas = currentYear - jonasBirthYear;
console.log(currentYear, currentYear, ageJonas)

//math //+ - * / ** 

//concatination
console.log(firstName + " Farooq");

//Assignment operators
x = 10 + 5; //15
x += 10 // x = x + 10 = 25  
x *= 4 // x = x x 4 = 100  
x++ // x = x - 1 = 99  

//Comparison operators
console.log(x > 10) //returns bool
/* >, <, >=, <= */


//===============Operator Precedence===============
console.log("\n\n14. Operator Precedance")
//google precedence table on mdn

console.log(currentYear - 1991 > currentYear - 2018)
let a, b;
a = b = 25 - 10 - 5; //a=b=40, a=40


//=================Coding challenge 1==============
console.log("\n\n16. Coding Challenge 1")
markHeight = 1.69; //in meters
markWeight = 78; //kgs
johnHeight = 1.95;
johnWeight = 92;

markBMI = markWeight / markHeight ** 2;
johnBMI = johnWeight / johnHeight ** 2;
markHigherBMI = markBMI > johnBMI;

console.log(markBMI, johnBMI);
console.log("mark>john", markHigherBMI)


//===============Strings and Template Literals==================
console.log("\n\n17. Strings and Template Literals")

var carName = "Civic";
var carColor = "Black";
var carModel = 2005;

var carRecord = "throguh concatination: This is a " + carColor + " " + carName + " from the year " + carModel;
console.log(carRecord);

//this is confusing to do^
//Template Literals 
console.log(`through template literals: This is a ${carColor} ${carName} from the year ${carModel}`);
console.log(`through template literals: simple to use
multiple 
lines 
for printing`);


console.log("\n\n18. If else")
const ageSarah = 19;

let yearsLeft; //declare outside to access outside 
if (ageSarah >= 18) {
    console.log("sara can start driving")
} else {
    yearsLeft = 18 - ageSarah;
    console.log(`Sarah is too young, wait another ${yearsLeft} years`);
}


//=================Coding challenge 2==============
console.log("\n\n19. Coding Challenge 2 (if/else, template literals)")
markHeight = 1.69; //in meters
markWeight = 78; //kgs
johnHeight = 1.95;
johnWeight = 92;

markBMI = markWeight / markHeight ** 2;
johnBMI = johnWeight / johnHeight ** 2;
if (markBMI > johnBMI) {
    console.log(`Mark's BMI (${markBMI}) is higher than John's BMI (${johnBMI})`);
} else {
    console.log(`Mark's BMI (${markBMI}) is less than John's BMI (${johnBMI})`);
}


//================Type conversion & Coercion===================
console.log("\n\n20. Type conversion & Coercion")

//type conversion
const inputYear = "1991";
console.log(Number(inputYear), inputYear);
console.log(inputYear + 18); //automatically converts number to string while concatting
console.log(Number('Jonas')); //NaN is NotaNumber and its type is number
console.log(String(23), 23);

//type coercion - JS does it bts
console.log("I am " + 21 + " years old"); //number changes to string
console.log('23' + '10' - 3); // "23" + 7 ==> 2307 
console.log('23' > '18');


//================Truthy and Falsy Values=======================
console.log("\n\n21. Truthy and Falsy Values")

// 5 Falsy: 0, '', null, undefined, Nan
//rest are all truthy
console.log(Boolean(0))
console.log(Boolean(''))
console.log(Boolean(null))
console.log(Boolean(Number("sdas")))
let undefFalsy;
console.log(Boolean(undefFalsy));

//coercion
if (undefFalsy) {
    console.log("Defined")
}
else {
    console.log("variable is undefined")
}


//===============Equality Operators == vs === ===============
console.log("\n\n22. Equality Operators");
let myAge = 21;
if (myAge === 21) console.log("1. 21===21: true") //recommended 

myAge = "21"
if (myAge === 21) console.log("2. '21'===21 true")
if (myAge == 21) console.log("3. '21'==21 true")

//if else if
//prompt("Whats your fav number?");

console.log("\nif else if ");
let favNumber = Number("23")
//let favNumber = "23" //uncomment to see difference

if (favNumber === 23) {
    console.log("=== 23")
}
else if (favNumber == 23) {
    console.log("==23")
}
else {
    console.log("Not 23")
}


//!== opposite of === 
//it is always recommended to use strict versions rather than != and ==


//===============Boolian Logic ===============
console.log("\n\n23. Boolean Logic");

//and or not pretty basic theory stuff
//! has precedence

//===============Logical Operators && || !===============
console.log("\n\n24. Logical Operators && || !");

/*
AND &&
OR ||
NOT !
*/

const hasDriversLicense = true;
const hasGoodVision = true;
const hasExperience = false;

console.log(!hasDriversLicense) //F

console.log(hasDriversLicense && hasGoodVision) //T
console.log(hasDriversLicense && hasExperience) //F
console.log(hasDriversLicense && !hasExperience) //T

console.log(hasDriversLicense || hasGoodVision) //T
console.log(hasDriversLicense || hasExperience) //T
console.log(hasDriversLicense || !hasExperience) //T

console.log(hasDriversLicense || hasExperience || hasGoodVision) //T
console.log(hasDriversLicense && hasExperience && hasGoodVision) //F


//===============Coding challenge 3===============
console.log("\n\n25. Coding Challenge 3");
let dolphinsScore1 = 96;
let dolphinsScore2 = 108;
let dolphinsScore3 = 89;
let koalasScore1 = 88;
let koalasScore2 = 91;
let koalasScore3 = 110;

let dolphinsAvgScore = (dolphinsScore1 + dolphinsScore2 + dolphinsScore3) / 3;
let koalasAvgScore = (koalasScore1 + koalasScore2 + koalasScore3) / 3;

if (dolphinsAvgScore > koalasAvgScore) {
    console.log(`Dolphins ${dolphinsAvgScore} won against Koalas ${koalasAvgScore}`)
}
else if (dolphinsAvgScore < koalasAvgScore) {
    console.log(`Dolphins ${dolphinsAvgScore} lost against Koalas ${koalasAvgScore}`)
}
else {
    console.log(`Dolphins ${dolphinsAvgScore} drew against Koalas ${koalasAvgScore}`)
}


//===============Switch Statement===============
console.log("\n\n26. Switch Statement");
const day = 'wednesday'
switch (day) {
    case 'monday': //day === monday
        console.log("Monday is the day ")
        break;
    case 'tuesday':
        console.log("Tuesday is the day ")
        break;
    case 'wednesday':
    //no break here automatically goes to thursday
    case 'thursday':
        console.log("Wed / Thur is the day ")
        break;
    default:
        console.log("thats not a day");

}

//===============Statements and Expressions===============
console.log("\n\n27. Statements and Expressions");
console.log("console.log(expression); <- statement")


//===============The Conditional (Ternary) Operator===============
console.log("\n\n28. The Conditional (Ternary) Operator");

//this is an expression not a statement, thus result can be stored
// condition ? do if true : do if false
let aliAge = 20;
const drinks = age >= 10 ? "chaye" : "juice";
console.log(drinks)
console.log(`template literal: i like to drink ${age >= 10 ? "chaye" : "juice"}`)


//===============Coding challenge 4===============
console.log("\n\n29. Coding Challenge 4");
const bill = 275;
let tip = (bill >= 50 && bill <= 300) ? bill * 0.15 : bill * 0.20;
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value was ${bill + tip}`);