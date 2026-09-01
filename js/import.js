function openProductFile() {
  document.getElementById("productFile").click();
}

function validImportedProduct(product) {
  if (product == null || typeof product != "object") {
    return false;
  }
  if (typeof product.name != "string" || product.name.trim() == "") {
    return false;
  }
  if (typeof product.cost != "number" || isNaN(product.cost) || product.cost <= 0) {
    return false;
  }
  if (typeof product.price != "number" || isNaN(product.price) || product.price <= product.cost) {
    return false;
  }
  if (typeof product.stock != "number" || isNaN(product.stock) || product.stock < 0 || product.stock != Math.round(product.stock)) {
    return false;
  }
  if (typeof product.sold != "number" || isNaN(product.sold) || product.sold < 0 || product.sold != Math.round(product.sold)) {
    return false;
  }
  return true;
}

function validImportedList(list) {
  if (!Array.isArray(list) || list.length == 0) {
    return false;
  }

  var i = 0;
  while (i < list.length) {
    if (validImportedProduct(list[i]) == false) {
      return false;
    }
    i = i + 1;
  }
  return true;
}

function importProducts(event) {
  var file = event.target.files[0];
  var message = document.getElementById("importMessage");
  message.textContent = "";
  message.className = "message";

  if (file == null) {
    return;
  }

  var reader = new FileReader();
  reader.onload = function () {
    try {
      var list = JSON.parse(reader.result);
      if (validImportedList(list) == false) {
        message.textContent = "El archivo no tiene productos válidos.";
        message.className = "message error";
        return;
      }

      saveProducts(list);
      showProducts();
      message.textContent = "Productos cargados correctamente.";
      message.className = "message success";
    } catch (error) {
      message.textContent = "El archivo no contiene un JSON válido.";
      message.className = "message error";
    }
    event.target.value = "";
  };
  reader.readAsText(file);
}

document.getElementById("productFile").addEventListener("change", importProducts);
