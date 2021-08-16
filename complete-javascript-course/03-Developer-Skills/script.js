"use strict";

//=================59. Using Google, StackOverflow, MDN=============
//Problem 1
console.log("Problem 1");
const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

const calcTempAltitude = function (temps) {
  let max;
  let min;

  if (temps[0]) {
    max = temps[0];
    min = temps[0];
  }

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== "number") continue;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }

  return max - min;
};

console.log(temperatures);
console.log("Temperature Altitude", calcTempAltitude(temperatures));

//Problem 2
//two arrays
console.log("\n\nProblem 2");
const calcTempAmplitudeMerge = function (t1, t2) {
  let max;
  let min;
  const temps = t1.concat(t2); //returns merged array

  if (temps[0]) {
    max = temps[0];
    min = temps[0];
  }

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== "number") continue;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  return max - min;
};

const tempArr1 = [7, 8, 20];
const tempArr2 = [1, 4, 9];
const amplitudeNew = calcTempAmplitudeMerge(tempArr1, tempArr2);
console.log("TempArr1", tempArr1);
console.log("TempArr2", tempArr2);
console.log("Temperature Altitude", amplitudeNew);

//===============61. Debugging with console and breakpoints==============
console.log("\n\n61. Debugging");

//via console
const measureKelvin = function () {
  const measurement = {
    type: "temp",
    unit: "celcius",

    //problem
    //leads to string concatination through coercion
    //value: prompt("Degree Celcius:"),

    //fix
    value: Number(prompt("Degree Celcius:")),
  };

  console.log(measurement.value); //logging
  console.warn(measurement.value); //warning
  console.error(measurement.value); //showing custom error in console
  console.table(measurement); //display object in table format

  const kelvin = measurement.value + 273;
  return kelvin;
};

console.log(measureKelvin());

//Debugger
debugger; //opens debugger here- esentially a breakpoint
//error fround was initial min val was less than actual min so if condition was never true
let min = 0;
const numArr = [1, 2, 3, 21, 4, 5];
for (let i = 0; i < numArr.length; i++) {
  if (numArr[i] < min) {
    min = numArr[i];
  }
}

console.log(numArr);
console.log("Min:" + min);

//=============62. Coding Challenge===============
const temperaturesByDay = [17, 21, 23];

function printForcast(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(`${arr[i]}C in ${i + 1} days`);
  }
}
console.log("\n", temperaturesByDay);
printForcast(temperaturesByDay);
