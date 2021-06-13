// Define variables for the UI
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Loading all event listeners
loadEventListeners();

function loadEventListeners() {
	// DOM load event
	document.addEventListener('DOMContentLoaded', getTasks);
	// Event for adding task 
	form.addEventListener('submit', addTask);
	// Event for removing tasks
	taskList.addEventListener('click', removeTask);
	// Event for clearing all the tasks
	clearBtn.addEventListener('click', clearTasks);
	//Event for filtering/searching tasks
	filter.addEventListener('keyup', filterTasks);

}

function getTasks() {
	let tasks;
	if(localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function(task) {
		// Create task list
		const li = document.createElement('li');
		li.className = 'collection-item';
		li.appendChild(document.createTextNode(task));
		// Create new link
		const link = document.createElement('a');
		link.className = 'delete-item secondary-content';
		link.innerHTML = `<i class="fas fa-trash"></i>`;
		li.appendChild(link);
		taskList.appendChild(li);
	})
}

function addTask(e) {
	if(taskInput.value === '') {
		alert('Please add a task!!!');
		return;
	}
	// Create task list
	const li = document.createElement('li');
	li.className = 'collection-item';
	li.appendChild(document.createTextNode(taskInput.value));
	// Create new link
  const link = document.createElement('a');
	link.className = 'delete-item secondary-content';
	link.innerHTML = `<i class="fas fa-trash"></i>`;
	li.appendChild(link);
	taskList.appendChild(li);

	// Store in local storage
	useLocalStorage(taskInput.value);

	//Clear input
	taskInput.value = "";
	e.preventDefault();
}

// Storing the tasks in local storage
function useLocalStorage(task) {
	let tasks;
	if(localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove tasks
function removeTask(e){
	if(e.target.parentElement.classList.contains('delete-item')) {
		let itemToDel = e.target.parentElement.parentElement;
		itemToDel.remove();
		// Remove task from Local storage
		removeFromLocalStorage(itemToDel);
		console.log(itemToDel.textContent)
	}

}

// Remove from Local storage 
function removeFromLocalStorage(itemToDel) {
	let tasks;
	if(localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
		}
	tasks.forEach(function(task, index) {
		if(itemToDel.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e){
	// taskList.innerHTML = '';
	while(taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
	localStorage.clear();
}

//Filter tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();
	document.querySelectorAll('.collection-item').forEach(function(task){
		const item = task.firstChild.textContent;
		if(item.toLowerCase().indexOf(text) !== -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}
