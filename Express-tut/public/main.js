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
        localStorage.setItem('myTasks', JSON.stringify(tasks))
        task.value = '';
    }
}

function removeTask(button) {
    const listItem = button.parentNode;
    listItem.style.textDecoration = 'line-through';
    button.disabled = true;
    List.removeChild(listItem);
}

let items = localStorage.getItem('myTasks');
    if(items !== null) {
    var tasks = JSON.parse(items)
    tasks.forEach(function(el){
    createNewElement(el.task);
    })
    } else {
    tasks = []
}   

button.onclick = function() {
    tasks = tasks.filter(e => e.task !== text)
    localStorage.setItem('myTasks', JSON.stringify (tasks))
    li.style.display = 'none';
}

