/*
references
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing = null for string

*/

const modalBtn = document.querySelector(".addTask");

const modalBody: HTMLDivElement | null = document.querySelector(".modalBody");

const closeButton: HTMLButtonElement | null =
  document.querySelector(".closeButton");

const inputValue: HTMLInputElement | null = document.querySelector(".textTask");

const addTaskBtn: HTMLButtonElement | null = document.querySelector(".newTask");

let taskHandler: HTMLDivElement | null = document.querySelector(".taskHandler");

// let taskArray: HTMLDivElement[] = [];

//create task

// let inc: number = 0;
// let arrNumber: number[] = []
let taskArr: HTMLDivElement[] = [];
const taskFunction = () => {
  if (inputValue) {
    addTaskBtn?.addEventListener("click", () => {
      const divsArray: HTMLDivElement[] = [];
      const spansArray: HTMLSpanElement[] = [];
      

      // inc++
      // for (let i = 0; i < inc; i++) {
      //   arrNumber.push(i)
      // }

      // arrNumber.forEach(element => {
      //   console.log("this is from foreacH",element)
      // });

      // console.log("This is increment", inc)
      for (let i = 0; i < 6; i++) {
        const divs = document.createElement("div");
        divsArray.push(divs);
      }

      for (let i = 0; i < 2; i++) {
        const spans = document.createElement("span");
        spansArray.push(spans);
      }
    
      //div for the task
      const taskDiv: HTMLDivElement | null = divsArray[0];
      taskDiv.classList.add("task");

      const taskDetails: HTMLDivElement | null = divsArray[1];
      taskDetails.classList.add("taskDetails");

      const taskName: HTMLDivElement | null = divsArray[2];
      taskName.classList.add("taskName");

      //task text
      let taskValue = document.createElement("h5");
      taskValue.textContent = inputValue.value;

      // arr.push(taskValue, taskDetails, taskName, taskDiv);

      const taskActions: HTMLDivElement = divsArray[3];
      taskActions.classList.add("taskActions");

      const spanDelete: HTMLSpanElement = spansArray[0];
      spanDelete.classList.add("material-symbols-outlined");
      spanDelete.setAttribute("id", "deleteTask");
      spanDelete.textContent = "delete";

      const spanEdit: HTMLSpanElement = spansArray[1];
      spanEdit.classList.add("material-symbols-outlined");
      spanEdit.setAttribute("id", "editTask");
      spanEdit.textContent = "edit";

      const taskDate: Date = new Date();
      const taskMins: number = taskDate.getMinutes();
      const newTaskMins: number | string = `${
        taskMins < 10 ? "0" : ""
      }${taskMins}`;
      let taskHourMilitary: number = taskDate.getHours();
      const taskMonth: number = taskDate.getMonth() + 1;
      const taskDates: number = taskDate.getDate();
      const taskYear: number = taskDate.getFullYear();

      //convert to civilian hour
      let taskCivilianHour: number = taskHourMilitary % 12;

      // how to determine if its AM or PM
      // >= 13 pm
      // <= 12 am
      // <= 12 AM : PM

      console.log(taskHourMilitary);
      console.log(taskCivilianHour);

      const test: number =
        taskCivilianHour == 12 || taskHourMilitary == 0 ? 12 : taskCivilianHour;

      // to check am or pm
      const amPm: string =
        taskCivilianHour >= taskHourMilitary || taskHourMilitary == 0
          ? "AM"
          : "PM";

      const taskDateVal: HTMLElement = document.createElement("h5");

      taskDateVal.textContent = `Task Created on ${test}:${newTaskMins} ${amPm} ${taskMonth}/${taskDates}/${taskYear}`;

      const taskDateDiv: HTMLDivElement | null = divsArray[4];
      taskDateDiv.classList.add("taskDate");

      taskDateDiv.appendChild(taskDateVal);
      taskActions.appendChild(spanDelete);
      taskActions.appendChild(spanEdit);

      taskDiv.appendChild(taskDetails);

      taskDiv.appendChild(taskDetails);
      taskDiv.appendChild(taskActions);
      taskDetails.appendChild(taskName);
      taskName.appendChild(taskValue);
      
      taskDetails.appendChild(taskDateDiv);
      // taskArray.push(store!);
      // console.log(taskArray);
      // taskArr.push(taskDiv)
      // taskArr.forEach((e) => {
        
      //   console.log(e)
      // })
      taskHandler?.appendChild(taskDiv);
      modalBody?.classList.remove("modalBodyShow");
      inputValue.value = "";
      // console.log(taskArr)
    });
    
  }
  return taskArr;
};

taskFunction();

//observing the text value of the input

const observer = new MutationObserver((mutations) => {
  // Log the mutations to inspect their structure
  // console.log(mutations);

  // Check if the first mutation and its addedNodes exist
  if (mutations.length > 0 && mutations[0].addedNodes.length > 0) {
    // Safely access the first added node
    const firstAddedNode = mutations[0].addedNodes[0];

    // Check if firstAddedNode and its childNodes exist and have the expected structure
    if (firstAddedNode && firstAddedNode.childNodes.length > 1) {
      // Safely access the second child node
      const testNode = firstAddedNode.childNodes[1] as Node | null;

      // Log the testNode to ensure it’s correctly accessed
      // console.log(testNode);

      // Ensure that testNode is an HTMLDivElement before using it
      if (testNode instanceof HTMLDivElement) {
        // Now it's safe to use testNode as an HTMLDivElement
        actionFunction(testNode);
      } else {
        console.error("The node is not an HTMLDivElement:", testNode);
      }
    } else {
      console.error(
        "firstAddedNode or its childNodes are not structured as expected."
      );
    }
  } else {
    console.error("Mutations array is empty or no nodes were added.");
  }
});

const actionFunction = (test: HTMLDivElement) => {
  const actionBtns = test.childNodes;
  const deleteBtn = actionBtns[0];
  const editBtn = actionBtns[1];

  deleteBtn.addEventListener("click", (event: Event) => {
    const target = event.target as HTMLElement;
    const parent = target.parentElement?.parentElement;
    parent?.remove();
  });

  const editModal = document.querySelector<HTMLDivElement>(".handler");

  const cancelEdit = document.querySelector<HTMLButtonElement>(".cancelEdit");

  const saveEdit = document.querySelector<HTMLButtonElement>(".saveEdit");

  const editTasks: HTMLInputElement | null =
    document.querySelector(".editTasks");

  //edit task section
  let editArr: HTMLElement[] = [];

  editBtn.addEventListener("click", (event: Event) => {
  
    // const taskFunc: HTMLDivElement[] = taskFunction()

    const tests: HTMLDivElement | null = document.querySelector(".handler")
    tests?.classList.add("editTaskModalShow");
    console.log(event)
    if(tests) {
      tests.innerHTML = 
      `
      <div class="editTaskModal">
        <h1>Edit taskShower</h1>
        <input type="text" name="" id="" class="editTasks" />
        <!-- <input type="text" name="" id="" class="textTask" /> -->
        <button class="saveEdit">Save</button>
        <button class="cancelEdit">Cancel</button>
      </div>
      `
    }
  });

  const wtfFunc = () => {
    saveEdit?.addEventListener("click", (event: Event) => {
      const newValue = editTasks?.value as string;
      // const test = (editFunct.textContent = newValue);
      console.log(test);
      editModal?.classList.remove("editTaskModalShow");
    });

    // to cancel the edit window modal
    cancelEdit?.addEventListener("click", () => {
      editModal?.classList.remove("editTaskModalShow");

      
    });
  };
  wtfFunc();
};


observer.observe(taskHandler!, {
  childList: true,
  subtree: true,
});

modalBtn?.addEventListener("click", () => {
  modalBody?.classList.add("modalBodyShow");
});

closeButton?.addEventListener("click", () => {
  modalBody?.classList.remove("modalBodyShow");
});
