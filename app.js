const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".add-item-btn");
const todoList = document.getElementById("todo-list");
const completedTasksHolder = document.getElementById("completed-tasks");

function createNewTaskElement(taskString){
  const listItem = document.createElement("li");
  listItem.className = "list todo-list-item";
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = "task-label";

  checkBox.type = "checkbox";
  checkBox.className = "input input-checkbox";
  editInput.type = "text";
  editInput.className = "input input-txt";

  editButton.innerText = "Edit";
  editButton.className = "button edit";

  deleteButton.className = "button delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "delete-img";
  deleteButtonImg.alt = "Delete item button";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}
function addTask(){
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  todoList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value="";
}
function editTask(){
  const listItem = this.parentNode;
  const editInput = listItem.querySelector(".input-txt");
  const label = listItem.querySelector(".task-label");
  const editBtn = listItem.querySelector(".edit");
  let containsClass = listItem.classList.contains("edit-mode");
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("edit-mode");
};
function deleteTask(){
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}
function taskCompleted(){
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}
function taskIncomplete(){
  const listItem = this.parentNode;
  todoList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}
function ajaxRequest(){
  console.log("AJAX Request");
}

addButton.onclick=addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

function bindTaskEvents(taskListItem, checkBoxEventHandler){
  const checkBox = taskListItem.querySelector(".input-checkbox");
  const editButton = taskListItem.querySelector(".edit");
  const deleteButton = taskListItem.querySelector(".delete");
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}
for (let i = 0; i < todoList.children.length; i += 1){
  bindTaskEvents(todoList.children[i], taskCompleted);
}
for (let i = 0; i < completedTasksHolder.children.length; i += 1){
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}