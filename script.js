document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        // Create a new li element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign an onclick event to remove the li element
        removeButton.onclick = function() {
            taskList.removeChild(li);
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);

        // Append the li element to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Add an event listener to the Add Task button
    addButton.addEventListener('click', addTask);

    // Add an event listener for pressing the Enter key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});