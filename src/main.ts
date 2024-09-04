const modalBtn = document.querySelector(".addTask");

const modalBody: HTMLDivElement | null = document.querySelector(".modalBody");

const closeButton: HTMLButtonElement | null =
  document.querySelector(".closeButton");

const inputValue: HTMLInputElement | null = document.querySelector(".textTask");

const addTaskBtn: HTMLButtonElement | null = document.querySelector(".newTask");

const taskHandler: HTMLDivElement | null =
  document.querySelector(".taskHandler");

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

    const taskValue = document.createElement("h5");
    taskValue.textContent = inputValue.value;

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

    modalBody?.classList.remove("modalBodyShow");
    inputValue.value = "";
  });
}

// const interval = setInterval(() => {
//   const test: HTMLSpanElement | null = document.getElementById("editTask");

//   if (test) {
//     test?.addEventListener("click", () => {
//       console.log("Hello world");
//     });
//     clearInterval(interval);
//   }
// }, 100);

// const editBtn: HTMLSpanElement | null = document.getElementById("editTask");

modalBtn?.addEventListener("click", () => {
  modalBody?.classList.add("modalBodyShow");
});

closeButton?.addEventListener("click", () => {
  modalBody?.classList.remove("modalBodyShow");
});
