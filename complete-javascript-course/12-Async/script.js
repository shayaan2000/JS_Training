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
};

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
btn.addEventListener("click", function () {
  getCountryData("Pakistan");
});

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
