function deleteItem(itemId) {
    let data = {
      id: itemId
    };
  
    // Set up AJAX request.
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-item-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 204) {
        deleteItemRow(itemId);
      } else if (xhttp.readyState == 4 && xhttp.status != 204) {
        console.log("There was an error with the input.");
      }
    }
    xhttp.send(JSON.stringify(data));
  };

  function deleteItemRow(itemId) {
    let table = document.getElementById("items-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == itemId) {
        table.deleteRow(i);
        break;
      }
    }
  };