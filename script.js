const form = document.querySelector("form");
const taskInput = document.querySelector(".name");
const addButton = document.querySelector("button");
const tasks = document.querySelector(".tasks");

//After getting each input, save to localstorage.
//Then render each task from the localstorage.
//Each task will come with a checkbox and a delete button.
//After deleting the task, the list of tasks should be reset again to localstorage.

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function showTasks(nameOfTask){
    //CREATING ELEMENTS.
    const listItem = document.createElement("li");
    const todoDiv = document.createElement("div");
    const taskDiv = document.createElement("div");
    const taskName = document.createElement("div");
    const checkBoxDiv = document.createElement("div");
    const checkBox = document.createElement("input");
    const deleteButton = document.createElement("button");

    //ADDING CONTENT TO THE ELEMENTS

    deleteButton.innerText = "Delete task"

    checkBox.setAttribute("type", "checkbox");

    deleteButton.addEventListener("click", () => {
        let filteredTasks = todos.filter(item => {
            return item !== taskName.innerText;
        });
        todos = filteredTasks;
        localStorage.setItem("todos", JSON.stringify(todos));
        tasks.innerText = "";
        todos.map(todo => {
            return showTasks(todo);
        });
    });

    //APPENDING ELEMENTS TO THEIR PARENTS.
    checkBoxDiv.appendChild(checkBox);
    taskDiv.appendChild(taskName);

    taskName.innerText = nameOfTask;

    todoDiv.appendChild(taskDiv);
    todoDiv.appendChild(checkBoxDiv);
    todoDiv.appendChild(deleteButton);

    listItem.appendChild(todoDiv);

    //ADDING OF CSS CLASSES.
    todoDiv.classList.add("todo");
    taskDiv.classList.add("task");
    
    if(todos.length > 0){
        tasks.appendChild(listItem);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    todos.push(taskInput.value);
    localStorage.setItem("todos", JSON.stringify(todos));
    showTasks(taskInput.value);
    taskInput.value = "";
});

todos.map(todo => {
    return showTasks(todo);
});