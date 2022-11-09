let addEmployeeForm = document.getElementById('add-employee-form-ajax');

addEmployeeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let inputFirstName = document.getElementById("input-employee_first_name");
  let inputLastName = document.getElementById("input-employee_last_name");
  let inputPhone = document.getElementById("input-employee_phone");
  let inputEmail = document.getElementById("input-employee_email");

  let firstNameValue = inputFirstName.value;
  let lastNameValue = inputLastName.value;
  let phoneValue = inputPhone.value;
  let inputEmailValue = inputEmail.value;

  let data = {
    employee_first_name: firstNameValue,
    employee_last_name: lastNameValue,
    employee_phone: phoneValue,
    employee_email: inputEmailValue
  };

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-employee-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      inputFirstName = "";
      inputLastName = "";
      inputPhone = "";
      inputEmail = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  }
  xhttp.send(JSON.stringify(data));
})