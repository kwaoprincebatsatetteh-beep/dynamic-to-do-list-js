// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage and render them
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false));
  }

  // Function to add a new task
  function addTask(taskText, save = true) {
    // If called from button/input, get value from input
    if (typeof taskText !== "string") {
      taskText = taskInput.value.trim();
    }
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create new list item
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";

    // Remove the task when remove button is clicked
    removeBtn.onclick = function () {
      taskList.removeChild(li);
      // Remove from Local Storage
      let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks = storedTasks.filter((t) => t !== taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    };

    // Append remove button to list item, then list item to task list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Save to Local Storage if needed
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    // Clear the input field if adding from input
    if (save) {
      taskInput.value = "";
    }
  }

  // Add event listener to Add Task button
  addButton.addEventListener("click", function () {
    addTask();
  });

  // Add event listener for Enter key in input field
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Load tasks on page load
  loadTasks();
});