
class Task{

constructor(id,title,description,priority,category){
this.id=id
this.title=title
this.description=description
this.priority=priority
this.category=category
this.completed=false
}

toggleComplete(){
this.completed=!this.completed
}

}

class TaskManager{

constructor(){
this.tasks=[]
}

addTask(task){
this.tasks.push(task)
}

deleteTask(id){
this.tasks=this.tasks.filter(task=>task.id!=id)
}

getTask(id){
return this.tasks.find(task=>task.id==id)
}

updateTask(id,data){
let task=this.getTask(id)
task.title=data.title
task.description=data.description
task.priority=data.priority
task.category=data.category
}

filterCategory(category){
if(category==="All") return this.tasks
return this.tasks.filter(task=>task.category===category)
}

searchTasks(keyword){
return this.tasks.filter(task =>
task.title.toLowerCase().includes(keyword) ||
task.description.toLowerCase().includes(keyword)
)
}

}

const manager=new TaskManager()

const form=document.getElementById("taskForm")
const taskList=document.getElementById("taskList")
const notification=document.getElementById("notification")

function showNotification(msg){

notification.innerText=msg
notification.style.display="block"

setTimeout(()=>{
notification.style.display="none"
},4000)

}

function renderTasks(tasks=manager.tasks){

taskList.innerHTML=""

tasks.forEach(task=>{

const li=document.createElement("li")

li.className=`task ${task.priority.toLowerCase()} ${task.completed?"completed":""}`

li.innerHTML=`
<h3>${task.title}</h3>
<p>${task.description}</p>
<p>Priority: ${task.priority}</p>
<p>Category: ${task.category}</p>

<button onclick="completeTask(${task.id})">Complete</button>
<button onclick="editTask(${task.id})">Edit</button>
<button onclick="deleteTask(${task.id})">Delete</button>
`

taskList.appendChild(li)

})

}

form.addEventListener("submit",function(e){

e.preventDefault()

const id=document.getElementById("taskId").value
const title=document.getElementById("title").value
const description=document.getElementById("description").value
const priority=document.getElementById("priority").value
const category=document.getElementById("category").value

if(title===""){
alert("Title cannot be empty")
return
}

if(id===""){

const task=new Task(Date.now(),title,description,priority,category)
manager.addTask(task)

if(priority==="High"){
showNotification("High Priority Task Added!")
}

}else{

manager.updateTask(id,{title,description,priority,category})
showNotification("Task Updated")

}

form.reset()
renderTasks()

})

function deleteTask(id){
manager.deleteTask(id)
renderTasks()
}

function editTask(id){

const task=manager.getTask(id)

document.getElementById("taskId").value=task.id
document.getElementById("title").value=task.title
document.getElementById("description").value=task.description
document.getElementById("priority").value=task.priority
document.getElementById("category").value=task.category

}

function completeTask(id){

const task=manager.getTask(id)
task.toggleComplete()

if(task.priority==="High"){
showNotification("High Priority Task Completed")
}

renderTasks()

}

document.getElementById("search").addEventListener("input",function(){

const keyword=this.value.toLowerCase()
renderTasks(manager.searchTasks(keyword))

})

document.getElementById("filterCategory").addEventListener("change",function(){

renderTasks(manager.filterCategory(this.value))

})

document.getElementById("themeToggle").addEventListener("click",function(){

document.body.classList.toggle("dark")

})
