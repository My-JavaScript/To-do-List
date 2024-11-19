//Get reference to the HTML elements we need to interact with
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskBtn');
const taskList = document.getElementById('tasklist');

// Load tasks from localStorage when the page loads
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//Function to render all tasks in the list
function renderTasks() {
    // Clear the existing task list
    taskList.innerHTML = '';

    // Loop through each task and create an HTML element for it
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        // If the task is completed
        if (task.completed) {
            li.classList.add('completed');
        }

        // Add event listener to mark the task as completed when clicked
        li.addEventListener('click', () => {
            toggleCompleteTask(index);
        });

        // Create a delete button for the task
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add = 'delete';

        // Add event listener to delete the task when the delete button is clicked
        deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent marking as complete when deleting
        deleteTask(index);
        });

        // Add the delete button to the task element (li)
        li.appendChild(deleteBtn);

        // Add the task element to the task list
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim(); // Get the input value and trim whitespace

    // Check if input is not empty
    if (taskText !== '') {
        // Add the new task object to the task array
        tasks.push({ text: taskText, completed: false});

        // Save tasks to localStorage
        saveTasks();

        // Clear the input field 
        taskInput.value = '';

        // Re-render the tasks to include the new one
        renderTasks();
    }
}

// Function to mark/unmark a task as completed
function toggleCompleteTask(index) {
    // Toggle the completed property of the task
    tasks[index].completed = !tasks[index].completed;

    // Save the updated tasks to localStorage
    saveTasks();

    // Re-render the tasks to update the UI
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    // Remove the task from the array based on its index
    tasks.splice(index, 1);

    // Save the updated task to localStorage
    saveTasks();

    // Re-render the tasks to reflect the deletion
    renderTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Converts tasks array to JSON and save
}

// Add event listener to the 'Add Task' button
addTaskBtn.addEventListener('cliick', addTask);

// Render the tasks when the page loads
renderTasks();
