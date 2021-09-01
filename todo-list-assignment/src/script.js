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
let idCount = 0;

// Set predefined tabs, this approach will help in react
const tabs = [
  {
    id: 0,
    title: 'Complete Tasks',
  },
  {
    id: 1,
    title: 'Incomplete Tasks',
  }
]

// Creates the HTML for a given task
const generateTaskMarkup = ({ title, completed, id }) => (`
  <li class="task" data-id="${id}">
    <div class="task-container">
      <p class="task-title"><i class="icon-${completed ? "undo" : "check"} icon-large task-${completed ? "revert" : "finish"}"></i>
        <span class="${completed ? "complete" : "incomplete"}">${title}</span>
      </p>  
      <i class="icon-trash icon-large task-delete"></i>
    </div>  
    <div class="divider"></div>
  </li>  
`);

// Use a tab based approach incase you want to add more tabs down the line
const selectTab = (tab) => {
  [navComplete, navIncomplete].forEach((navItem) => navItem.classList.remove("active"));
  switch (tab.id) {
    case 0:
      renderIncompleteTasks();
      navIncomplete.classList.add("active")
      break;
    case 1:
      renderCompletedTasks();
      navComplete.classList.add("active")
      break;
  }
  attachEventListeners();
}

// seperate render functions for each tab ensure clarity
const renderCompletedTasks = () => {
  const taskListHTML = listOfTasks.filter(({ completed }) => completed).map(generateTaskMarkup).join("");
  taskListContainer.innerHTML = taskListHTML;
}

const renderIncompleteTasks = () => {
  const taskListHTML = listOfTasks.filter(({ completed }) => !completed).map(generateTaskMarkup).join("");
  taskListContainer.innerHTML = taskListHTML;
}

// attach event listeners on new elements
const attachEventListeners = () => {
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

  const taskId = elementToBeRemoved.dataset.id;
  const taskPos = listOfTasks.map(({ id }) => id).indexOf(+taskId);

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
  const taskPos = listOfTasks.map(({ id }) => id).indexOf(+taskId);
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
  selectTab(tabs[0]);
  persistTasks();
}


const persistTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(listOfTasks));
  localStorage.setItem("id-count", idCount);
}

// // Event Listeners
navIncomplete.addEventListener("click", (e) => selectTab(tabs[0]));
navComplete.addEventListener("click", (e) => selectTab(tabs[1]));
addTaskForm.addEventListener("submit", handleAddFormSubmit)

// setting "x Active Tasks"
const updateActiveTaskHeading = () => {
  const incompleteTasks = listOfTasks.filter(({ completed }) => !completed).length
  numberOfActiveEl.textContent = `${incompleteTasks} active tasks`
}

// initialization
const init = function () {

  // retrieving from local storage
  const storageTasks = localStorage.getItem("tasks");
  listOfTasks = storageTasks ? JSON.parse(storageTasks) : [];

  const storageID = localStorage.getItem("id-count");
  idCount = storageID ? JSON.parse(storageID) : 0;

  // setting data
  dateEl.textContent = (new Intl.DateTimeFormat(navigator.loacation, dateOptions).format(new Date()));
  selectTab(tabs[0]);
  updateActiveTaskHeading()
};

init();


