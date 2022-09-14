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

    deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
  `;

    checkBox.setAttribute("type", "checkbox");

    deleteButton.addEventListener("click", () => {
        let filteredTasks = todos.filter((item, index) => {
            return item !== taskName.textContent;
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
    taskDiv.appendChild(checkBoxDiv);

    taskName.innerText = nameOfTask;

    todoDiv.appendChild(taskDiv);
    //todoDiv.appendChild(checkBoxDiv);
    todoDiv.appendChild(deleteButton);

    listItem.appendChild(todoDiv);

    //ADDING OF CSS CLASSES.
    todoDiv.classList.add("todo");
    taskDiv.classList.add("task");
    taskName.classList.add("task-name");
    deleteButton.classList.add("delete");
    
    if(todos.length > 0){
        tasks.appendChild(listItem);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if(taskInput.value){
        todos.push(taskInput.value);
        localStorage.setItem("todos", JSON.stringify(todos));
        showTasks(taskInput.value);
        taskInput.value = "";
    }
});

todos.map(todo => {
    return showTasks(todo);
});

