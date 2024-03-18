const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const todoInput = document.querySelector("#todo-form input");
const TODOS_KEY = "todos"

const savedTodos = localStorage.getItem(TODOS_KEY);

let todos = []; // not const; so that updatable!


function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    li.remove();

    // remove from the list db
    todos = todos.filter((todo) => todo.id !== parseInt(li.id));
    saveTodos(); // refresh the list db

}

function paintTodo(newTodoObj) {
    const li = document.createElement("li");
    li.id = newTodoObj.id;

    const span = document.createElement("span");
    const button = document.createElement("button");

    li.appendChild(span);
    li.appendChild(button);
    span.innerText = newTodoObj.text; // get text only from obj
    todoList.appendChild(li);

    button.innerText = "🔚";
    button.addEventListener("click", deleteTodo);
}

function handleTodoSubmit(event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = null;

    const newTodoObj = { // so that newTodo have ID
        text: newTodo,
        id: Date.now()
    }

    // push is happening here; change here to add more value to save
    todos.push(newTodoObj);

    paintTodo(newTodoObj);
    saveTodos();
}

todoForm.addEventListener("submit", handleTodoSubmit);

if (savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;

    // JSON.parse.forEach gives an each todo item argument to paintTodo
    parsedTodos.forEach(paintTodo);
}
