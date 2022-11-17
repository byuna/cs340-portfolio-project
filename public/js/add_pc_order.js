let addPcOrderForm = document.getElementById('add-pc-orders-form-ajax');

addPcOrderForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let inputOrderDate = document.getElementById("input-order_date");
  let inputCustomerID = document.getElementById("input-customer_id");
  let inputItemID = document.getElementById("input-item");
  let inputItemQuantity = document.getElementById("input-quantity");

  let data = {
    orderDateValue: inputOrderDate.value,
    CustomerIDValue: inputCustomerID.value,
    ItemIDValue: inputItemID.value,
    ItemQuantityValue: inputItemQuantity.value
  };

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-order", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      addRowToTable(xhttp.response);

      inputOrderDate = '';
      inputCustomerID = '';
      inputItemID = '';
      inputItemQuantity = '';
      
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  }
  xhttp.send(JSON.stringify(data));
});

addRowToTable = (data) => {
  let currentTable = document.getElementById("pc-orders-table");

  let newRowIndex = currentTable.rows.length;

  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  let row = document.createElement("TR");
  let pcOrderIdCell = document.createElement("TD");
  let pcOrderDateCell = document.createElement("TD");
  let pcOrderCustomerCell = document.createElement("TD");
  let pcOrderEmployeeCell = document.createElement("TD");
  let pcOrderTotalCell = document.createElement("TD");

  let pcOrderDeleteCell = document.createElement("TD");

  pcOrderIdCell.innerText = newRow.employee_id;
  pcOrderDateCell.innerText = newRow.employee_first_name;
  pcOrderCustomerCell.innerText = newRow.employee_last_name;
  pcOrderEmployeeCell.innerText = newRow.employee_phone;
  pcOrderTotalCell.innerText = newRow.employee_email;

  pcOrderDeleteButton = document.createElement("button");
  pcOrderDeleteButton.innerHTML = "Delete";
  pcOrderDeleteButton.onclick = function() {
    deletePcOrder(newRow.pc_order_id);
  }

  row.appendChild(pcOrderIdCell);
  row.appendChild(pcOrderDateCell);
  row.appendChild(pcOrderCustomerCell);
  row.appendChild(pcOrderEmployeeCell);
  row.appendChild(pcOrderTotalCell);
  row.appendChild(pcOrderDeleteCell);
  pcOrderDeleteCell.appendChild(pcOrderDeleteButton);

  row.setAttribute('data-value', newRow.pc_order_id);
  
  currentTable.appendChild(row);

//   let SelectMenu = document.getElementById("mySelect");
//   let option = document.createElement("option");
//   option.text = newRow.employee_first_name + ' ' + newRow.employee_last_name;
//   option.value = newRow.employee_id;
}