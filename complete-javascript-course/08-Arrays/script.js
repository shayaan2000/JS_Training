"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////

//=========================Array Methods============================
console.log("\n\n141. Array Methods");

let arr = ["a", "b", "c", "d", "e"];
//slice
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice()); //shallow copy

//splice - mutates original
console.log(arr.splice(3)); //[d, e] removed and returned,
console.log(arr); //[a, b, c] remain
console.log(arr.splice(-1)); //[c] removed and returned
console.log(arr); //[a, b]
console.log(arr.splice(1, 1)); //[b] removed and returned
console.log(arr); //[a]

//reverse - mutates
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());
console.log(arr2); //mutated

//concat
arr = ["a", "b", "c", "d", "e"];
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

//join
console.log(letters.join("-")); //a-b-c-d-e-f-g-h-i-j

//=========================For Each Method============================
console.log("\n\n142. For Each Method");

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

//for each with current element, index and current array
console.log("\n----for each----");
movements.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});

//=========================For Each Method on Maps/Sets============================
console.log("\n\n143. For Each Method on Maps/Sets");

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (currVal, key, map) {
  console.log(`${key} - ${currVal}`);
});

const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(currenciesUnique);
currenciesUnique.forEach(function (currVal, key, map) {
  console.log(`${key} - ${currVal}`);
});

//======================================================================================
// BANKIST APP
console.log("\n\n144. Bankist App");
// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//=========================================================================

//====================145. Creating DOM Elements==========================
console.log("\n\n145. Creating DOM Elements");

//movements here refer to transfer of funds
const displayMovements = function (movements) {
  //clearing container
  containerMovements.innerHTML = "";

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;

    //inserting in dom, this is outer container that has multiple movement rows
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayMovements(account1.movements);

//====================148. Map Method==========================
console.log("\n\n148. Map Method");

const eurToUSD = 1.1;
const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];
const movementsUSD = movements2.map(function (mov) {
  return mov * eurToUSD;
});

//arrow
const movementsUSDArrow = movements.map((mov) => mov * eurToUSD);

console.log(movements2);
console.log(movementsUSD);
console.log(movementsUSDArrow);

//other way is for of loop to push into a new array. Above is a more functional approach

const movementsDescriptions = movements.map((mov, i) => {
  if (mov > 0) {
    return `You deposited ${mov}`;
  } else {
    return `You withdrew ${Math.abs(mov)}`;
  }
});

console.log(movementsDescriptions);

//====================Computing Usernames==========================
console.log("\n\n149. Computing Usernames using Map");

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUserNames(accounts);
console.log(accounts);

//======================Filter Method===================================
console.log("\n\n150. Filter method");
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});
console.log(deposits, withdrawals);

//======================Reduce Method===================================
console.log("\n\n151. Reduce method");

const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);
console.log(balance);

//======BANKIST CONTINUED===========
const calcPrintBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};

calcPrintBalance(movements);
//=================================

//for finding max
const max = movements.reduce((acc, mov) => {
  return acc > mov ? acc : mov;
}, movements[0]);
console.log(max);

//====================146. Coding challenge 1==========================
console.log("\n\n146. Coding Challenge");

const dogAgeFinder = (dogArr) => {
  dogArr.forEach(function (dogAge, i) {
    const msg =
      dogAge >= 3
        ? `Dog Number ${i + 1} is an Adult of age ${dogAge}`
        : `Dog number ${i + 1} is still a puppy`;
    console.log(msg);
  });
};
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const dogsKateFinal = dogsKate.slice();
const dogsJuliaFinal = dogsJulia.slice(1, -2);
console.log(dogsJuliaFinal, dogsKate);
console.log("Julia");
dogAgeFinder(dogsJuliaFinal);
console.log("Kate");
dogAgeFinder(dogsKateFinal);

//======================Coding Challenge 2=================================== //continued from 1
console.log("\n\n152. Coding Challenge 2");

const calcAverageHumanAge = function (ages) {
  const filteredHumanAges = ages
    .map((age) => {
      return age <= 2 ? 2 * age : 16 + age * 4;
    })
    .filter((age) => age >= 18);
  console.log(filteredHumanAges);

  //avg
  const avg =
    filteredHumanAges.reduce((acc, age) => acc + age, 0) /
    filteredHumanAges.length;
  console.log("Average:", avg);
};

calcAverageHumanAge(dogsKateFinal);
