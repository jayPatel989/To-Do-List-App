// Select Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const taskList = document.getElementById("taskList");

// State
let tasks = [];

// Event Listeners
addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

clearAllBtn.addEventListener("click", function() {
    const confirmClear = confirm("Are you sure you want to delete all tasks?");

    if (confirmClear) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
});

// Functions
// Add Task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

// Save to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load from Local Storage
function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// Render Tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = task.text;

        li.addEventListener("click", function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";

        deleteBtn.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    // Disable Clear All if no tasks
    clearAllBtn.disabled = tasks.length === 0;
}

// Initialize App
loadTasks();
renderTasks();