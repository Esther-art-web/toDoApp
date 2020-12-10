(()=>{
    'use strict';
    class ToDoApp{
        constructor(){
            this.toDoApp= 'ToDoApp'
            this.localData = this.localStorage();

            this.taskTitle= document.getElementById('taskTitle');
            this.taskTitle.addEventListener('keyup', (e)=> {this.taskTitle.value= e.target.value; this.validateForm();});

            this.taskDescription= document.querySelector('#taskDescription');
            this.taskDescription.addEventListener('keyup', (e)=> {this.taskDescription.value= e.target.value; this.validateForm();});

            this.addTask = document.getElementById('addTask');
            this.addTask.setAttribute('disabled', 'disabled');
            this.addTask.addEventListener('click',(e)=> this.createTask(e));
    
            this.itemList = document.getElementsByClassName('item-list')[0];

            this.add= document.getElementsByClassName('add')[0];
            this.add.addEventListener('click', this.createTask);
           
            this.displayList();
        }
        localStorage=()=>{
            const data = localStorage.getItem(this.toDoApp);
            return data ? JSON.parse(data) : [];
        }
        saveData=()=>{
            localStorage.setItem(this.toDoApp, JSON.stringify(this.localData));
        }
        validateForm=()=>{
            if (this.taskTitle.value.length < 2 || this.taskDescription.value.length < 6){
                this.addTask.setAttribute('disabled', 'disabled');
            }
            else{
                this.addTask.removeAttribute('disabled');
            }
        }
        createTask=(event)=>{
            const task={
                completed: false,
                createdAt : new Date(),
                title: this.taskTitle.value,
                description: this.taskDescription.value
            }
            this.localData.splice(0,0,task);
            this.taskTitle.value= '';
            this.taskDescription.value='';
            this.validateForm();
            this.displayList();
            event.preventDefault();
        }
        handleAddTask=(task,index,arr)=>{
            var task= document.createElement('div');
            task.setAttribute('class', 'task');

            var taskContent= document.createElement('div');
            taskContent.setAttribute('class', 'task-content text');

            var title= document.createElement('p');
            title.setAttribute('id', 'title');
            title.setAttribute('class', 'title');
            title.innerHTML= arr[index].title;

            var description= document.createElement('p');
            description.setAttribute('id', 'description');
            description.setAttribute('class', 'description');
            description.innerHTML= arr[index].description;

            var deleteTask = document.createElement('img');
            deleteTask.setAttribute('src', './images/delete-icon.png');
            deleteTask.setAttribute('alt', '...');
            deleteTask.setAttribute('id', 'delete');
            deleteTask.setAttribute('class', 'task-content icon');
            deleteTask.setAttribute('title', 'delete')
            deleteTask.addEventListener('click', ()=>{
               if(confirm('Click Ok to delete this Task')){ 
               arr.splice(index, 1);
               this.displayList();
            }
            })

            // setting up the layout for pending task
            var pending= document.createElement('img');
            pending.setAttribute('src', './images/pending-icon.jpg');
            pending.setAttribute('alt', '...');
            pending.setAttribute('id', 'pending');
            pending.setAttribute('class', 'task-content icon');
            pending.setAttribute('title', 'pending')

            var check = document.createElement('img');
            check.setAttribute('src', './images/check-icon.png');
            check.setAttribute('alt', '...');
            check.setAttribute('id', 'check');
            check.setAttribute('class', 'task-content icon');
            check.setAttribute('title', 'check')
            check.addEventListener('click', ()=>{
                arr[index].completed= true;
                this.displayList();
            });
           
            // setting up layout for completed task
            var done= document.createElement('img');
           done.setAttribute('src', './images/done-icon.png');
           done.setAttribute('alt', '...');
           done.setAttribute('id', 'done');
           done.setAttribute('class', 'task-content icon');
           done.setAttribute('title', 'done');


            if (!arr[index].completed){
                task.appendChild(pending);
                taskContent.appendChild(title);
                taskContent.appendChild(description);
                task.appendChild(taskContent);
                task.appendChild(check);
                task.appendChild(deleteTask);
                this.itemList.appendChild(task);
            }else{
                task.appendChild(done);
                taskContent.appendChild(title);
                taskContent.appendChild(description);
                task.appendChild(taskContent);
                task.appendChild(deleteTask);
                this.itemList.appendChild(task);
            }

           
        }
        displayList=()=>{
            this.itemList.innerHTML='';
            this.emptyMssg= document.createElement('p');
            this.emptyMssg.setAttribute('class', 'empty');
            this.emptyMssg.innerHTML='You do not have any task, have fun ;)'
            this.saveData();
            this.localData.length? 
            this.localData.forEach(this.handleAddTask):
            this.itemList.appendChild(this.emptyMssg);
           
        }
    }
    new ToDoApp();
})();

