const ul = document.querySelector("ul");
// let btn = document.createElement("button");
// let editBtn = document.createElement("button");

function handleFormSubmit(event) {
  event.preventDefault();

  const newUser = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
  };

  api =
    "https://crudcrud.com/api/ae663c661dfb4cb5a61b242c3977913b/BookingAppointment";

  if (
    newUser.username.length != 0 &&
    newUser.email.length != 0 &&
    newUser.phone.length != 0
  ) {
    axios
      .post(api, newUser)
      .then((res) => {
        console.log(res);
        currentNewUserId = res.data._id;
        axios.get(api + "/" + currentNewUserId).then((res) => {
          console.log(res);

          const newLi = document.createElement("li");
          newLi.className = "user";

          const para = document.createElement("p");
          const paraText = document.createTextNode(res.data.username);
          para.appendChild(paraText);
          newLi.appendChild(para);

          const para1 = document.createElement("p");
          const para1Text = document.createTextNode(res.data.email);
          para1.appendChild(para1Text);
          newLi.appendChild(para1);

          const para2 = document.createElement("p");
          const para2Text = document.createTextNode(res.data.phone);
          para2.appendChild(para2Text);
          newLi.appendChild(para2);

          btn = document.createElement("button");
          const btnText = document.createTextNode("delete");
          btn.appendChild(btnText);
          btn.type = "delete";
          btn.className = "delete-btn";
          btn.addEventListener("click", deleteDetails);
          // btn.onclick=deleteDetails;
          newLi.appendChild(btn);

          editBtn = document.createElement("button");
          const editBtnText = document.createTextNode("edit");
          editBtn.appendChild(editBtnText);
          editBtn.type = "edit";
          editBtn.className = "edit-btn";
          editBtn.addEventListener("click", editDetails);
          // editBtn.onclick=editDetails;
          newLi.appendChild(editBtn);

          ul.appendChild(newLi);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    axios
      .get(api)
      .then((res) => {
        console.log(res);

        for (let i = 0; i < res.data.length; i++) {
          const newLi = document.createElement("li");
          newLi.className = "user";

          const para = document.createElement("p");
          const paraText = document.createTextNode(res.data[i].username);
          para.appendChild(paraText);
          newLi.appendChild(para);

          const para1 = document.createElement("p");
          const para1Text = document.createTextNode(res.data[i].email);
          para1.appendChild(para1Text);
          newLi.appendChild(para1);

          const para2 = document.createElement("p");
          const para2Text = document.createTextNode(res.data[i].phone);
          para2.appendChild(para2Text);
          newLi.appendChild(para2);

          btn = document.createElement("button");
          const btnText = document.createTextNode("delete");
          btn.appendChild(btnText);
          btn.type = "delete";
          btn.className = "delete-btn";
          btn.addEventListener("click", deleteDetails);
          // btn.onclick=deleteDetails;
          newLi.appendChild(btn);

          editBtn = document.createElement("button");
          const editBtnText = document.createTextNode("edit");
          editBtn.appendChild(editBtnText);
          editBtn.type = "edit";
          editBtn.className = "edit-btn";
          editBtn.addEventListener("click", editDetails);
          // editBtn.onclick=editDetails;
          newLi.appendChild(editBtn);

          ul.appendChild(newLi);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function deleteDetails(event) {
  if (event.target.classList.contains("delete-btn")) {
    const curentUserDetails = event.target.parentElement;
    ul.removeChild(curentUserDetails);

    axios
      .get(api)
      .then((res) => {
        console.log(res);

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].email === curentUserDetails.children[1].textContent) {
            var newApi = api + "/" + res.data[i]._id;
            console.log(newApi);
            axios
              .delete(newApi)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // localStorage.removeItem(curentUserDetails.children[1].textContent);
  }
}

function editDetails(event) {
  if (event.target.classList.contains("edit-btn")) {
    const form = document.querySelector("form");
    form.reset();
    const curentUserDetails = event.target.parentElement;
    const userNameInput = document.getElementById("username");
    userNameInput.setAttribute(
      "value",
      curentUserDetails.children[0].textContent
    );
    const emailInput = document.getElementById("email");
    emailInput.setAttribute("value", curentUserDetails.children[1].textContent);
    const phoneInput = document.getElementById("phone");
    phoneInput.setAttribute("value", curentUserDetails.children[2].textContent);
    ul.removeChild(curentUserDetails);

    axios
      .get(api)
      .then((res) => {
        console.log(res);

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].email === curentUserDetails.children[1].textContent) {
            var newApi = api + "/" + res.data[i]._id;
            console.log(newApi);
            axios
              .delete(newApi)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // localStorage.removeItem(curentUserDetails.children[1].textContent);
  }
}
