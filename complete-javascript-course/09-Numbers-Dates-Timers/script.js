"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2021-08-18T23:36:17.929Z",
    "2021-08-23T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  const nowDay = `${date.getDate()}`.padStart(2, 0);
  const nowMonth = `${date.getMonth() + 1}`.padStart(2, 0);
  const nowFullYear = date.getFullYear();

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log("--Days Passed:", daysPassed);

  if (daysPassed === 0) return "Today";
  else if (daysPassed === 1) return "Yesterday";
  else if (daysPassed < 8) return `${daysPassed} days ago`;

  return `${nowDay}/${nowMonth}/${nowFullYear}`;
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const nowDate = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(nowDate);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>

        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

const nowDate = new Date();
const nowDay = `${nowDate.getDate()}`.padStart(2, 0);
const nowMonth = `${nowDate.getMonth() + 1}`.padStart(2, 0);
const nowFullYear = nowDate.getFullYear();
labelDate.textContent = `${nowDay}/${nowMonth}/${nowFullYear}`;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add Transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      //add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2000);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
//======================converting and checking numbers================================
console.log("\n\n168. Converting and Checking Numbers");
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); //false because 0.1 is weird in JS

//Conversion
console.log(Number("23"));
console.log(+"23");

//parsing
console.log(Number.parseInt("30px", 10)); //30
console.log(Number.parseInt("e20", 10)); //NaN

console.log(Number.parseFloat(" 2.5 rem ")); //2.5
console.log(Number.parseInt(" 2.5 rem ")); //2

//NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN("20"));
console.log(Number.isNaN(+"20x")); //true
console.log(Number.isNaN(23 / 0)); //false - infinity

//isFinite
console.log("-----isfinite----");
console.log(Number.isFinite(20)); //true
console.log(Number.isFinite("20")); //false
console.log(Number.isFinite(+"20x")); //false
console.log(Number.isFinite(23 / 0)); //false

console.log(Number.isInteger(23.0)); //true
console.log(Number.isInteger(23.2)); //false

//======================converting and checking numbers================================
console.log("\n\n169. Math and Rounding");

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, "23", 11, 2));
console.log(Math.max(5, 18, "23px", 11, 2)); //NaN

console.log(Math.floor(Math.random() * 6) + 1);

//function to generate randinrange
const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20)); //11-20

//Rounding Integers
console.log(Math.round(23.3)); //23
console.log(Math.round(23.9)); //24

console.log(Math.ceil(23.3)); //24
console.log(Math.ceil(23.9)); //24

console.log(Math.floor(23.3)); //23
console.log(Math.floor(23.9)); //23

console.log(Math.trunc(-23.3)); //23
console.log(Math.floor(-23.3)); //24

//Rounding Decimats
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.347).toFixed(2));
console.log((2.347).toFixed(2));

//======================Remainder Operator================================
console.log("\n\n170. Remainder Operator");

console.log(5 % 2); //1
console.log(6 % 2); //0

const isEven = (n) => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));

labelBalance.addEventListener("click", function () {
  [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
    if (i % 2 === 0) row.style.background = "orangered";
  });
});

//======================Big Int================================
console.log("\n\n171. Big Int");

//max number
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

//big int
console.log(11244124124124435134135125412n); //n at the end is for big int
console.log(BigInt(11244124));

console.log(1000000000000000000000000000000n * 123512315231231212412n); // cannot mix bigInt with other types

//exceptions
console.log(20n > 15);
console.log(20n === 20); //false - no type coercion
console.log(20n == 20); //true

//divisions
console.log(10n / 3n); //returns closes big int
console.log(10 / 3);

//======================Creating================================
console.log("\n\n172. Creating Dates");

//create date - 4 ways
//1
const now = new Date();
console.log(now);

//2
console.log(new Date("Aug 24 2021 11:26:01"));
console.log(new Date("December 24, 2015"));
console.log(new Date(account1.movementsDates[0]));

//3
//(year, month, day, hour, min, second)
console.log(new Date(2037, 10, 19, 15, 23, 5)); //month is 0 based
console.log(new Date(2037, 10, 33)); //auto corrects date. November 33 becomes December 3

//4 - we can also pass Timestamps - amount of ms passed since Date(0)
console.log(new Date(0)); //Jan 1 1970
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //3 days x 24 hours x 60 mins x 60 sec x 1000 ms - 3Days Later Timestamp

//Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth()); //0 based
console.log(future.getDate());
console.log(future.getDay()); //day of the week 0 is sunday
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); //cool string
console.log(future.getTime()); //milliseconds

//now milliseconds
console.log(Date.now());

//setters
future.setFullYear(2040);
console.log(future);

//======================Adding Dates to Bankist================================
console.log("\n\n173. Adding Dates to Bankist");
//done above in relevant places

//======================Operators in Dates================================
console.log("\n\n174. Operators on Dates");

const futureDate = new Date(2037, 10, 19, 15, 23);
console.log(+futureDate); //converts to timestamp
const calcDaysPassed = (date1, date2) =>
  Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 17));
console.log(days1);

console.log(account1.movementsDates);

//======================Internationalizing Dates================================
console.log("\n\n175. Internationalization Api");
const currentDate = new Date();
console.log(new Intl.DateTimeFormat("en-US").format(currentDate));

//providing settings to DateTimeFormat
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric", //or 2-digit or long
  weekday: "short", //or long or narrow
};

const locale = navigator.language;
console.log(locale);
console.log(new Intl.DateTimeFormat(locale, options).format(currentDate));

//======================Internationalizing Numbers================================
console.log("\n\n176. Numbers");

const num = 124512.39;
const options2 = {
  style: "unit", //basically here you select which one of the below will be used
  unit: "celsius",
  currency: "EUR",
};
console.log("US:", new Intl.NumberFormat("en-US", options2).format(num));
console.log("Germany:", new Intl.NumberFormat("de-DE", options2).format(num));
console.log("Pakistan:", new Intl.NumberFormat("ur-PK", options2).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);

//======================Set Timeout and Set Interval================================
console.log("\n\n177. Timers: setTimeout and setInterval");

setTimeout(() => console.log("heres your pizza"), 3000); //calls callback after 3000 milliseconds - async js
console.log("waiting...");

//all arguments at the end will be sent to the inner callback function
const ingredients = ["olives", "tomato"];
const pizza2Timer = setTimeout(
  (ing1, ing2) => console.log(`Heres your pizza ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
console.log("waiting for second line");

//stopping timer before it completes
if (ingredients.includes("tomato")) {
  clearTimeout(pizza2Timer);
  console.log("Timer on second one cleared");
}

//setInterval - calling every n seconds
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 100000);
