let addEmployeeForm = document.getElementById('add-employee-form-ajax');

addEmployeeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let inputEmployeeFirstName = document.getElementById("input-employee_first_name");
  let inputEmployeeLastName = document.getElementById("input-employee_last_name");
  let inputEmployeePhone = document.getElementById("input-employee_phone");
  let inputEmployeeEmail = document.getElementById("input-employee_email");

  let employeeFirstNameValue = inputEmployeeFirstName.value;
  let employeeLastNameValue = inputEmployeeLastName.value;
  let employeePhoneValue = inputEmployeePhone.value;
  let employeeEmailValue = inputEmployeeEmail.value;

  let data = {
    employee_first_name: employeeFirstNameValue,
    employee_last_name: employeeLastNameValue,
    employee_phone: employeePhoneValue,
    employee_email: employeeEmailValue
  };

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-employee", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      addRowToTable(xhttp.response);

      inputEmployeeFirstName = '';
      inputEmployeeLastName = '';
      inputEmployeePhone = '';
      inputEmployeeEmail = '';
      
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  }
  xhttp.send(JSON.stringify(data));
});

addRowToTable = (data) => {
  let currentTable = document.getElementById("employees-table");

  let newRowIndex = currentTable.rows.length;

  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  let row = document.createElement("TR");
  let employeeIdCell = document.createElement("TD");
  let employeeFirstName = document.createElement("TD");
  let employeeLastName = document.createElement("TD");
  let employeePhone = document.createElement("TD");
  let employeeEmail = document.createElement("TD");

  let employeeDeleteCell = document.createElement("TD");

  employeeIdCell.innerText = newRow.employee_id;
  employeeFirstName.innerText = newRow.employee_first_name;
  employeeLastName.innerText = newRow.employee_last_name;
  employeePhone.innerText = newRow.employee_phone;
  employeeEmail.innerText = newRow.employee_email;

  employeeDeleteButton = document.createElement("button");
  employeeDeleteButton.innerHTML = "Delete";
  employeeDeleteButton.onclick = function() {
    deleteEmployee(newRow.employee_id);
  }

  row.appendChild(employeeIdCell);
  row.appendChild(employeeFirstName);
  row.appendChild(employeeLastName);
  row.appendChild(employeePhone);
  row.appendChild(employeeEmail);
  row.appendChild(employeeDeleteCell);
  employeeDeleteCell.appendChild(employeeDeleteButton);

  row.setAttribute('data-value', newRow.employee_id);
  
  currentTable.appendChild(row);

  let SelectMenu = document.getElementById("mySelect");
  let option = document.createElement("option");
  option.text = newRow.employee_first_name + ' ' + newRow.employee_last_name;
  option.value = newRow.employee_id;
}