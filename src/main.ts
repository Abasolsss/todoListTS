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
let tests: string;
if (inputValue) {
  addTaskBtn?.addEventListener("click", () => {
    const divsArray: HTMLDivElement[] = [];
    const spansArray: HTMLSpanElement[] = [];

    for (let i = 0; i < 6; i++) {
      const divs = document.createElement("div");
      divsArray.push(divs);
    }

    for (let i = 0; i < 2; i++) {
      const spans = document.createElement("span");
      spansArray.push(spans);
    }

    const taskDiv: HTMLDivElement | null = divsArray[0];
    taskDiv.classList.add("task");

    const taskDetails: HTMLDivElement | null = divsArray[1];
    taskDetails.classList.add("taskDetails");

    const taskName: HTMLDivElement | null = divsArray[2];
    taskName.classList.add("taskName");

    //task text
    let taskValue = document.createElement("h5");
    tests = taskValue.textContent = inputValue.value;

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
    taskHandler?.appendChild(taskDiv);
    taskDetails.appendChild(taskDateDiv);

    // taskArray.push(store!);
    // console.log(taskArray);
    modalBody?.classList.remove("modalBodyShow");
    inputValue.value = "";
  });
}

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
  editBtn.addEventListener("click", (event: Event) => {
    editModal?.classList.add("editTaskModalShow");

    const test = event.target as HTMLElement;

    const value = test.parentElement?.parentElement?.childNodes[0].childNodes[0]
      .childNodes[0].textContent as string;

    if (editTasks) {
      editTasks.value = value;
    }
  });

  saveEdit?.addEventListener("click", () => {
    // let taskValue = document.createElement("h5");
    // tests = taskValue.textContent = inputValue.value;
    // const newValue = document.createElement("h5")
    // newValue.textContent =
    if (editTasks) {
      const newValue: string | number = editTasks.value;
      const newHeader: HTMLElement = document.createElement("h5");
      newHeader.textContent = newValue;

      const newTaskDiv: HTMLDivElement | null = document.createElement("div");
      newTaskDiv.classList.add("taskName");
      newTaskDiv.appendChild(newHeader);

      editModal?.classList.remove("editTaskModalShow");

      console.log("hello", newTaskDiv);
    }
  });

  cancelEdit?.addEventListener("click", () => {
    editModal?.classList.remove("editTaskModalShow");
  });
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
