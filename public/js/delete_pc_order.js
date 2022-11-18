function deletePcOrder(pcOrderId) {
  let data = {
    id: pcOrderId
  };

  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-pc_order-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 204) {
        deleteRow(pcOrderId);
      } else if (xhttp.readyState == 4 && xhttp.status != 204) {
        console.log("There was an error deleting a Pc_order");
      }
  }
  xhttp.send(JSON.stringify(data));
}

function deleteRow(pcOrderId){

  let table = document.getElementById("pc_orders-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
     if (table.rows[i].getAttribute("data-value") == pcOrderId) {
          table.deleteRow(i);
          break;
     }
  }
}