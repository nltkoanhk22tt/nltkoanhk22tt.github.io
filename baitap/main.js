const task = document.getElementById('task');
const List = document.getElementById('List');
const add = document.getElementById('addTask');

add.addEventListener('click', addTask);

function addTask() {
    const taskText = task.value;
    if (taskText) {
        const listItem = document.createElement('li');
        listItem.id = "lis"
    
        listItem.innerHTML = taskText + '<button class="btn" onclick="removeTask(this)">X</button>';
        List.appendChild(listItem);
        task.value = '';
    }
}

function removeTask(button) {
    const listItem = button.parentNode;
    List.removeChild(listItem);
}

