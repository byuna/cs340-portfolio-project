let addItemForm = document.getElementById('add-pc_orders_has_items-form-ajax');

addItemForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let inputPcOrderId = document.getElementById("input-pc_order_id");
  let inputItemId = document.getElementById("input-item_id");
  let inputQuantity = document.getElementById("input-quantity");

  let data = {
    pc_order_id: inputPcOrderId.value,
    item_id: inputItemId.value,
    quantity: inputQuantity.value
  };

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-pc-orders-has-items", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      addRowToTable(xhttp.response);                          // Was missing

      inputPcOrderId = "";
      inputItemId = "";
      inputQuantity = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  }
  xhttp.send(JSON.stringify(data));
})


// Adding a New Item 
addRowToTable = (data) => {
  let currentTable = document.getElementById("pc_orders_has_items-table");

  // may not need
  let newRowIndex = currentTable.rows.length;

  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  let row = document.createElement("TR");
  let subOrderIdCell = document.createElement("TD");
  let pcOrderIdCell = document.createElement("TD");
  let itemIdCell = document.createElement("TD");
  let quantityCell = document.createElement("TD");
  let itemDeleteCell = document.createElement("TD");

  subOrderIdCell.innerText = newRow.sub_order_id;
  pcOrderIdCell.innerText = newRow.pc_order_id;
  itemIdCell.innerText = newRow.item_id;
  quantityCell.innerText = newRow.quantity;

  itemDeleteButton = document.createElement("button");
  itemDeleteButton.innerHTML = "Delete";
  itemDeleteButton.onclick = function () {
    deletePcOrderHasItems(newRow.sub_order_id);
  }

  row.appendChild(subOrderIdCell);
  row.appendChild(pcOrderIdCell);
  row.appendChild(itemIdCell);
  row.appendChild(quantityCell);
  row.appendChild(itemDeleteCell);
  itemDeleteCell.appendChild(itemDeleteButton);

  row.setAttribute('data-value', newRow.sub_order_id);

  currentTable.appendChild(row);
};