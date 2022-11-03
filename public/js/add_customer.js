// get the object we need to modify.
let addCustomerForm = document.getElementById('add-customer-form');

// Modify the objects we need.
addCustomerForm.addEventListener("submit", function (e) {

  // Prevent the form from submitting.
  e.preventDefault();

  // Get form fields we need to get data from.
  let inputCustomerFirstName = document.getElementById("input-customer_first_name");
  let inputCustomerLastName = document.getElementById("input-customer_last_name");
  let inputCustomerPhone = document.getElementById("input-customer_phone");
  let inputCustomerEmail = document.getElementById("input-customer_email");

  // Get the values from the form fields.
  let customerFirstNameValue = inputCustomerFirstName.value;
  let customerLastNameValue = inputCustomerLastName.value;
  let customerPhoneValue = inputCustomerPhone.value;
  let customerEmailValue = inputCustomerEmail.value;
})