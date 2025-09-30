const form = document.getElementById('form');
const newTodo = document.getElementById('todo-input');
const recentList = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();

form.addEventListener('submit', onSubmit);
function updateTodoList() {
    recentList.innerHTML  = "";

    allTodos.forEach((todo, index) => {
        const li = createTodoItem(todo, index);
        recentList.appendChild(li);
    });
}

function onSubmit (e) {
    e.preventDefault();
    const todoText = newTodo.value.trim();
    if (todoText === '') {
        newTodo.style.animation = 'none';  
        newTodo.offsetHeight;    
        newTodo.style.animation = null;  
        newTodo.classList.add('input-error');
    }
    else {
        const objTodos = {
                text : todoText,
                isCompleted : false
        }
        allTodos.push(objTodos);
        updateTodoList();
        saveTodos();
        newTodo.value = "";
    }
}

function createTodoItem(todo, index) {
    const todoText = todo.text;
    const todoIndex = "todo-" + index;
    const li = document.createElement('li');
    li.className = "todo" ;
    li.innerHTML = `<input type="checkbox" id=${todoIndex}>
    <label  class="custom-checkbox" for=${todoIndex}>
    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>               
    </label>
    <label for=${todoIndex} class="todo-text">  ${todoText}  </label>
    <button class="delete-button" data-index=${todoIndex}>
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
    </button>`; 

    const checkbox = li.querySelector('input[id=' + `${todoIndex}` + ']');
    checkbox.checked = todo.isCompleted;

    checkbox.addEventListener('change', () => {
        todo.isCompleted = checkbox.checked;
        saveTodos();
    });
    const button = li.querySelector('.delete-button');
    button.addEventListener('click', ()=>
    {
        allTodos = allTodos.filter((element, i) => i !== index);
        saveTodos();
        updateTodoList();
    });
    return li;
}

function saveTodos()
{
    const jsonThings =  JSON.stringify(allTodos)
    localStorage.setItem('todos', jsonThings);
}
function getTodos()
{
    const todos = localStorage.getItem('todos') || '[]';
    return JSON.parse(todos);
}