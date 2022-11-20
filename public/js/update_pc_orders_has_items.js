let updatePcOrdersHasItemsForm = document.getElementById('update-pc_orders_has_items-form-ajax');

updatePcOrdersHasItemsForm.addEventListener("submit", function(e) {
  e.preventDefault();

  let inputSubOrderId = document.getElementById("input-update-sub_order_id");
  let inputQuantity = document.getElementById("input-update-quantity");

  let subOrderIdValue = inputSubOrderId.value;
  let quantityValue = inputQuantity.value;

  if (isNaN(quantityValue)) {
    return;
  }

  let data = {
    sub_order_id: subOrderIdValue,
    quantity: quantityValue
  };
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-pc-orders-has-items-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      updateRow(xhttp.response, subOrderIdValue);
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  }
  xhttp.send(JSON.stringify(data));
})

function updateRow(data, subOrderId) {
  let parsedData = JSON.parse(data);

  let table = document.getElementById("pc_orders_has_items-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
    if (table.rows[i].getAttribute("data-value") == subOrderId) {
      let updateRowIndex = table.getElementsByTagName("tr")[i];
      let td = updateRowIndex.getElementsByTagName("td")[4];
      td.innerHTML = parsedData[0].quantity;
    }
  }
}

