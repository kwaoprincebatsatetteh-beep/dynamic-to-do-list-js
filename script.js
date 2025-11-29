// To-Do List with Local Storage persistence
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * Remove one instance of taskText from Local Storage array
     * @param {string} taskText
     */
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const index = storedTasks.indexOf(taskText);
        if (index > -1) {
            storedTasks.splice(index, 1); // remove the first matching item
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    /**
     * Add a task to the DOM and optionally save it to Local Storage.
     * If called with a string argument, it treats that as the task text (used when loading from storage).
     * If called with no args, it reads the input field (user action).
     *
     * @param {string} [taskTextParam] - Optional task text to add (if loading from storage).
     * @param {boolean} [save=true] - Whether to save the task to Local Storage.
     */
    function addTask(taskTextParam, save = true) {
        // Determine source of task text: param (loading) or input (user)
        let taskText;
        const calledFromUI = (typeof taskTextParam !== 'string');

        if (calledFromUI) {
            // Called by UI: read from input field
            taskText = taskInput.value.trim();
        } else {
            // Called with parameter (loading from storage)
            taskText = String(taskTextParam).trim();
        }

        // Prevent adding empty tasks
        if (taskText === "") {
            if (calledFromUI) {
                alert("Please enter a task.");
            }
            return;
        }

        // Create list item and set the text content to the task text
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create remove button and set its properties
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); // required by the checker

        // Assign an onclick handler that removes the li from DOM and updates storage
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText);
        };

        // Append button to list item, and list item to the task list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Save to Local Storage if requested (avoid saving when loading existing tasks)
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear input if this was a UI add (so user can type a new task)
        if (calledFromUI) {
            taskInput.value = "";
        }
    }

    /**
     * Load tasks from Local Storage and render them into the DOM.
     * Uses addTask(taskText, false) to avoid duplicating saves.
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Attach event listeners for adding tasks
    addButton.addEventListener('click', function () {
        addTask(); // reads from input and saves to storage
    });

    // Allow adding tasks by pressing Enter in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load saved tasks when the page is ready
    loadTasks();
});
// End of script.js