// button to add task
const newTask: HTMLElement | null = document.querySelector(".newTask");

const addTask: HTMLElement | null = document.querySelector(".addTaskDiv");

//handler of each divs


//main handler of the task divs
const taskHandler: HTMLElement | null = document.querySelector(".taskHandler");

// utility buttons
// to pop up a modal to create a task

//observation for the new task

newTask?.addEventListener("click", () => {
  addTask?.classList.add("addTaskShow");
  addTask?.classList.remove("addTaskHide");
  if (addTask) {
    addTask.innerHTML = `
    <h1 class="newTaskHeader">Add new task</h1>
     <input type="text" name="" required id="" class="taskMaker">
     <div class="divButtons">
        <button type="submit" class="addTask">Add new task</button>
     <button class="addTaskCancel">Cancel</button>
     </div>
 `;
  }
});
let taskNumber: number = 0;
let headerArrays: string[] = [];

// mutation observer for adding new task

const mutationNewTask = new MutationObserver((mutations) => {
  // console.log("mutations for new task", mutations)

  const addTaskBtn = mutations[0].addedNodes[5] as HTMLButtonElement;

  const addTaskInput = mutations[0].addedNodes[3] as HTMLInputElement;

  const addNewTaskBtn = addTaskBtn.childNodes[1] as HTMLButtonElement;
  //add task button

  const cancelTaskBtn = addTaskBtn.childNodes[3] as HTMLButtonElement;

  cancelTaskBtn?.addEventListener("click", () => {
    addTask?.classList.remove("addTaskShow");
    if (addTask) {
      addTask.innerHTML = ``;
    }
  });

  addNewTaskBtn?.addEventListener("click", () => {
  //get the month,date,hour
   const taskNewDate:Date = new Date()
   const taskMonth:number = taskNewDate.getMonth() + 1
   const taskDate:number = taskNewDate.getDate()
   const taskYear:number = taskNewDate.getFullYear()
   const militaryTime: number = taskNewDate.getHours()
   const civilianTime:number = militaryTime % 12
   const timeFormat: string = militaryTime <= 12 || militaryTime === 0 ? "AM" : "PM"
   const taskMinutes: number = taskNewDate.getMinutes()
  
    const taskCreated:string = `${civilianTime}:${taskMinutes} ${timeFormat}, ${taskMonth}/${taskDate}/${taskYear}`

    taskNumber++;
    console.log(taskNumber, "added task")
    const testss = document.querySelector(".taskMaker") as HTMLInputElement;

    if (testss?.value === "") {
      alert("Please input some shit");
      addTask?.classList.remove("addTaskShow");
      if (addTask) {
        addTask.innerHTML = ``;
      }
    } else {
      taskHandler?.classList.add("paddingAdd");
      const divArray: HTMLDivElement[] = [];
      const spanArray: HTMLSpanElement[] = [];
      const headerArray: HTMLElement[] = [];

      for (let i = 0; i < 3; i++) {
        const div = document.createElement("div") as HTMLDivElement;
        const span = document.createElement("span") as HTMLSpanElement;
        const header = document.createElement("h5") as HTMLElement;

        divArray.push(div);
        spanArray.push(span);
        headerArray.push(header);
      }

      const taskDetailsDiv: HTMLDivElement | null = divArray[0];
      taskDetailsDiv.classList.add("taskDetails");

      const taskActionsDiv: HTMLDivElement | null = divArray[1];
      taskActionsDiv.classList.add("taskActions");

      const taskShowerDiv: HTMLDivElement | null = divArray[2];
      taskShowerDiv.classList.add("taskShower");
      taskShowerDiv.setAttribute("id", `taskNumber${taskNumber}`);

      const taskName: HTMLElement | null = headerArray[0];
      taskName.classList.add(`taskNumber${taskNumber}`);
      taskName.textContent = addTaskInput.value; //value
      const headerClass: string = taskName.classList[0];

      headerArrays.push(headerClass);

      const taskDate: HTMLElement | null = headerArray[1];
      taskDate.textContent = `Task created at ${taskCreated}`

      const deleteSpan: HTMLSpanElement | null = spanArray[0];
      deleteSpan.classList.add("material-symbols-outlined");
      deleteSpan.textContent = "delete";

      const editSpan: HTMLSpanElement | null = spanArray[1];
      editSpan.classList.add("material-symbols-outlined");
      editSpan.textContent = "edit";
      taskDetailsDiv.appendChild(taskName);
      taskDetailsDiv.appendChild(taskDate);
      taskActionsDiv.appendChild(deleteSpan);
      taskActionsDiv.appendChild(editSpan);
      taskShowerDiv.appendChild(taskDetailsDiv);
      taskShowerDiv.append(taskActionsDiv);
      taskHandler?.appendChild(taskShowerDiv);

      addTask?.classList.remove("addTaskShow");
      addTask?.classList.add("addTaskHide");
    }
  });
});
mutationNewTask.observe(addTask!, {
  childList: true,
  subtree: true,
});

//mutation for taskHandler and buttons

const mutationTaskHandler = new MutationObserver((mutations) => {
  const editTask: HTMLDivElement | null = document.querySelector(".editTask");
  const testss = mutations[0].addedNodes[0] as HTMLDivElement;

  const divId = testss.attributes[1].value as string;
  const taskActionsDivs: NodeListOf<ChildNode> =
    mutations[0].addedNodes[0].childNodes;
  console.log(divId);
  const editButtonChildNode = taskActionsDivs[1].childNodes[1];
  const deleteButtonChildNode = taskActionsDivs[1]
    .childNodes[0] as HTMLSpanElement;
  const taskNode = mutations[0].addedNodes[0].childNodes[0].childNodes[0];

  const taskEl: HTMLElement = taskNode as HTMLElement;
  const taskClass: string = taskEl.classList[0];

  deleteButtonChildNode.addEventListener("click", () => {
    taskNumber--
    if(taskNumber === 0) {
      taskHandler?.classList.remove("paddingAdd")
    } 
    headerArrays.forEach((e) => {
      const divEl = document.getElementById(`${e}`);
      const divElString = divEl?.attributes[1].value as string;
      if (divId === divElString) {
        divEl?.remove();
      }
    });
  });
  //for edit modal
  if (editButtonChildNode instanceof HTMLSpanElement) {
    const editButton: HTMLSpanElement = editButtonChildNode;
    editButton.addEventListener("click", () => {
      editTask?.classList.remove("editTask");
      editTask?.classList.add("editShow");
      // console.log(taskClass);
      headerArrays.forEach((e) => {
        const oldValue = document.body.querySelector(`.${e}`);
        console.log(oldValue?.classList[0]);
        if (taskClass == oldValue?.classList[0]) {
          const taskValue: string | null = oldValue.textContent;
          if (editTask) {
            editTask.innerHTML = `
           
                        <div class="container">
                          <h1>Edit Task</h1>
                          <input type="text" value="${taskValue}" id="wtf">
                          <button class="saveEdit">Save</button>
                          <button class="cancelEdit">Cancel</button>
                        </div>
                        `;

            const saveEdit: HTMLButtonElement | null =
              document.querySelector(".saveEdit");

            const cancelButton: HTMLButtonElement | null =
              document.querySelector(".cancelEdit");

            saveEdit?.addEventListener("click", () => {
              const testsss = document.getElementById("wtf");
              if (testsss instanceof HTMLInputElement) {
                const newInput: HTMLInputElement = testsss;
                oldValue.textContent = newInput.value;
                editTask?.classList.add("editTask");
                editTask?.classList.remove("editShow");
              } else {
                console.log(false);
              }
            });
            cancelButton?.addEventListener("click", () => {
              editTask?.classList.add("editTask");
              editTask?.classList.remove("editShow");
            });
          }
        } else {
          console.log(false);
        }
      });
    });
  } else {
    console.error(false);
  }
});

mutationTaskHandler.observe(taskHandler!, {
  childList: true,
  subtree: true,
});
