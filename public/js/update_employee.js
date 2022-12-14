let updatePersonForm = document.getElementById("update-employee-form");

updatePersonForm.addEventListener("submit", function (e) {
  // Prevent form from submitting.
  e.preventDefault();
  let inputFullName = document.getElementById("mySelect");
  let inputPhone = document.getElementById("input-employee_phone-update");

  let fullNameValue = inputFullName.value;
  let phoneValue = inputPhone.value;

  let data = {
    fullName: fullNameValue,
    employee_phone: phoneValue
  }

  // Setting up AJAX request.
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-employee", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell AJAX request how to resolve.
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the data to the table

      updateRow(xhttp.response, fullNameValue);

      inputFullName.value = '';
      inputPhone.value = '';

    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  }

  // Send the request and wait for a response.

  xhttp.send(JSON.stringify(data));
})

function updateRow(data, employeeId) {
  let parsedData = JSON.parse(data);
  
  let table = document.getElementById("employees-table");

  for (let i = 0, row; row = table.rows[i]; i++) {
    if (table.rows[i].getAttribute("data-value") == employeeId) {
      let updateRowIndex = table.getElementsByTagName("TR")[i];
      let td = updateRowIndex.getElementsByTagName("td")[3];

      // there's only one entry in the parsedData array, which is why [0] is used.
      let newNumber = parsedData[0].employee_phone;
      td.innerHTML = newNumber;
    }
  }
}