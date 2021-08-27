"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

//=====================247. Fetch API========================

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
};

const renderCountry = function (data, className = "") {
  const html = `
      <article class="country ${className}">
        <img class="country__img " src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}m people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
      `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

btn.addEventListener("click", function () {
  getCountryData("Pakistan");
});

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    "country not found"
  );

  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(
      (response) => {
        // console.log(response); //has response.ok
        if (!response.ok) {
          throw new Error(`Country not found (${response.status})`);
        }

        return response.json();
      }
      //,(err) => alert(err) //handling error by adding another callback function- better way is to add .catch at the end of the chain
    ) //response.json also is a promise so we can chain then
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error("No neighbour");

      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        "Country not found"
      );
    })
    .then((data) => renderCountry(data, "neighbour"))
    .catch((err) => {
      console.log(err);
      renderError(`Something went wrong ${err.message}`);
    })
    .finally(() => {
      console.log(
        "finally() always called at the end- good for hiding spinners"
      );
      countriesContainer.style.opacity = 1;
    });
};

//=====================Coding Challenge 1======================
console.log("\n\nCoding Challenge 1");

//https://geocode.xyz/52.508,13.381?geoit=json

const myGetJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(errorMsg);
    return response.json();
  });
};

const whereAmI = (latitude, longitude) => {
  //
  myGetJSON(
    `https://geocode.xyz/${latitude},${longitude}?geoit=json`,
    "Enter valid lat/lon"
  )
    .then((data) => {
      // console.log(data);
      if (data.error) throw new Error("Please enter valid coords");

      console.log(`Location is ${data.city}, ${data.country}`);
      // getCountryData(data.country);
    })
    .catch((err) => {
      console.log(err);
    });
};

whereAmI("52.508", "13.381");

//==========254. Event Loop in Practice=============
console.log("\n\n254. Event loop in Practice");

// Order of these 4 statements
console.log("Test Start"); //1
setTimeout(() => console.log("0 sec timer"), 0); //4

// Building a promise that is resolved immediately
Promise.resolve("Resolved promise 1").then((res) => {
  console.log(res); //3
});
console.log("Test End"); //2

//===========255. Building a simple promise=========
console.log("\n\n255. Building a simple promise");

// Lottery Example
const lotteryPromise = new Promise(function (resolve, reject) {
  if (Math.random() >= 0.5) {
    resolve("You win(255)"); //argument is result of promise that is available in then
  } else {
    reject(new Error("You lost(255)")); //this argument will be passed to .catch
  }
});

lotteryPromise.then((res) => console.log(res)).catch((err) => console.log(err));

// Promisifying - wrapping old callback async code

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// it's more flat
wait(1)
  .then(() => {
    console.log("1 second passed");
    return wait(1);
  })
  .then(() => {
    console.log("2 seconds passed");
    return wait(1);
  })
  .then(() => {
    console.log("3 seconds passed");
    return wait(1);
  })
  .then(() => {
    console.log("4 seconds passed");
  });

Promise.resolve("abc(255)").then((x) => console.log(x));
Promise.reject(new Error("xyz(255)")).catch((a) => console.log(a));

//=========Promisifying Callback based Api====================

// Callback based API
navigator.geolocation.getCurrentPosition(
  (position) => console.log(position),
  (err) => console.log(err)
);

// Promisifying
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => resolve(position),
    //   (err) => reject(err)
    // );
    // instead:
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then((pos) =>
  console.log("After promisifying navigator.geolocation:", pos)
);

//===============Coding Challenge 2=====================
// Promisifying loading img.src element
const imgContainer = document.querySelector(".images");

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error("Image not found (challenge 2)"));
    });
  });
};

let currentImg;
/*
createImage("img/img-1.jpg")
  .then((img) => {
    currentImg = img;
    console.log("img 1 loaded (challenge 2)");
    return wait(2); //waiting 2 seconds after loading
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("img/img-2.jpg");
  })
  .then((img) => {
    currentImg = img;
    console.log("img 1 loaded (challenge 2)");
    return wait(2); //waiting 2 seconds after loading
  })
  .then(() => {
    currentImg.style.display = "none";
  })
  .catch((err) => console.log(err));
*/
//==================258. Async Await======================
const whereAmI2 = async function () {
  try {
    const pos = await getPosition();
    const { latitude, longitude } = pos.coords;
    console.log(latitude, longitude);
    const resGeo = await fetch(
      `https://geocode.xyz/${latitude},${longitude}?geoit=json`
    );

    if (!resGeo.ok) throw new Error("Problem getting location data");

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );

    if (!res.ok) throw new Error("Problem getting location data");

    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);

    return `YOU ARE IN ${dataGeo.city}`;
  } catch (err) {
    console.log(`${err}`);
    throw err; //transfering error out to the .catch()
  }
};

console.log(whereAmI2()); //promise

whereAmI2()
  .then((res) => console.log("---.then() on async ftn", res))
  .catch((err) => console.log(err))
  .finally(() => console.log("done"));

// OR USE IMMEDIATELY INVOKED FUNCTION TO DEFINE AN ASYNC FUNCTION
/*
(async function () {
  try {
    city = await whereAmI2();
  } catch (err) {
    console.log(err.message);
  }
})();
*/

//==============Running Promises in Parallel

const get3Countries = async function (c1, c2, c3) {
  try {
    // sequential loading
    const [data1] = await getJSON(
      `https://restcountries.eu/rest/v2/name/${c1}`
    );
    const [data2] = await getJSON(
      `https://restcountries.eu/rest/v2/name/${c2}`
    );
    const [data3] = await getJSON(
      `https://restcountries.eu/rest/v2/name/${c3}`
    );

    console.log("THREE COUNTRIES: ", [
      data1.capital,
      data2.capital,
      data3.capital,
    ]);

    // parallel loading
    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);

    console.log("----PromiseAll Data", data);
    console.log(data.map((d) => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};

get3Countries("portugal", "canada", "tanzania");

// =================259. Try Catch==========================
try {
  let y = 1;
  const z = 2;
  z = 3;
} catch (err) {
  console.log("try catch error", err.message);
}

//===========Promise Combinators=========================
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/brazil`),
    getJSON(`https://restcountries.eu/rest/v2/name/belgium`),
    getJSON(`https://restcountries.eu/rest/v2/name/france`),
  ]);
  console.log("---Promise.race--", res[0]);
})();
//fulfilment value of race is the same as fulfilment value of winning promise in array

//==================Coding Challenge 3===================
//1
const loadNPause = async function () {
  try {
    let img = await createImage("img/img-1.jpg");
    console.log("--img 1 loaded--");
    await wait(2);
    img.style.display = "none";

    //image 2
    img = await createImage("img/img-2.jpg");
    console.log("--img 2 loaded--");
    await wait(2);
    img.style.display = "none";
  } catch (err) {
    console.log(err);
  }
};

//2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (img) => await createImage(img));
    console.log("--imgs in loadAll", imgs); //[Promise, Promise]

    const imgsEl = await Promise.all(img);
    console.log("--imgEl in loadAll", imgsEl);
    imgsEl.forEach((img) => img.classList.add("parallel"));
  } catch (err) {
    console.log(err);
  }
};

loadAll(["img/img-1.jpg", "img/img-2.jpg"]);
// loadNPause();

//=============less abstraction================
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(
      (response) => {
        console.log(response); //has response.ok
        if (!response.ok) {
          throw new Error(`Country not found (${response.status})`);
        }

        return response.json();
      }
      //,(err) => alert(err) //handling error by adding another callback function- better way is to add .catch at the end of the chain
    ) //response.json also is a promise so we can chain then
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;

      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data, "neighbour"))
    .catch((err) => {
      console.log(err);
      renderError(`Something went wrong ${err.message}`);
    })
    .finally(() => {
      console.log(
        "finally() always called at the end- good for hiding spinners"
      );
      countriesContainer.style.opacity = 1;
    });
};
*/

//============246. This is the old way of doing things, leads to 'callback hell'==============
/*

const getCountryAndNeighbour = function (country) {
  // Ajax call country one
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  // on load and callback
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText); //destructuring
    console.log(this.responseText);
    console.log(data);

    //render country 1
    renderCountry(data);
    countriesContainer.style.opacity = 1;

    const [neighbour] = data.borders;
    console.log(neighbour);
    if (!neighbour) return;

    // AJAX
    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener("load", function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, "neighbour");
    });
  });
};

//orders for these will not necessarily be maintained
getCountryAndNeighbour("portugal");
*/
