/*here creating a methods for 
insert a task
edit/update a task
delete a task
get all tasks from every columns
*/

//creating a defualt class called "kanban"
export default class kanban {

  static getTasks(columnId) {

    const data = read().find(col => {
      return col.columnId == columnId;
    });

    //if my tasks are empty then show empty col
    if (!data) {
      return [];
    }

    return data.tasks;

  }

  static insertTask(columnId, content) {

    const data = read();
    const column = data.find(column => {
      return column.columnId == columnId;
    });

    //if incase columns doesn't exist see the error
    if (!column) {
      throw new Error(`${column} column doesn't exists`);
    }
    //creating a task object
    const task = {
      taskId: Math.floor(Math.random() * 100000),
      content: content
    };

    column.tasks.push(task);
    console.log(data);

    save(data);
    return task;
  }

  static updateTask(taskId, updateInformation) {
    const data = read();


    function findColumnTask() {
      //select the column by for loop
      for (const column of data) {
        const task = column.tasks.find(item => {
          return item.taskId == taskId;
        });

        if (task) {
          return [task, column];
        }
      }
    }

    const [task, currentColumn] = findColumnTask();

    const targetColumn = data.find(column => {
      return column.columnId == updateInformation.columnId;
    });

    //updated information
    task.content = updateInformation.content;
    currentColumn.tasks.splice(currentColumn.tasks.indexOf(task), 1);
    targetColumn.tasks.push(task);

    save(data);
  }

  static deleteTask(taskId) {
    const data = read();

    for (const column of data) {
      const task = column.tasks.find(item => {
        return item.taskId == taskId;
      });

      if (task) {
        column.tasks.splice(column.tasks.indexOf(task), 1);
      }
    }
    save(data);
  }



  static getAllTasks() {
    const data = read();
    columnCount();
    return [data[0].tasks, data[1].tasks, data[2].tasks];
  }

}


//To read all the information in "LocalStorage" 
function read() {
  const data = localStorage.getItem("data");

  if (!data) {
    return [
      { columnId: 0, tasks: [] },
      { columnId: 1, tasks: [] },
      { columnId: 2, tasks: [] }
    ];
  }
  return JSON.parse(data);
}


// To save the data in the localstorage
function save(data) {
  localStorage.setItem("data", JSON.stringify(data));
  columnCount();
}


function columnCount() {
  const data = read();

  const todo = document.querySelector("span.todo");
  todo.textContent = data[0].tasks.length;

  const pending = document.querySelector("span.pending");
  pending.textContent = data[1].tasks.length;

  const completed = document.querySelector("span.completed");
  completed.textContent = data[2].tasks.length;

}

/**
 * 1. Access to all the data
 * 2. select the individual column and try to find the "task"
 */