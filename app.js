
//To retrieve data from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const storedList = JSON.parse(localStorage.getItem('tasks'));

  if(storedList){
    storedList.forEach((task)=>tasks.push(task));
    updateTaskList();
    updateStats();
  }

})

let tasks = [];    //array to store the list of tasks

//to store data locally
const saveList = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


//function to add a task
const addTask = () => {
    const taskInput = document.getElementById('taskInput');             //take input from the input field
    const text =  taskInput.value.trim();

    if(text){
      tasks.push({text:text, completed: false});

      updateTaskList();
      updateStats();
      saveList();
      taskInput.value = '';
    }
};

//function to toggle a task complete 
const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateStats();
  saveList();
};


//function to delete a task
const deleteTask =(index)=> {
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveList();
  if(editingIndex === index){
    editingIndex = -1; //reset editingIndex if the task being edited is deleted
  }
};


//function to edit the task
const editTask =(index)=> {
  const taskInput = document.getElementById('taskInput');
  taskInput.value =  tasks[index].text;
  //take input from the input field

  tasks.splice(index,1);
  updateTaskList();
  updateStats();
  saveList();
};

//function to update the stats field
const updateStats = () => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = (completedTasks/totalTasks) *100;
  const progressBar = document.getElementById('progress')
  progressBar.style.width = `${progress}%`;

  document.getElementById("numbers").innerText = `${completedTasks}/${totalTasks}`
};

//function to update the tasks list
const updateTaskList = () => {
  const taskList = document.querySelector('.task-list');              //get the list of tasks
  taskList.innerHTML = "";                                            //clear the list of tasks
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');                    //create a new list item
    listItem.innerHTML = `
    <div class= "taskItem">
              <div class= "task ${task.completed ? "completed":""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked":""}/>
                <p>${task.text} </p>
              </div>
              <div class="icons">
                <img src="img/edit.png" onClick = "editTask(${index})"/>
                <img src="img/bin.png" onClick = "deleteTask(${index})"/>
              </div>
    </div>          
    `;
    listItem.addEventListener('change', ()=>toggleTaskComplete(index))
    taskList.appendChild(listItem);                                   //add the list item to the list of tasks
  });                                                                 //iterate through the list of tasks
}

document.getElementById('newTask').addEventListener('click', function(e){
  e.preventDefault();
  addTask();
});