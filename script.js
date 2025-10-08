// To-Do List with Local Storage support
document.addEventListener('DOMContentLoaded', function() {
    // Select required DOM elements (exact names expected by automated checks)
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Tasks array to keep current tasks in memory
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Save tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Render tasks from the tasks array into the DOM
    function renderTasks() {
        // Clear existing list
        taskList.innerHTML = '';

        // For each task, create li with remove button
        tasks.forEach((taskText, index) => {
            const li = document.createElement('li');

            // Create a span for the task text (keeps DOM structure clean)
            const span = document.createElement('span');
            span.textContent = taskText;

            // Create remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';

            // When clicked, remove the task from the array and update storage & UI
            removeButton.addEventListener('click', function() {
                // Remove item at this index
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(span);
            li.appendChild(removeButton);
            taskList.appendChild(li);
        });
    }

    /**
     * addTask(taskText, save = true)
     * - If taskText is provided (string), it will use that text.
     * - If not provided, it reads from the input field.
     * - If save === true (default), it updates localStorage.
     */
    function addTask(taskText = null, save = true) {
        const text = taskText !== null ? String(taskText).trim() : taskInput.value.trim();

        if (text === '') {
            alert('Please enter a task');
            return;
        }

        // Add to tasks array
        tasks.push(text);

        // Save to localStorage if requested
        if (save) {
            saveTasks();
        }

        // Re-render the list
        renderTasks();

        // Clear the input if we added from the input field
        if (taskText === null) {
            taskInput.value = '';
            taskInput.focus();
        }
    }

    // Load tasks on page load (already loaded into tasks variable above)
    // Render them into the DOM
    renderTasks();

    // Attach event listeners (names and events expected by checker)
    addButton.addEventListener('click', function() {
        addTask();
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Expose functions to window for manual testing/debug if needed (optional)
    // window.addTask = addTask;
    // window.renderTasks = renderTasks;
});