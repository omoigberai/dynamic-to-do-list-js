document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // ==============================
    // LOAD TASKS FROM LOCAL STORAGE
    // ==============================
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don’t save again
    }

    // ==============================
    // ADD TASK FUNCTION
    // ==============================
    function addTask(taskText, save = true) {
        // If taskText wasn’t passed, get it from the input field
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        // Create <li> element for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create “Remove” button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // When clicked, remove this task
        removeButton.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskText);
        };

        // Append button and task to list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';

        // ==============================
        // SAVE TO LOCAL STORAGE
        // ==============================
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // ==============================
    // REMOVE FROM LOCAL STORAGE
    // ==============================
    function removeTaskFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // ==============================
    // ATTACH EVENT LISTENERS
    // ==============================
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // ==============================
    // INITIAL LOAD
    // ==============================
    loadTasks();
});