// button to add task
const newTask:HTMLElement | null = document.querySelector(".newTask")

const addTask:HTMLElement | null = document.querySelector(".addTaskDiv")


//handler of each divs
// const taskShower: HTMLElement | null = document.querySelector(".taskShower")

//main handler of the task divs
const taskHandler: HTMLElement | null = document.querySelector(".taskHandler")


// utility buttons
// to pop up a modal to create a task
newTask?.addEventListener("click", () => {
    addTask?.classList.add("addTaskShow")
    addTask?.classList.remove("addTaskHide")
    if(addTask) {
        addTask.innerHTML = 
        `
           <h1>Add new task</h1>
            <input type="text" name="" id="" class="taskMaker" required>
            <button type="submit" class="addTask">Add new task</button>
            <button>Cancel</button>

        `
    }

    
})
let taskNumber:number = 0
let headerArrays: string[] = []

// mutation observer for adding new task

const mutationNewTask = new MutationObserver((mutations) => {
    // console.log("mutations for new task", mutations)
 
        const addTaskBtn = mutations[0].addedNodes[5] as HTMLButtonElement

        const addTaskInput = mutations[0].addedNodes[3] as HTMLInputElement
      
        //add task button
        addTaskBtn.addEventListener("click", () => {
         taskNumber++
    
        const divArray:HTMLDivElement[] = []
        const spanArray:HTMLSpanElement[] = []
        const headerArray: HTMLElement[] = []
        
        for (let i = 0; i < 3; i++) {
    
            const div = document.createElement("div") as HTMLDivElement
            const span = document.createElement("span") as HTMLSpanElement
            const header = document.createElement("h5") as HTMLElement
    
    
            divArray.push(div)
            spanArray.push(span)
            headerArray.push(header)
        }
    
        const taskDetailsDiv: HTMLDivElement | null = divArray[0]
        taskDetailsDiv.classList.add("taskDetails")
    
        const taskActionsDiv: HTMLDivElement | null = divArray[1]
        taskActionsDiv.classList.add("taskActions")
    
        const taskShowerDiv: HTMLDivElement | null = divArray[2]
        taskShowerDiv.classList.add("taskShower")
    
      
        const taskName: HTMLElement | null = headerArray[0]
        taskName.classList.add(`taskNumber${taskNumber}`) 
        taskName.textContent = addTaskInput.value //value
        const headerClass: string = taskName.classList[0]
        
        headerArrays.push(headerClass)
     
    
        const taskDate: HTMLElement | null = headerArray[1]
        taskDate.textContent = "Created on ALAS 5 WAA KA"
    
        const deleteSpan: HTMLSpanElement | null = spanArray[0]
        deleteSpan.classList.add("material-symbols-outlined")
        deleteSpan.textContent = "delete"
    
        const editSpan: HTMLSpanElement | null = spanArray[1]
        editSpan.classList.add("material-symbols-outlined")
        editSpan.textContent = "edit"
        taskDetailsDiv.appendChild(taskName)
        taskDetailsDiv.appendChild(taskDate)
        taskActionsDiv.appendChild(deleteSpan)
        taskActionsDiv.appendChild(editSpan)
        taskShowerDiv.appendChild(taskDetailsDiv)
        taskShowerDiv.append(taskActionsDiv)
        taskHandler?.appendChild(taskShowerDiv)
        
        addTask?.classList.remove("addTaskShow")
        addTask?.classList.add("addTaskHide")
 
        })
     
    }
)
mutationNewTask.observe(addTask!, {
    childList: true,
     subtree: true,
    })
 




//mutation for taskHandler and buttons

    const mutationTaskHandler = new MutationObserver((mutations) => {
        
        const editTask:HTMLDivElement | null = document.querySelector(".editTask")
    
        const taskActionsDivs:NodeListOf<ChildNode> = mutations[0].addedNodes[0].childNodes
    
        const editButtonChildNode = taskActionsDivs[1].childNodes[1];


        const taskNode = mutations[0].addedNodes[0].childNodes[0].childNodes[0]
        const taskEl:HTMLElement  = taskNode as HTMLElement
        const taskClass:string = taskEl.classList[0]
        

        //for edit modal
        if(editButtonChildNode instanceof HTMLSpanElement) {
        const editButton:HTMLSpanElement = editButtonChildNode
        
        editButton.addEventListener("click", () => {
            console.log(taskClass)
            headerArrays.forEach((e) => {
            const testss = document.body.querySelector(`.${e}`)
            // console.log(testss?.classList[0])
                if(taskClass == testss?.classList[0]) {
                    console.log(testss)
                } else {
                    console.log(false)
                }
            })
          if(editTask) {
            editTask.innerHTML = 
            `
          <h1>Edit Task</h1>
            <div class="container">
              <input type="text" value="">
              <button class="wtf">Save</button>
              <button>Cancel</button>
            </div>
            `
            document.querySelector(".wtf")?.addEventListener("click", () => {
                
            })
          }
        })
            
        } else {
            console.error(false)
        }
        
    })
    
mutationTaskHandler.observe(taskHandler!, {
    childList: true,
    subtree: true,
}) 




