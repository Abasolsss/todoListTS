const modalBtn = document.querySelector(".addTask");

const modalBody: HTMLDivElement | null = document.querySelector(".modalBody");

const closeButton: HTMLButtonElement | null =
  document.querySelector(".closeButton");

const inputValue: HTMLInputElement | null = document.querySelector(".textTask");

const taskDiv: HTMLDivElement | null = document.querySelector(".task");

if (inputValue) {
  document.querySelector(".newTask")?.addEventListener("click", () => {
    const valueText: string = inputValue?.value;

    if (taskDiv) {
      taskDiv.innerHTML = valueText;
    } else {
      console.error("Division Elementt not found!!!");
    }
    modalBody?.classList.remove("modalBodyShow");
  });
}

modalBtn?.addEventListener("click", () => {
  modalBody?.classList.add("modalBodyShow");
});

closeButton?.addEventListener("click", () => {
  modalBody?.classList.remove("modalBodyShow");
});
