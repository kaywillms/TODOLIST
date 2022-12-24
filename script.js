const addTask = document.querySelector("#new-task-form")
const inputs = document.querySelector("#new-task-input")
const submit = document.querySelector("#new-task-submit")
const tasks = document.querySelector("#tasks")
const placeholder = document.querySelector("#new-task-input::placeholder")
const trash = document.querySelector("#trash")
const popups = document.querySelector("#popup-container")

/*Testing blow to see if the function works.

function addingTask(text) {
    const newTask = document.createElement('div')

    newTask.innerText = text
    newTask.classList.add('task')

    if(text === ""){
        newTask.classList.remove('task')
    }
return newTask
    
};


addTask.addEventListener("submit", e =>{
    e.preventDefault()
    
    
    const add = addingTask(input.value)
    tasks.append(add)
    
*/


addTask.addEventListener("submit", e =>{
    e.preventDefault()

    const add = inputs.value
    //This will add the class task
    const newTask = document.createElement('div')
    newTask.classList.add('task')
    //This will add the class content and append it to the last div you created
    const content = document.createElement('div')
    content.classList.add('content')
    newTask.appendChild(content)
//This will add the input and all its inner workings like type and value etc...
    const input = document.createElement('input')
    input.classList.add('text')
    input.type = 'text'
    input.value = add
    input.setAttribute('readonly', 'readonly')
//You will now append input to the content div you just created
    content.appendChild(input)
//We created the actions Div here
    const taskActions = document.createElement('div')
    taskActions.classList.add('actions')


//Blow are the Edit and Delete buttons where we are appending to the acction div we created.
    const taskEdit = document.createElement('button')
    taskEdit.classList.add('edit')
    taskEdit.innerText = 'Edit'

    const taskDelete = document.createElement('button')
    taskDelete.classList.add('delete')
    taskDelete.innerText = 'Delete'

    taskActions.appendChild(taskEdit)
    taskActions.appendChild(taskDelete)

    newTask.appendChild(taskActions)

    tasks.appendChild(newTask)




// This is to unappend the task div so that after hitting the Addtask button there is nothing added.
    if(inputs.value === ''){
        tasks.removeChild(newTask)
        inputs.placeholder = 'Please enter a task here!'    
        placeholder.style.color = "red"
    }

    taskEdit.addEventListener('click', (e) => {
        e.preventDefault()
        if (taskEdit.innerText.toLowerCase() === "edit") {
            taskEdit.innerText = "Save"
            taskEdit.getAttribute("readonly")
            taskEdit.removeAttribute("readonly")
            taskEdit.focus();
        } else {
            taskEdit.innerText = "Edit"
            taskEdit.setAttribute("readonly", "readonly")
        }
    });
    
//New Event for Deleting and adding to Trash***********************
        taskDelete.addEventListener("click", (e) =>{
                e.preventDefault()
        //We unappend the entire task div again this time to give the Delete button functionality.

        tasks.removeChild(newTask)
        
        //We now add it the trash
        trash.appendChild(newTask)
        taskActions.removeChild(taskEdit)
        taskActions.removeChild(taskDelete)

        
        const restore = document.createElement('button')
        restore.classList.add('restore')
        localStorage.setItem('onDeletedPage', restore.innerText)
        restore.innerText = 'Restore'
        taskActions.appendChild(restore)
        
        

//Restoring for the last time
            restore.addEventListener('click',(e) =>{
                e.preventDefault()
                tasks.appendChild(newTask)
                taskActions.removeChild(restore)
                const task_edit = document.createElement('button')
                task_edit.classList.add('edit')
                task_edit.innerText = 'Edit'

                const task_delete = document.createElement('button')
                task_delete.classList.add('delete')
                task_delete.innerText = 'Delete'

                taskActions.appendChild(task_edit)
                taskActions.appendChild(task_delete)

                task_delete.addEventListener("click", (e) =>{
                    e.preventDefault()
                    //We unappend the entire task div again this time to give the Delete button functionality.

                     
                    
                    const newPop = document.createElement('div')
                    newPop.classList.add('popup')
                    popups.appendChild(newPop)

                    const five = document.createElement('p')
                    five.classList.add('hiFive')
                    five.innerText = 'If you click to continue, your task will be permanently deleted. Are you sure you want to continue?'
                    newPop.appendChild(five)


                    const cancel = document.createElement('button')
                    cancel.classList.add('cancel')
                    cancel.classList.add('btn')
                    cancel.innerText = 'Cancel'
                    newPop.appendChild(cancel)

                    const contin = document.createElement('button')
                    contin.classList.add('continue')
                    cancel.classList.add('btn')
                    contin.innerText = 'Continue'
                    newPop.appendChild(contin)

                    cancel.addEventListener('click', (e)=>{
                        e.preventDefault()
                        newPop.removeChild(cancel)
                        popups.removeChild(newPop)
                        newPop.removeChild(five)
                        newPop.removeChild(contin)
                    })

                    contin.addEventListener('click', (e)=>{
                        e.preventDefault()
                        tasks.removeChild(newTask)
                        newPop.removeChild(cancel)
                        popups.removeChild(newPop)
                        newPop.removeChild(five)
                        newPop.removeChild(contin)
                    })
                })

            })
    })
    const tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
tasksArray.push({
  input: input.value,
});
localStorage.setItem("tasks", JSON.stringify(tasksArray));
  
})

