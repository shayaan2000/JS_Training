"use strict";

// Selecting elements
const navIncomplete = document.querySelector("#nav-incomplete");
const navComplete = document.querySelector("#nav-complete");
const taskListContainer = document.querySelector("#task-list")
const dateEl = document.querySelector(".date");
const numberOfActiveEl = document.querySelector(".num-active");
const addTaskForm = document.querySelector(".add-task-form");
const mainContainer = document.querySelector(".main-container");
const deleteIcons = document.getElementsByClassName("task-delete");
const finishIcons = document.getElementsByClassName("task-finish");
const revertIcons = document.getElementsByClassName("task-revert");

// Date settings
const dateOptions = {
  day: "numeric",
  month: "long",
  weekday: "long", //or long or narrow
};

// Data
let listOfTasks = [];
let currentPage = 0;
let idCount = 0;

// Creates the HTML for a given task
const generateTaskMarkup = function (task, id) {
  const completed = task.completed;
  return `
  <li class="task" data-id="${id}">
    <div class="task-container">
      <p class="task-title"><i class="icon-${completed ? "undo" : "check"} icon-large task-${completed ? "revert" : "finish"}"></i>
        <span class="${completed ? "complete" : "incomplete"}">${task.title}</span>
      </p>  
      <i class="icon-trash icon-large task-delete"></i>
    </div>  
    <div class=divider></div>
  </li>  
  `
}


const selectTab = (completedFlag = false) => {
  [navComplete, navIncomplete].forEach((navItem) => navItem.classList.remove("active"));
  completedFlag ? navComplete.classList.add("active") : navIncomplete.classList.add("active")
  completedFlag ? currentPage = 1 : currentPage = 0;
  displayTasks(completedFlag);
}

// Display Tasks
const displayTasks = (completedFlag = false) => {
  // rendering
  taskListContainer.innerHTML = '';
  const taskListHTML = listOfTasks.map((task, i) => {

    // only returning if completed status matches required
    if (task.completed === completedFlag) {
      return (generateTaskMarkup(task, task.id))
    }
  }).join('');
  taskListContainer.innerHTML = taskListHTML

  attachEventListeners();
  updateActiveTaskHeading();
}

// attach event listeners on new elements
const attachEventListeners = function () {
  for (const icon of deleteIcons) {
    icon.addEventListener("click", handleDelete)
  }

  for (const icon of finishIcons) {
    icon.addEventListener("click", handleChangeInStatus)
  }

  for (const icon of revertIcons) {
    icon.addEventListener("click", handleChangeInStatus)
  }
}

const handleDelete = (e) => {
  const elementToBeRemoved = e.target.closest(".task");

  if (!elementToBeRemoved) return;

  console.log(elementToBeRemoved.dataset.id);
  console.log(elementToBeRemoved);

  const taskId = elementToBeRemoved.dataset.id;
  const taskPos = listOfTasks.map((task) => task.id).indexOf(+taskId);

  listOfTasks.splice(taskPos, 1);
  elementToBeRemoved.remove();

  updateActiveTaskHeading();
  persistTasks();
}

// finishing a task 
const handleChangeInStatus = (e) => {
  const elementToBeShifted = e.target.closest(".task")

  if (!elementToBeShifted) return;
  const taskId = elementToBeShifted.dataset.id;
  const taskPos = listOfTasks.map((task) => task.id).indexOf(+taskId);
  listOfTasks[taskPos].completed = !listOfTasks[taskPos].completed;
  elementToBeShifted.remove();

  updateActiveTaskHeading();
  persistTasks();
}

const handleAddFormSubmit = (e) => {
  e.preventDefault();
  const taskTitleInput = document.querySelector("#task-title-input");
  const taskTitle = taskTitleInput.value;
  taskTitleInput.value = "";
  const newTask = { id: idCount, title: taskTitle, date: new Date(), completed: false }
  idCount++;
  listOfTasks.push(newTask);
  console.log(listOfTasks);
  selectTab(false);

  updateActiveTaskHeading();
  persistTasks();
}


const persistTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(listOfTasks));
  localStorage.setItem("id-count", JSON.stringify(idCount));
}

// // Event Listeners
navComplete.addEventListener("click", (e) => selectTab(true));
navIncomplete.addEventListener("click", (e) => selectTab(false));
addTaskForm.addEventListener("submit", handleAddFormSubmit)

// setting "x Active Tasks"
const updateActiveTaskHeading = () => {
  numberOfActiveEl.textContent = `${listOfTasks.filter((task) => task.completed === false).length} active tasks`
}

// initialization
const init = function () {

  // retrieving from local storage
  const storageTasks = localStorage.getItem("tasks");
  if (storageTasks) listOfTasks = JSON.parse(storageTasks);

  const storageID = localStorage.getItem("id-count");
  if (storageID) idCount = JSON.parse(storageID);

  // setting data
  dateEl.textContent = (new Intl.DateTimeFormat(navigator.loacation, dateOptions).format(new Date()));
  selectTab(false);
  updateActiveTaskHeading();

};

init();


