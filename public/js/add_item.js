let addItemForm = document.getElementById('add-item-form-ajax');

addItemForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let inputItemDescription = document.getElementById("input-item_description");
  let inputItemCost = document.getElementById("input-item_cost");
  let inputPcFormat = document.getElementById("input-pc_format");
  let inputPcPurpose = document.getElementById("input-pc_purpose");

  let itemDescriptionValue = inputItemDescription.value;
  let itemCostValue = inputItemCost.value;
  let itemPcFormatValue = inputPcFormat.value;
  let itemPcPurposeValue = inputPcPurpose.value;

  let data = {
    item_description: itemDescriptionValue,
    item_cost: itemCostValue,
    pc_format: itemPcFormatValue,
    pc_purpose: itemPcPurposeValue
  };

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-item-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      addRowToTable(xhttp.response);                          // Was missing

      inputItemDescription.value = "";
      inputItemCost.value = "";
      inputPcFormat.value = "";
      inputPcPurpose.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  }
  xhttp.send(JSON.stringify(data));
})


// Adding a New Item 
addRowToTable = (data) => {
  let currentTable = document.getElementById("items-table");

  // may not need
  let newRowIndex = currentTable.rows.length;

  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  let row = document.createElement("TR");
  let itemIdCell = document.createElement("TD");
  let itemDescriptionCell = document.createElement("TD");
  let itemCostCell = document.createElement("TD");
  let pcFormatCell = document.createElement("TD");
  let pcPurposeCell = document.createElement("TD");
  let itemDeleteCell = document.createElement("TD");

  itemIdCell.innerText = newRow.item_id;
  itemDescriptionCell.innerText = newRow.item_description;
  itemCostCell.innerText = newRow.item_cost;
  pcFormatCell.innerText = newRow.pc_format;
  pcPurposeCell.innerText = newRow.pc_purpose;

  itemDeleteButton = document.createElement("button");
  itemDeleteButton.innerHTML = "Delete";
  itemDeleteButton.onclick = function () {
    deleteItem(newRow.item_id);
  }

  row.appendChild(itemIdCell);
  row.appendChild(itemDescriptionCell);
  row.appendChild(itemCostCell);
  row.appendChild(pcFormatCell);
  row.appendChild(pcPurposeCell);
  row.appendChild(itemDeleteCell);
  itemDeleteCell.appendChild(itemDeleteButton);

  row.setAttribute('data-value', newRow.item_id);

  currentTable.appendChild(row);
};