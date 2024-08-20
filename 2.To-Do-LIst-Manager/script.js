/**
 * 1. Add the  new "lists"
 * 2. Delete the lists
 * 3. Update the list count
 * 4. To remove all the list by clicking "clear" button
 * 5. Iterating individual "li" tags for their textContent and matching them by "Main Search"
 */
const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");  
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span");  
const searchForm = document.querySelector(".search");


addForm.addEventListener("submit", event => {

  event.preventDefault();
   
  const value = addForm.task.value.trim();   

  /*--Add--*/
  if (value.length) {  
    tasks.innerHTML += ` 
            <li>
              <span>${value}</span>
              <i class="bi bi-trash-fill delete"></i>
            </li> `;
    addForm.reset();

    
    updateMessage();
  }
});

/*--Delete-- */
tasks.addEventListener("click", event => {

  if (event.target.classList.contains("delete")) {  

    event.target.parentElement.remove();
     
    updateMessage();
  }
});

 
 
clearAll.addEventListener("click", event => {

  const taskItems = tasks.querySelectorAll("li");  

  taskItems.forEach(item => {  

    item.remove();
  });
 
  updateMessage();
});

/**--Update the Message.--- */
 
function updateMessage() {

  const textLength = tasks.children.length;  
  messageSpan.textContent = `You have ${textLength} pending tasks.`;

}
updateMessage();

 
searchForm.addEventListener("keyup", event => {
 
  const term = searchForm.task.value.trim().toLowerCase();  
  filterTask(term);  
});



function filterTask(term) {

  Array.from(tasks.children).filter(task => {

    return !task.textContent.toLowerCase().includes(term);  
  
  }).forEach(element => {
    element.classList.add("hide");
  });
 
 
  Array.from(tasks.children)
    .filter(task => {
      return task.textContent.toLowerCase().includes(term);  
    })
    .forEach(element => {
      element.classList.remove("hide");  
    });

}

 


/**--remove logo functionality--- */
searchForm.addEventListener("click", event => {

  if (event.target.classList.contains("reset")) {
    searchForm.reset();

    const term = searchForm.task.value.trim();
    filterTask(term);

  }
})