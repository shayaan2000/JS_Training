"use strict";

// Selecting elements
const navIncomplete = document.querySelector("#nav-incomplete");
const navComplete = document.querySelector("#nav-complete");
const taskListContainer= document.querySelector("#task-list")
const dateEl= document.querySelector(".date");
const numberOfActiveEl= document.querySelector(".num-active");
const addTaskForm= document.querySelector(".add-task-form");
const mainContainer= document.querySelector(".main-container");
let deleteIcons= document.querySelectorAll(".task-delete");
let finishIcons= document.querySelectorAll(".task-finish");
let revertIcons= document.querySelectorAll(".task-revert");

// Date settings
const dateOptions = {
  day: "numeric",
  month: "long",
  weekday: "long", //or long or narrow
};

// Data
let listOfCompleteTasks = []//[{title: "Hello 1", date:"today", completed: true}, {title: "Hello 2", date:"today", completed: true},{title: "Hello 3", date:"today", completed: true},];
let listOfIncompleteTasks = []//[{title: "Hello 1", date:"today", completed: false}, {title: "Hello 2", date:"today", completed: false},{title: "Hello 3", date:"today", completed: false},]

// Creates the HTML for a given task
const generateTaskMarkup= function(task, id){
  console.log(id);
  const completed= task.completed;
  return `
  <li class="task" data-id="${id}">
    <div class="task-container">
      <p class="task-title"><i class="icon-${completed ? "refresh" : "check"} icon-large task-${completed ? "revert" : "finish"}"></i>
        <span class="${completed ? "complete" : "incomplete"}">${task.title}</span>
      </p>
      <i class="icon-trash icon-large task-delete"></i>
    </div>
    <div class=divider></div>
  </li>
`
}

// handler for showing incomplete tasks
const displayIncompleteTasks=()=>{
  navComplete.classList.remove("active")
  navIncomplete.classList.add("active")

  // rendering
  taskListContainer.innerHTML='';
  const taskListHTML = listOfIncompleteTasks.map((incompleteTask, i)=> generateTaskMarkup(incompleteTask, i)).join('');
  taskListContainer.innerHTML= taskListHTML

  attachEventListeners();
} 

// handler for showing complete tasks
const displayCompleteTasks=()=>{
  navIncomplete.classList.remove("active");
  navComplete.classList.add("active");

  // rendering
  taskListContainer.innerHTML='';
  const taskListHTML = listOfCompleteTasks.map((completeTask, i)=> generateTaskMarkup(completeTask, i)).join('');
  taskListContainer.innerHTML= taskListHTML

  attachEventListeners();
} 

// deleting a task
const handleDelete= (e)=>{
  const elementToBeRemoved= e.target.closest(".task");
  
  if (!elementToBeRemoved) return;
  const isCompleted= elementToBeRemoved.querySelector(".complete");
  isCompleted ? listOfCompleteTasks.splice(elementToBeRemoved.dataset.id, 1) : listOfIncompleteTasks.splice(elementToBeRemoved.dataset.id, 1)
  elementToBeRemoved.remove();

  updateActiveTaskHeading();

  persistTasks();
}

// finishing a task 
const handleFinish =(e)=>{
  const elementToBeShifted = e.target.closest(".task")

  if(!elementToBeShifted) return;
  const [task]= listOfIncompleteTasks.splice(elementToBeShifted.dataset.id, 1)
  task.completed=true;
  listOfCompleteTasks.push(task)
  elementToBeShifted.remove(); //dom removal

  updateActiveTaskHeading();

  persistTasks();
}

// reverting a task to incomplete
const handleRevert = (e)=>{
  const elementToBeShifted = e.target.closest(".task")
  if(!elementToBeShifted) return;
  const [task]= listOfCompleteTasks.splice(elementToBeShifted.dataset.id, 1)
  task.completed=false;
  listOfIncompleteTasks.push(task)
  elementToBeShifted.remove(); //dom removal

  updateActiveTaskHeading();

  persistTasks();
}

// adding a task
const handleAddFormSubmit= (e)=>{
  e.preventDefault();
  const taskTitleInput=document.querySelector("#task-title-input");
  const taskTitle= taskTitleInput.value;
  taskTitleInput.value=""; 
  const newTask= {title: taskTitle, date: new Date(), completed:false}
  listOfIncompleteTasks.push(newTask);

  displayIncompleteTasks();
  updateActiveTaskHeading();
  persistTasks();
}

// setting "3 Active Tasks"
const updateActiveTaskHeading = ()=>{
  numberOfActiveEl.textContent=`${listOfIncompleteTasks.length} active tasks`
}

// attach event listeners on new elements
const attachEventListeners = function()
{
  deleteIcons= document.getElementsByClassName("task-delete");
  for(const icon of deleteIcons){
    icon.addEventListener("click", handleDelete)
  }

  finishIcons= document.getElementsByClassName("task-finish");
  for(const icon of finishIcons){
    icon.addEventListener("click", handleFinish)
  }

  revertIcons= document.getElementsByClassName("task-revert");
  for(const icon of revertIcons){
    icon.addEventListener("click", handleRevert)
  }

}

// local storage
const persistTasks= ()=> {
  localStorage.setItem("tasks-complete", JSON.stringify(listOfCompleteTasks));
  localStorage.setItem("tasks-incomplete", JSON.stringify(listOfIncompleteTasks));
}

// Event Listeners
navIncomplete.addEventListener("click", displayIncompleteTasks);
navComplete.addEventListener("click", displayCompleteTasks);
addTaskForm.addEventListener("submit", handleAddFormSubmit)




// initialization
const init = function () {
  
  // retrieving from local storage
  const storageTasksComplete = localStorage.getItem("tasks-complete");
  if (storageTasksComplete) listOfCompleteTasks = JSON.parse(storageTasksComplete);
  
  const storageTasksIncomplete = localStorage.getItem("tasks-incomplete");
  if (storageTasksIncomplete) listOfIncompleteTasks = JSON.parse(storageTasksIncomplete);

  // setting date
  dateEl.textContent = (new Intl.DateTimeFormat(navigator.loacation, dateOptions).format(new Date()));
  
  // display initial tasks
  displayIncompleteTasks();
};

init();
