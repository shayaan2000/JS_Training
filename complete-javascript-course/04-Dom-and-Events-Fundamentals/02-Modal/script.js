"use strict";

//storing elements in variables
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//opening modal window on each button
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", openModal);
}

//closing on clicking x or outside modal
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

//keyboard events are usually global, thus on document
document.addEventListener("keydown", function (e) {
  //e is the event passed into this function
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
