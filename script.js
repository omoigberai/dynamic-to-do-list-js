// Run the script after the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Select key elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim(); // remove spaces

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Remove the task when the button is clicked
        removeButton.onclick = function() {
            taskList.removeChild(li);
        };

        // Add button to the list item
        li.appendChild(removeButton);

        // Add list item to the task list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';
    }

    // Add task when the button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});