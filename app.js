var taskInput=document.getElementById("new-task");
var addButton=document.querySelector(".add-item-btn");
var todoList=document.getElementById("todo-list");
var completedTasksHolder=document.getElementById("completed-tasks");

var createNewTaskElement=function(taskString){
  var listItem=document.createElement("li");
  listItem.className = "list todo-list-item";
  var checkBox=document.createElement("input");
  var label=document.createElement("label");
  var editInput=document.createElement("input");
  var editButton=document.createElement("button");
  var deleteButton=document.createElement("button");
  var deleteButtonImg=document.createElement("img");

  label.innerText=taskString;
  label.className="task";

  checkBox.type="checkbox";
  editInput.type="text";
  editInput.className="task";

  editButton.innerText="Edit";
  editButton.className="button edit";

  deleteButton.className="delete";
  deleteButtonImg.src="./remove.svg";
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
var addTask=function(){
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);
  todoList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value="";
}
var editTask=function(){
  var listItem=this.parentNode;
  var editInput=listItem.querySelector(".input-txt");
  var label=listItem.querySelector(".task-label");
  var editBtn=listItem.querySelector(".edit");
  var containsClass=listItem.classList.contains("edit-mode");
  if(containsClass){
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }
  listItem.classList.toggle("edit-mode");
};
var deleteTask=function(){
  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  ul.removeChild(listItem);
}
var taskCompleted=function(){
  var listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}
var taskIncomplete=function(){
  var listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}
var ajaxRequest=function(){
  console.log("AJAX Request");
}

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  var checkBox=taskListItem.querySelector(".input-checkbox");
  var editButton=taskListItem.querySelector(".edit");
  var deleteButton=taskListItem.querySelector(".delete");
  editButton.onclick=editTask;
  deleteButton.onclick=deleteTask;
  checkBox.onchange=checkBoxEventHandler;
}
for (var i=0; i<todoList.children.length;i++){
  bindTaskEvents(todoList.children[i],taskCompleted);
}
for (var i=0; i<completedTasksHolder.children.length;i++){
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}