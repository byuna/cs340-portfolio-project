function deleteCustomer(customerId) {
  let data = {
    id: customerId
  };

  // Set up AJAX request.
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-customer-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      deleteRow(customerId);
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log("There was an error with the input.");
    }
  }
  xhttp.send(JSON.stringify(data));
};

function deleteRow(customerId) {
  let table = document.getElementById("customers-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
    if (table.rows[i].getAttribute("data-value") == customerId) {
      table.deleteRow(i);
      break;
    }
  }
};

function deleteDropDownMenu(customerId) {
  let selectMenu = document.getElementById("mySelect");
  for (let i = 0; i < selectMenu.length; i++) {
    if (Number(selectMenu.options[i].value) === Number(customerId)) {
      selectMenu[i].remove();
      break;
    }
  }
}