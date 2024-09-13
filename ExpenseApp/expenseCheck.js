const ul = document.querySelector("ul");
const body = document.querySelector("body");

// api = "http://localhost:3000/expense/add-expense";

axios
  .get("http://localhost:3000/expense/add-expense")
  .then((res) => {
    showExpenses(res.data.allExpense);
  })
  .catch((err) => {
    console.log(err);
  });

function addExpenses(event) {
  event.preventDefault();

  const newExpense = {
    amount: document.getElementById("spentAmount").value,
    description: document.getElementById("desc").value,
    category: document.getElementById("category").value,
  };

  axios
    .get("http://localhost:3000/expense/add-expense")
    .then((res) => {
      // showExpenses(res.data.allExpense);
      isAvailable = false;
      res.data.allExpense.forEach((temp) => {
        if (
          newExpense.amount == temp.amount &&
          newExpense.description == temp.descrp &&
          newExpense.category == temp.categry
        ) {
          isAvailable = true;
        }
      });
      if (isAvailable == false) {
        axios
          .post("http://localhost:3000/expense/add-expense", newExpense)
          .then((res) => {
            showExpenses(res.data.newExpense);
          });
      } else {
        const para = document.createElement("p");
        para.innerHTML = `Same Expense already entered`;
        body.appendChild(para);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // axios
  //   .post(api, newExpense)
  //   .then((res) => {
  //     showExpenses(res.data.newExpense);
  //   })
  // .catch((err) => {
  //   console.log(err);
  // });
}

function showExpenses(expense) {
  if (expense.length == 0) {
    const para = document.createElement("p");
    para.innerHTML = `No Expenses left`;
    body.appendChild(para);
  } else if (expense.length > 0) {
    expense.forEach((xpense) => {
      const newLi = document.createElement("li");
      newLi.id = xpense.id;
      newLi.className = "expenses";

      newLi.innerHTML = `${xpense.amount} - ${xpense.descrp} - ${xpense.categry} - `;

      const deleteBtn = document.createElement("button");
      const deleteBtnText = document.createTextNode("Delete");
      deleteBtn.appendChild(deleteBtnText);
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", function () {
        deleteDetails(xpense.id);
      });
      newLi.appendChild(deleteBtn);

      const editBtn = document.createElement("button");
      const editBtnText = document.createTextNode("Edit");
      editBtn.appendChild(editBtnText);
      editBtn.className = "edit-btn";
      editBtn.addEventListener("click", function () {
        editDetails(xpense.id);
      });
      newLi.appendChild(editBtn);

      ul.appendChild(newLi);
    });
  } else {
    const newLi = document.createElement("li");
    newLi.id = expense.id;
    newLi.className = "expenses";

    newLi.innerHTML = `${expense.amount} - ${expense.descrp} - ${expense.categry} - `;

    const deleteBtn = document.createElement("button");
    const deleteBtnText = document.createTextNode("Delete");
    deleteBtn.appendChild(deleteBtnText);
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function () {
      deleteDetails(expense.id);
    });
    newLi.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    const editBtnText = document.createTextNode("Edit");
    editBtn.appendChild(editBtnText);
    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", function () {
      editDetails(expense.id);
    });
    newLi.appendChild(editBtn);

    ul.appendChild(newLi);
  }
}

function deleteDetails(expenseToDelete) {
  axios
    .delete(`http://localhost:3000/expense/delete-expense/${expenseToDelete}`)
    .then((res) => {
      removeDispalyedExpense(expenseToDelete);
    })
    .catch((err) => {
      console.log(err);
    });
}

function editDetails(expenseToEdit) {
  const liNodeToBeEdited = document.getElementById(expenseToEdit);

  const liNodeToBeEditedText = liNodeToBeEdited.textContent.split(" - ");

  // amountInput.setAttribute("")
  // console.log("liNodeToBeEdited", liNodeToBeEdited);
  // console.log(
  //   "liNodeToBeEditedText",
  //   liNodeToBeEditedText[0]
  // );

  const amountInput = document.getElementById("spentAmount");
  amountInput.value = liNodeToBeEditedText[0];

  const descriptionINput = document.getElementById("desc");
  descriptionINput.value = liNodeToBeEditedText[1];

  const categoryInput = document.getElementById("category");
  categoryInput.value = liNodeToBeEditedText[2];

  // console.log("categoryInput.value", liNodeToBeEditedText[2]);
  // removeDispalyedExpense(expenseToEdit);

  deleteDetails(expenseToEdit);
}

function removeDispalyedExpense(removableExpense) {
  const childNodeToDelete = document.getElementById(removableExpense);
  ul.removeChild(childNodeToDelete);
}



