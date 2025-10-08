/* To-Do List with Local Storage
   - Adds tasks
   - Removes tasks
   - Persists tasks in localStorage
   - Supports "Enter" key to add tasks
*/

document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks array from localStorage (or start with empty array)
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Save tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Render the tasks array to the DOM
    function renderTasks() {
        // Clear existing list
        taskList.innerHTML = '';

        // For each task, create li and remove button
        tasks.forEach((taskText, index) => {
            const li = document.createElement('li');

            // create a span so text and button layout nicely
            const span = document.createElement('span');
            span.textContent = taskText;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-btn';

            // When clicked, remove this task from tasks array and re-render
            removeBtn.addEventListener('click', () => {
                tasks.splice(index, 1); // remove the specific item
                saveTasks();
                renderTasks();
            });

            li.appendChild(span);
            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }

    // Add a task; if save === true, persist to localStorage (default true)
    function addTask(taskText = null, save = true) {
        // If taskText not provided, read from input
        const text = taskText !== null ? String(taskText).trim() : taskInput.value.trim();

        if (text === '') {
            alert('Please enter a task');
            return;
        }

        // Add to tasks array
        tasks.push(text);

        // Save and re-render
        if (save) {
            saveTasks();
        }
        renderTasks();

        // Clear input field after adding
        taskInput.value = '';
        taskInput.focus();
    }

    // Load tasks on page load (render them)
    function loadTasks() {
        // tasks already read from localStorage at top; just render
        renderTasks();
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask()); // click button to add
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize app by loading tasks
    loadTasks();
});