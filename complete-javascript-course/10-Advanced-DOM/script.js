"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const nav = document.querySelector(".nav");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//==============185. Smooth Scroll=======================
btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords); //for the section

  console.log(e.target.getBoundingClientRect()); //for learn more text
  console.log("curremt scroll x/y", window.pageXOffset, window.pageYOffset);
  console.log(
    "window h/w",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //scrolling
  /*
  // old way
  window.scrollTo(s1coords.left, s1coords.top + window.pageYOffset); //adding to do relative to entire page

  //another way to scroll
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: "smooth",
  });
  */

  //new way
  section1.scrollIntoView({ behavior: "smooth" });
});

//===============================189. Page Naviagation==========================
/*
-------------------------Inefficient approach-------------------------

document.querySelectorAll(".nav__link").forEach(function (el) {
  //we attached a copy of this event handler function to 3 different elements
  el.addEventListener("click", function (e) {
    e.preventDefault(); //dont to prevent scroll based on href in element

    const id = this.getAttribute("href");
    console.log(id);

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});
*/

//-----------------------Event Delegation------------------------------

// 1. Add event listener to common parent
// 2. Determine origin
document.querySelector(".nav__links").addEventListener("click", function (e) {
  console.log(e.target);

  //Matching
  if (
    e.target.classList.contains("nav__link") &&
    !e.target.classList.contains("nav__link--btn")
  ) {
    console.log("LINK");

    e.preventDefault(); //dont to prevent scroll based on href in element
    const id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//===========================191. Tabbed Component==========================
tabsContainer.addEventListener("click", function (e) {
  // Determining which button
  const clicked = e.target.closest(".operations__tab");

  // Guard clause
  if (!clicked) return;

  // Selected tab
  tabs.forEach((t) => t.classList.remove("operations__tab--active")); // Removing active from all
  clicked.classList.add("operations__tab--active");

  // Activate content area
  tabsContent.forEach((c) => c.classList.remove("operations__content--active")); // Removing active from all
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active"); //we have data- stored in html
});

//===========================192. Menu Fade (Passing Arguments to Event Handlers)==========================

const handleHover = function (e) {
  //e.target remains same but
  const opacity = this;

  if (
    e.target.classList.contains("nav__link") ||
    e.target.classList.contains("nav__item")
  ) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

// one way is to call desired function inside callback function
// other way is using bind("arg in here that will become 'this' inside callback")
nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

//===================193. Sticky Navigation=========================
/*
const initialCoords = section1.getBoundingClientRect();
//scroll event - not a good performance
window.addEventListener("scroll", function (e) {
  if (window.scrollY > initialCoords.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});
*/
//====================194. Intersection Observer Api (with sticky nav)=================

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

// entries is an array of IntersectionObserverEntry the size of which depends on number of thresholds
const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, //basically top margin here
});

headerObserver.observe(header);

//====================195. Revealing Elements on Scroll=================

// Reveal Section
const revealSection = function (entries, observer) {
  const [entry] = entries;

  //Guard Clause
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const allSections = document.querySelectorAll(".section");

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

//=====================Lazy Loading===========================
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  //replace src with data-src
  entry.target.src = entry.target.dataset.src;

  //remove blue after load
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  //removing observer
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});

imgTargets.forEach((img) => imgObserver.observe(img));

//================197. Building a slider 198. Adding dots=============================

const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
let curSlide = 0;
const maxSlide = slides.length - 1;

//placing slides horizontally
slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

//creating dots
const dotContainer = document.querySelector(".dots");

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

//activate dot
const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

//going to slide
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - (slide % 3))}%)`)
  );
  activateDot(slide);
};

//go to 0
goToSlide(0);

//next slide
const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

//previous slide
const previousSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

//pressing buttons
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", previousSlide);

//keys for left right
document.addEventListener("keydown", function (e) {
  console.log(e);
  if (e.key === "ArrowLeft") previousSlide();
  else if (e.key === "ArrowRight") nextSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset; //destructuring data-slide
    goToSlide(slide);
    activateDot(slide);
  }
});

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
// Code inside here will not run. It was used initially to test out different aspects
if (false) {
  //==============Selecting, creating, inserting elements==============
  console.log("\n\n183. Selecting, Creating, and Deleting Elements");
  //Selecting
  console.log(document.documentElement);
  console.log(document.head);
  console.log(document.body);

  // Query selector
  const header = document.querySelector(".header");
  const allSections = document.querySelectorAll(".section");
  console.log(allSections);

  // Getting by id etc
  document.getElementById("section--1");
  const allButtons = document.getElementsByTagName("button");
  console.log(allButtons);
  console.log(document.getElementsByClassName("btn")); //HTMLCollection ->realtime updates unlike a NodeList from querySelector

  // Creating, inserting elements
  const message = document.createElement("div");
  message.classList.add("cookie-message");

  message.textContent =
    "We use cookied for improved functionality and analytics.";
  message.innerHTML =
    'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

  header.prepend(message);
  header.append(message); //can not be in two places at once so is moved to the end after append

  //Cloning
  //header.append(message.cloneNode(true));

  // Adding siblings
  // header.before(message);
  // header.after(message);

  // Delete elements
  document
    .querySelector(".btn--close-cookie")
    .addEventListener("click", function () {
      message.remove();

      // Old way through traversal
      // message.parentElement.removeChild(message);
    });

  //==============Styles, Attributes, and Classes==============
  console.log("\n\n184. Styles, Attributes, and Classes");

  // Styles
  message.style.backgroundColor = "#37383d";
  message.style.width = "120%";
  console.log(message.style.height); //no result

  // We need getComputedStyles for styles that are not in line
  console.log(getComputedStyle(message).color);
  console.log(getComputedStyle(message).height);

  message.style.height =
    Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";
  document.documentElement.style.setProperty("--color-primary", "orangered");

  // Attributes
  const logo = document.querySelector(".nav__logo");
  console.log(logo.alt);
  console.log(logo.className);

  // Setting an attribute
  logo.alt = "Beautiful minimalist logo";
  logo.setAttribute("designer", "jonas");

  // Cannot get attribute if not standard, for that we need
  console.log(logo.getAttribute("designer"));

  console.log(logo.src); //absolute path
  console.log(logo.getAttribute("src")); //relative path

  // Data attributes
  // needs to start with "data-"
  logo.setAttribute("data-version-number", "3.0");
  console.log(logo.dataset.versionNumber);

  //classes
  logo.classList.add("x");
  logo.classList.remove("x");
  logo.classList.toggle("x");
  logo.classList.contains("x");

  // Do not use - will overwrite
  //logo.className = 'jonas'

  //=======185 Types of Events===========
  console.log("\n\nTypes of Events and Handlers");

  const alertH1 = function (e) {
    alert("addEventListener: great! youre reading the heading");
    h1.removeEventListener("mouseenter", alertH1); //removing once happens
  };

  const h1 = document.querySelector("h1");
  h1.addEventListener("mouseenter", alertH1);

  // 3rd way is inline in html like <h1 onClick= "alert()"></h1>

  //======================Event propogation in Practice==========================
  console.log("\n\n188 Event propogation in Practice");

  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  const randomColor = () =>
    `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

  // demonstrating on navigation tab "features", and its parents
  document.querySelector(".nav__link").addEventListener("click", function (e) {
    console.log("LINK", e.target, e.currentTarget);
    this.style.backgroundColor = randomColor();

    // For stopping propogation
    // e.stopPropagation();
  });

  // parent of nav__link
  document.querySelector(".nav__links").addEventListener("click", function (e) {
    console.log("LINK Parent", e.target, e.currentTarget);
    this.style.backgroundColor = randomColor();
  });

  document.querySelector(".nav").addEventListener(
    "click",
    function (e) {
      console.log("LINK Parent of Parent", e.target, e.currentTarget);
    },
    true
    // To listen on capturing phase rather than bubble up, we add third argument as true
  );

  // Event is the same, but propogates through parents.
  // e.target is the original target
  // e.currentTarget is where the handler is attached

  //======================190. DOM Traversal============================
  console.log("\n\n190. DOM Traversal");

  //--Going downwards: child--
  console.log(h1.querySelectorAll(".highlight"));
  console.log(h1.childNodes);
  console.log(h1.children);
  //first or lastElementChild
  h1.firstElementChild.style.color = "white";
  h1.lastElementChild.style.color = "orangered";

  //--Going upwards--
  console.log(h1.parentNode); //direct parent
  console.log(h1.parentElement); //direct parent

  //closest parent with given class
  h1.closest(".header").style.background = "var(--gradient-secondary)";
  h1.closest("h1").style.background = "var(--gradient-secondary)"; //returns itself

  //--Going sideways
  console.log(h1.previousElementSibling); //null as nothing there
  console.log(h1.nextElementSibling);

  console.log(h1.previousSibling);
  console.log(h1.nextSibling);

  //for non-adjacent siblings
  console.log(h1.parentElement.children);
  [...h1.parentElement.children].forEach(function (e) {
    if (e !== h1) {
      e.style.transform = "scale(0.5)";
    }
  });

  //===========199. DOM lifecylce Events====================
  document.addEventListener("DOMContentLoaded", function (e) {
    console.log("HTML parsed and DOM Tree built!", e);
  });

  window.addEventListener("load", function (e) {
    console.log("Page fully loaded, e");
  });

  //when user is leaving
  window.addEventListener("beforeunload", function (e) {
    e.preventDefault(); //required by other browsers
    console.log(e);
    e.returnValue = ""; //shows are you sure message when leaving
  });
}
