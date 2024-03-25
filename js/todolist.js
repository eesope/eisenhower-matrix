const todoForm = document.querySelectorAll(".todo-form");
const todoLists = document.querySelectorAll(".todo-list");
const todoInput = document.querySelectorAll(".todo-form input");

const DOS = "do-section"
const SCHEDULES = "schedule-section"
const DELEGATES = "delegate-section"
const DELETES = "delete-section"

const savedDos = localStorage.getItem(DOS);
const savedSchedules = localStorage.getItem(SCHEDULES);
const savedDelegates = localStorage.getItem(DELEGATES);
const savedDeletes = localStorage.getItem(DELETES);

// not const; so that updatable!
let dos = [];
let schedules = [];
let delegates = [];
let deletes = [];

if (savedDos !== null) {
    const parsedDos = JSON.parse(savedDos);
    dos = parsedDos.dos; // access the property from parsedDos
    const sectionDiv = document.querySelector("#do-section")
    parsedDos.dos.forEach(todo => paintTodo(todo, sectionDiv));

} else if (savedSchedules !== null) {
    const parsedSchedules = JSON.parse(savedSchedules);
    dos = parsedSchedules.schedules;
    const sectionDiv = document.querySelector("#schedule-section") // should fix this part to send div itself
    console.log("window", sectionDiv)
    parsedSchedules.schedules.forEach(todo => paintTodo(todo, sectionDiv));

} else if (savedDelegates !== null) {
    const parsedDelegates = JSON.parse(savedDelegates);
    dos = parsedDelegates.delegates;
    const sectionDiv = document.querySelector("#delegate-section")
    parsedDelegates.delegates.forEach(todo => paintTodo(todo, sectionDiv));

} else if (savedDeletes !== null) {
    const parsedDeletes = JSON.parse(savedDeletes);
    dos = parsedDeletes.deletes;
    const sectionDiv = document.querySelector("#delete-section")
    parsedDeletes.deletes.forEach(todo => paintTodo(todo, sectionDiv));
}

todoForm.forEach(form => {
    form.addEventListener("submit", handleSubmit)
});

function handleSubmit(event) { // event coming from form submit
    event.preventDefault(); // order matters

    const form = event.target; // from which div 
    const input = form.querySelector("input"); // get the specific input
    const newTodo = input.value;
    const sectionId = form.parentElement.id;

    const sectionDiv = form.parentElement;
    let updatedArray;

    const newTodoObj = { // so that newTodo have ID
        text: newTodo,
        id: Date.now()
    }

    // push is happening here; change here to add more value to save
    if (sectionId === DOS) {
        dos.push(newTodoObj);
        updatedArray = dos;
    } else if (sectionId === SCHEDULES) {
        schedules.push(newTodoObj);
        updatedArray = schedules;
    } else if (sectionId === DELEGATES) {
        delegates.push(newTodoObj);
        updatedArray = delegates;
    } else if (sectionId === DELETES) {
        deletes.push(newTodoObj);
        updatedArray = deletes;
    }

    console.dir("submit > form", form)
    console.log("submit > sectionDiv", sectionDiv)

    paintTodo(newTodoObj, sectionDiv);
    saveTodos(sectionId, updatedArray);
    input.value = null;
}

function paintTodo(newTodoObj, sectionDiv) {
    const ul = sectionDiv.querySelector("ul");

    const li = document.createElement("li");
    li.id = newTodoObj.id;

    const span = document.createElement("span");
    const button = document.createElement("button");

    li.appendChild(span);
    li.appendChild(button);
    span.innerText = newTodoObj.text; // get text only from obj

    console.log("paint > sectionDiv", sectionDiv)
    ul.appendChild(li);

    button.innerText = "❎";
    button.addEventListener("click", deleteTodo);
}

function saveTodos(sectionId, updatedArray) {
    if (sectionId === DOS) {
        localStorage.setItem(DOS, JSON.stringify({
            dos: updatedArray,
        }));
    } else if (sectionId === SCHEDULES) {
        localStorage.setItem(SCHEDULES, JSON.stringify({
            schedules: updatedArray,

        }));
    } else if (sectionId === DELEGATES) {
        localStorage.setItem(DELEGATES, JSON.stringify({
            delegates: updatedArray,
        }));
    } else if (sectionId === DELETES) {
        localStorage.setItem(DELETES, JSON.stringify({
            deletes: updatedArray
        }));
    }
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    const ul = li.parentElement;
    const todoId = li.id;

    ul.removeChild(li);
    // li.remove();

    // determine which section should be updated
    let todosArray;
    const sectionId = ul.parentElement.id;

    console.log("delete > li", li)
    console.log("delete > sectionId", sectionId)

    if (sectionId === DOS) {
        todosArray = dos;
    } else if (sectionId === SCHEDULES) {
        todosArray = schedules;
    } else if (sectionId === DELEGATES) {
        todosArray = delegates;
    } else if (sectionId === DELETES) {
        todosArray = deletes;
    }

    console.log("delete > before filter", todosArray)

    todosArray = todosArray.filter((todo) => todo.id !== parseInt(todoId));

    console.log("delete > after filter", todosArray)

    saveTodos(sectionId, todosArray); // refresh the list db & distinguish which section to be updated
}
