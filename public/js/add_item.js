let addEmployeeForm = document.getElementById('add-item-form-ajax');

addEmployeeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let inputItemDescription = document.getElementById("input-item_description");
  let inputItemCost = document.getElementById("input-item_cost");
  let inputPcFormat = document.getElementById("input-pc_format");
  let inputPcPurpose = document.getElementById("input-pc_purpose");

  let itemDescriptionValue = inputItemDescription.value;
  let itemCostValue = inputItemCost.value;
  let itemPcFormatValue = inputPcFormat.value;
  let itemPcPurposeValue = inputPcPurpose.value;

  let data = {
    item_description: itemDescriptionValue,
    item_cost: itemCostValue,
    pc_format: itemPcFormatValue,
    pc_purpose: itemPcPurposeValue
  };

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-item-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      inputItemDescription = "";
      inputItemCost = "";
      inputPcFormat = "";
      inputPcPurpose = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  }
  xhttp.send(JSON.stringify(data));
})