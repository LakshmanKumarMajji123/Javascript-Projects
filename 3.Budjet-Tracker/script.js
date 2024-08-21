const form = document.querySelector(".add");
const incomeList = document.querySelector("ul.income-list");
const expenseList = document.querySelector("ul.expense-list");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

//create an empty "list"
let transactions = localStorage.getItem("transactions") !== null ?
  JSON.parse(localStorage.getItem("transactions")) : [];


//Update
function updateStatistics() {

  const updatedIncome = transactions
    .filter(transaction => transaction.amount > 0)
    .reduce((total, transaction) => total += transaction.amount, 0);


  const updatedExpense = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((total, transaction) => total += Math.abs(transaction.amount), 0);


  //balance Updation is.... income - expense
  updatedBalance = updatedIncome - updatedExpense;
  balance.textContent = updatedBalance;

  //updated it..income, expense
  income.textContent = updatedIncome;
  expense.textContent = updatedExpense;

}
updateStatistics();


function genarateTemplate(id, source, amount, time) {
  return `<li data-id="${id}">
                        <p>
                          <span>${source}</span>
                          <span id="time">${time}</span>
                        </p>
                          $<span>${Math.abs(amount)}</span> 
                          <i class="bi bi-trash delete"></i>
            </li> `;
}

function addTransactionDOM(id, source, amount, time) {

  if (amount > 0) {

    incomeList.innerHTML += genarateTemplate(id, source, amount, time);

  } else {
    expenseList.innerHTML += genarateTemplate(id, source, amount, time);
  }

}

/**-----Add-------- */
function addTransactions(source, amount) {
  const time = new Date();

  const transaction = {
    id: Math.floor(Math.random() * 100000),
    source: source,
    amount: amount,
    time: `${time.toLocaleTimeString()} ${time.toLocaleDateString()}`
  };


  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  addTransactionDOM(transaction.id, source, amount, transaction.time);
}

///when user submit the "form"
form.addEventListener("submit", event => {
  event.preventDefault();

  if (form.source.value.trim() === "" || form.amount.value === "") {
    return alert("Please add Proper Values!");
  }

  addTransactions(form.source.value.trim(), Number(form.amount.value));
  updateStatistics();
  form.reset();
});

/**----get---*/
function getTransaction() {

  transactions.forEach(transaction => {

    if (transaction.amount > 0) {

      incomeList.innerHTML += genarateTemplate(transaction.id, transaction.source, transaction.amount, transaction.time);
    } else {
      expenseList.innerHTML += genarateTemplate(transaction.id, transaction.source, transaction.amount, transaction.time);
    }
  })
}
getTransaction();


/**-----Delete---*/
function deleteTransaction(id) {

  transactions = transactions.filter(transaction => {
    console.log(transaction.id, id);
    return transaction.id !== id;
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));

}

incomeList.addEventListener("click", event => {

  if (event.target.classList.contains("delete")) {
    // console.log(event.target);
    event.target.parentElement.remove();
    deleteTransaction(Number(event.target.parentElement.dataset.id));

    updateStatistics();
  }
});

expenseList.addEventListener("click", event => {

  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
    deleteTransaction(Number(event.target.parentElement.dataset.id));
    updateStatistics();
  }
});


