let todoList = [];

document.getElementById('addBtn').addEventListener('click', function() {
    const input = document.getElementById('todoInput').value.trim();
    if (input !== '') {
        const todoItem = {
            task: input,
            timestamp: new Date(),
            completed: false
        };
        todoList.push(todoItem);
        displayTodoList();
        document.getElementById('todoInput').value = '';
    }
});

function displayTodoList() {
    const listContainer = document.getElementById('todoList');
    listContainer.innerHTML = '';
    todoList.forEach(function(item, index) {
        const li = document.createElement('li');
        li.textContent = item.task + ' (' + item.timestamp.toLocaleString() + ')';
        if (item.completed) {
            li.classList.add('completed');
        }
        li.addEventListener('click', function() {
            toggleCompletion(index);
        });
        listContainer.appendChild(li);
    });
}

function toggleCompletion(index) {
    todoList[index].completed = !todoList[index].completed;
    displayTodoList();
}

document.getElementById('fastestTaskBtn').addEventListener('click', function() {
    const fastestTask = getFastestTask();
    if (fastestTask !== null) {
        alert('La tarea más rápida fue: ' + fastestTask.task);
    } else {
        alert('No hay tareas completadas para calcular la más rápida.');
    }
});

function getFastestTask() {
    const completedTasks = todoList.filter(item => item.completed);
    if (completedTasks.length === 0) {
        return null;
    }
    completedTasks.sort((a, b) => a.timestamp - b.timestamp);
    return completedTasks[0];
}

document.getElementById('clearCompletedBtn').addEventListener('click', function() {
    todoList = todoList.filter(item => !item.completed);
    displayTodoList();
});
