let updatePcOrderForm = document.getElementById('update-pc-order-form');     // Form ID

updatePcOrderForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let inputOrderId = document.getElementById("input-order-id");
  let inputEmployee = document.getElementById("input-employee");
  
  let orderIdValue = inputOrderId.value;
  let employeeValue = inputEmployee.value;

  let data = {
    orderId: orderIdValue,
    employee: employeeValue
  };

  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-pc-order-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      updateRow(xhttp.response, orderIdValue);
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
        console.log("There was an error updating the employee for a PC.");
    }
  }

  xhttp.send(JSON.stringify(data));
});


function updateRow(data, orderId) {
  let parsedData = JSON.parse(data);

  let table = document.getElementById("pc_orders-table");

  for (let i = 0, row; row = table.rows[i]; i++) {
    if (table.rows[i].getAttribute("data-value") == orderId) {
      let updateRowIndex = table.getElementsByTagName("tr")[i];
      let td = updateRowIndex.getElementsByTagName("td")[3];
      td.innerHTML = parsedData[0].employee_id;
    }
  }
}