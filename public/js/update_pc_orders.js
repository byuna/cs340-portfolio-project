let updatePcOrdersForm = document.getElementById("update-pc-order-form");

updatePcOrdersForm.addEventListener("submit", function (e) {
  // Prevent form from submitting.
  e.preventDefault();
  let inputPcOrderId = document.getElementById("select-order-id");
  let inputEmployeeId = document.getElementById("select-employee");

  let pcOrderIdValue = inputPcOrderId.value;
  let employeeIdValue = inputEmployeeId.value;

  // null check
  if (isNaN(pcOrderIdValue) || isNaN(employeeIdValue)) 
    {
        return;
    }

  let data = {
    pc_order_id: pcOrderIdValue,
    employee_id: employeeIdValue
  }

  // Setting up AJAX request.
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-pc_order", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell AJAX request how to resolve.
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the data to the table

      updateRow(xhttp.response, pcOrderIdValue);

    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  }

  // Send the request and wait for a response.

  xhttp.send(JSON.stringify(data));
})

function updateRow(data, pcOrderId) {
  let parsedData = JSON.parse(data);
  let table = document.getElementById("pc_orders-table");

  for (let i = 0, row; row = table.rows[i]; i++) {
    if (table.rows[i].getAttribute("data-value") == pcOrderId) {
      let updateRowIndex = table.getElementsByTagName("TR")[i];
      console.log(table.row[i]);
      let td = updateRowIndex.getElementsByTagName("td")[3];
      let newEmployeeId = parsedData[i - 1].employee_id;
      console.log(newEmployeeId);
      td.innerHTML = newEmployeeId;
    }
  }
}