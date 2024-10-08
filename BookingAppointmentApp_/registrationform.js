const ul = document.querySelector("ul");

api = "http://localhost:3000/user/add-user";

axios
  .get(api)
  .then((res) => {
    console.log(res.data);
    showUser(res.data.allUsers);
  })
  .catch((err) => {
    console.log(err);
  });

function handleFormSubmit(event) {
  event.preventDefault();

  const newUser = {
    name: document.getElementById("username").value,
    email: document.getElementById("email").value,
    number: document.getElementById("phone").value,
  };

  if (
    newUser.name.length != 0 &&
    newUser.email.length != 0 &&
    newUser.number.length != 0
  ) {
    axios
      .post(api, newUser)
      .then((res) => {
        // console.log(res);
        showUser(res.data.newUserDetail);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    const body = document.querySelector("body");

    const para = document.createElement("p");
    para.innerHTML = `Please Fill all the details`;

    body.appendChild(para);
  }
}

function showUser(user) {
  if (user.length === 0) {
    const body = document.querySelector("body");
    const para = document.createElement("p");
    para.innerHTML = `No users available right Now.!!`;
    body.appendChild(para);
  } else if (user.length > 0) {
    // for (i = 0; i <= user.length; i++) {
    user.forEach(usr=>{
      // console.log("inside for loop",user[i].phonnumber);
      const newLi = document.createElement("li");
      newLi.className = "user";
      newLi.id=usr.id;

      newLi.innerHTML = `${usr.name} - ${usr.email} - ${usr.phonnumber} - ${usr.id}`;

      btn = document.createElement("button");
      const btnText = document.createTextNode("delete");
      btn.appendChild(btnText);
      btn.type = "delete";
      btn.className = "delete-btn";
      btn.addEventListener("click", function () {
        deleteDetails(usr.id);
      });
      newLi.appendChild(btn);

      editBtn = document.createElement("button");
      const editBtnText = document.createTextNode("edit");
      editBtn.appendChild(editBtnText);
      editBtn.type = "edit";
      editBtn.className = "edit-btn";
      // // editBtn.addEventListener("click", editDetails);
      // editBtn.onclick=editDetails;
      newLi.appendChild(editBtn);

      ul.appendChild(newLi);
    })
  } else {
    const newLi = document.createElement("li");
    newLi.className = "user";
    newLi.id = user.id;

    newLi.innerHTML = `${user.name} - ${user.email} - ${user.phonnumber}`;
    
    btn = document.createElement("button");
    const btnText = document.createTextNode("delete");
    btn.appendChild(btnText);
    btn.type = "delete";
    btn.className = "delete-btn";
    // btn.addEventListener("click", function () {
    //   deleteDetails(user.id);
    // });
    btn.onclick = function () {
      deleteDetails(user.id);
    };
    newLi.appendChild(btn);

    editBtn = document.createElement("button");
    const editBtnText = document.createTextNode("edit");
    editBtn.appendChild(editBtnText);
    editBtn.type = "edit";
    editBtn.className = "edit-btn";
    // // editBtn.addEventListener("click", editDetails);
    // editBtn.onclick=editDetails;
    newLi.appendChild(editBtn);

    ul.appendChild(newLi);
  }
}

function deleteDetails(userId) {
  axios
    .delete(`http://localhost:3000/user/delete-user/${userId}`)
    .then((res) => {
      console.log(res);
      removeFromDisplay(userId);
    })
    .catch((err) => {
      console.log(err);
    });

}

function removeFromDisplay(userId) {
  const childNodeToBeDeleted = document.getElementById(userId);
  // console.log('parentNode',ul)
  // console.log('childNodeToBeDeleted',childNodeToBeDeleted);
  ul.removeChild(childNodeToBeDeleted);
}
