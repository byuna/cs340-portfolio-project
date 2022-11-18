function deletePcOrderHasItems(subOrderId) {
    let data = {
      id: subOrderId
    };
  
    // Set up AJAX request.
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-pc-orders-has-items-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 204) {
        deleteRow(subOrderId);
      } else if (xhttp.readyState == 4 && xhttp.status != 204) {
        console.log("There was an error with the input.");
      }
    }
    xhttp.send(JSON.stringify(data));
  };
  
  function deleteRow(customerId) {
    let table = document.getElementById("pc_orders_has_items-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == customerId) {
        table.deleteRow(i);
        break;
      }
    }
  };