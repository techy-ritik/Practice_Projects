let i = 1;

let newTable = {};

function addNewField() {
  const fieldInputs = document.querySelector(".inputs");

  const newDiv = document.createElement("div");
  newDiv.id = "newInput";

  newDiv.innerHTML = `<div class="mb-2">
                    <input
                        type="text"
                        class="form-control"
                        id="fieldName${i}"
                        name="fieldNames"
                    />
                </div>
                <div class="mb-3">
                  <select class="form-select" id="type${i}" name="types">
                    <option value="STRING">STRING</option>
                    <option value="INTEGER">INTEGER</option>
                    <option value="BOOLEAN">BOOLEAN</option>
                    <option value="JSON">JSON</option>
                    <option value="DOUBLE">DOUBLE</option>
                  </select>
                </div>`;

  fieldInputs.appendChild(newDiv);
  i++;
  console.log(i);
}

function newTableCreated(event) {
  event.preventDefault();

  newTable.tableName = document.getElementById("tableName").value;
  newTable.fieldName = document.getElementById("fieldName").value;
  newTable.fieldType = document.getElementById("type").value;

  // console.log(newTable.fieldName);
  //     console.log(newTable.fieldType);
  for (let j = 1; j < i; j++) {
    let newFieldId = `fieldName${j}`;
    let newFieldType = `fieldType${j}`;

    newTable[newFieldId] = document.getElementById(`fieldName${j}`).value;
    newTable[newFieldType] = document.getElementById(`type${j}`).value;

    // console.log(newTable[newFieldId]);
    //     console.log(newTable[newFieldType]);
  }

  console.log("newTable", newTable);

  axios
    .post("http://localhost:3000/dbManagement/createNewTable", newTable)
    .then((res) => {
      console.log("res.data", newTable);

      const createTable = document.getElementById("newTableModal");
      const createTableInstance = bootstrap.Modal.getInstance(createTable);
      createTableInstance.hide();

      alert(res.data.message);

      tableDetails(newTable);
    })
    .catch((err) => {
      console.log(err);
    });
}

function tableDetails(newTableDetails) {
  console.log("newTableDetails", newTableDetails);

  const nav = document.querySelector(".btn-group-vertical");
  const allNavButton = document.querySelectorAll("Button");

  allNavButton.forEach((tableButtonId) => {
    if (tableButtonId.id == newTableDetails.tableName) {
      const targetButton = document.getElementById(tableButtonId.id);
      nav.removeChild(targetButton);
    }
  });

  const newTableButton = document.createElement("button");
  const newTableButtonText = document.createTextNode(
    `${newTableDetails.tableName}`
  );
  newTableButton.appendChild(newTableButtonText);
  newTableButton.className = "tableName";
  newTableButton.id = newTableDetails.tableName;
  newTableButton.addEventListener("click", function () {
    // const tableNameId= document.getElementById("")
    getTableDetails(newTableButton.id);
  });

  nav.appendChild(newTableButton);
}

function getTableDetails(uniqueTableName) {
  // const table= document.querySelector(".table")

  console.log("uniqueTableName", uniqueTableName);
  axios
    .get(
      `http://localhost:3000/dbManagement/tableDetails?tableName=${uniqueTableName}`
    )
    .then((res) => {
      console.log("getDataFromTable", res.data.columns);

      showTableDetails(res.data.columns);
    })
    .catch((err) => {
      console.log(err);
    });
}

function showTableDetails(tableData) {
  const tableContainer = document.querySelector(".table-container");

  try {
    const table = document.querySelector(".table");

    if (table) {
      tableContainer.removeChild(table);
      console.log("table Removed")
    }
  } catch {}

  console.log("tableData", tableData);
  console.log("tableData.length", tableData.length);

  const table = document.createElement("table");
  table.className="table";
  tableContainer.appendChild(table);
  const tHead = document.createElement("thead");
  const tBody = document.createElement("tbody");
  table.appendChild(tHead);
  table.appendChild(tBody);


  const trHead = document.createElement("tr");
  tHead.appendChild(trHead);
  trHead.id = "tableHead";
  const trBody = document.createElement("tr");
  tBody.appendChild(trBody);
  trBody.id = "tableBody";

  for (let key in tableData) {
    console.log(`${key}:${tableData[key]}`);

    // const dataValues = tableData[key];
    const newTh = document.createElement("th");
    const newThText = document.createTextNode(key);
    newTh.appendChild(newThText);
    trHead.appendChild(newTh);
  }

  const insertRecordBtn = document.createElement("button");
  const insertRecordBtnText = document.createTextNode("Insert Record");
  insertRecordBtn.appendChild(insertRecordBtnText);
  insertRecordBtn.addEventListener("click",function(){
    insertTableRecords();
  })
  table.appendChild(insertRecordBtn);
}


function insertTableRecords(){

  

}