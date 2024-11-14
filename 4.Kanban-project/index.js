import kanban from "./kanban.js";

const todo = document.querySelector('.cards.todo');
const pending = document.querySelector('.cards.pending');
const completed = document.querySelector('.cards.completed');

const taskbox = [todo, pending, completed];

function addTaskCard(task, index) {
  //creating a form by "document.createElement("form")" instead of copying <form> </form> in html
  const element = document.createElement("form");
  //add className to the form
  element.className = "card";
  //adding new attribute called "draggble
  element.draggable = true;
  //adding taskId to form
  element.dataset.id = task.taskId;
  //adding innerHTML (template)
  element.innerHTML = `
   <input value="${task.content}" type="text" name="task" autocomplete="off" disabled="disabled">
                <div>
                  <span class="task-id">#${task.taskId}</span>
                  <span>
                    <button class="bi bi-pencil edit" data-id="${task.taskId}"></button>
                    <button class="bi bi-check-lg update hide" data-id="${task.taskId}" data-column="${index}"></button>
                    <button class="bi bi-trash3 delete" data-id="${task.taskId}"></button>
                  </span>
                </div>
  `;

  taskbox[index].appendChild(element);
}

kanban.getAllTasks().forEach((tasks, index) => {
  tasks.forEach(task => {

    addTaskCard(task, index);
  })
});

//Add the new form in the column "Add form"
const addForm = document.querySelectorAll(".add");
addForm.forEach(form => {
  form.addEventListener("submit", event => {

    event.preventDefault();

    if (form.task.value) {
      const task = kanban.insertTask(form.submit.dataset.id, form.task.value.trim());

      addTaskCard(task, form.submit.dataset.id);

      //after adding the card. reset the "Form"
      form.reset();
    }
  });
});


taskbox.forEach(column => {
  column.addEventListener("click", event => {
    event.preventDefault();

    const formInput = event.target.parentElement.parentElement.previousElementSibling;


    if (event.target.classList.contains("edit")) {

      formInput.removeAttribute("disabled");
      event.target.classList.add("hide");
      event.target.nextElementSibling.classList.remove("hide");
    }

    if (event.target.classList.contains("update")) {

      //event.target.parentElement.parentElement.previousElementSibling.setAttribute("disabled", "disabled");
      formInput.setAttribute("disabled", "disabled");
      event.target.classList.add("hide");
      event.target.previousElementSibling.classList.remove("hide");


      const taskId = event.target.dataset.id;
      const columnId = event.target.dataset.column;
      const content = formInput.value;

      console.log(taskId, columnId, content);

      kanban.updateTask(taskId, {
        columnId: columnId,
        content: content
      }); //bcz updateTask having "two param's tasId, UpdateInformation"

    }

    if (event.target.classList.contains("delete")) {
      const res = formInput.parentElement.remove();
      console.log(res);
      kanban.deleteTask(event.target.dataset.id);
    }


  });

  column.addEventListener("dragstart", event => {

    if (event.target.classList.contains("card")) {
      event.target.classList.add("dragging");
    }
  });


  column.addEventListener("dragover", event => {

    const card = document.querySelector(".dragging");
    column.appendChild(card);
  });



  column.addEventListener("dragend", event => {
    if (event.target.classList.contains("card")) {
      event.target.classList.remove("dragging");

      const taskId = event.target.dataset.id;
      const columnId = event.target.parentElement.dataset.id;
      const content = event.target.task.value;

      kanban.updateTask(taskId, {
        columnId: columnId,
        content: content
      });
    }
  });

});

