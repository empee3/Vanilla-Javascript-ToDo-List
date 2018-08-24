// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const submitBtn = document.querySelector('.submit-btn');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Disable Submit and Clear buttons when no task text has been entered
submitBtn.disabled = true;

// Load all event listeners
loadEventListeners();


/* --- FUNCTIONS --- */

// Load all event listeners
function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  taskInput.addEventListener('keyup', enableDisableSubmitBtn);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeItem);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}

// Enable or disable SUBMIT button when task is entered in field

function enableDisableSubmitBtn(e) {
  taskInput.value.length > 0 ? submitBtn.disabled = false : submitBtn.disabled = true;
}

// Get tasks from local storage

function getTasks() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
     // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
    }); 
} 

// Add Task
function addTask(e) {

  e.preventDefault();

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store task in local storage
  storeTask(taskInput.value);

  // Clear input
  taskInput.value = '';

  // Disable Submit button since field is now blank
  submitBtn.disabled = true;
}

// Store task in local storage

function storeTask(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear individual task
function removeItem(e) {
  // Grab "x" button element
  const xBtn = e.target.parentElement;

  // Remove list item
  if (xBtn.classList.contains('delete-item')) {
    xBtn.parentElement.remove();
  }

  // Remove from local storage
  removeFromStorage(xBtn.parentElement);
}

// Remove from local storage
function removeFromStorage(taskItem) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all tasks
function clearTasks() {
  // Grab all added tasks in task list and delete each
  taskList.querySelectorAll('.collection-item').forEach(function(task) {
    task.remove();
  });

  // Clear all from local storage
  clearTasksFromStorage();
}

// Clear all from local storage
function clearTasksFromStorage() {
  localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
  // Get text filter value as it is entered
  const text = e.target.value.toLowerCase();

  // Filter out tasks
  taskList.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    item.toLowerCase().indexOf(text) != -1 ? task.style.display = 'block' : task.style.display = 'none';
  });
}

