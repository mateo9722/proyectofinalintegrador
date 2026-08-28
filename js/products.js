function nameExists(name) {
  var list = readProducts();
  var i = 0;
  while (i < list.length) {
    if (list[i].name.toLowerCase() == name.toLowerCase()) {
      return true;
    }
    i = i + 1;
  }
  return false;
}

function validateProduct(name, cost, price, stock, sold) {
  if (name == "") {
    return "Escribe el nombre del producto.";
  }
  if (nameExists(name) == true) {
    return "Ese producto ya está registrado.";
  }
  if (isNaN(cost) || cost <= 0) {
    return "El costo de compra debe ser un número mayor que 0.";
  }
  if (isNaN(price) || price <= 0) {
    return "El precio de venta debe ser un número mayor que 0.";
  }
  if (price <= cost) {
    return "El precio de venta debe ser mayor que el costo de compra.";
  }
  if (isNaN(stock) || stock < 0 || stock != Math.round(stock)) {
    return "La cantidad en bodega debe ser un número entero de 0 o más.";
  }
  if (isNaN(sold) || sold < 0 || sold != Math.round(sold)) {
    return "Las unidades vendidas deben ser un número entero de 0 o más.";
  }
  return "";
}

function showMessage(text, cssClass) {
  var message = document.getElementById("formMessage");
  message.textContent = text;
  message.className = "message " + cssClass;
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("cost").value = "";
  document.getElementById("price").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("sold").value = "";
}

function readNumber(id) {
  var text = document.getElementById(id).value;
  if (text == "") {
    return NaN;
  }
  return Number(text);
}

function saveNewProduct(event) {
  event.preventDefault();

  var name = document.getElementById("name").value.trim();
  var cost = readNumber("cost");
  var price = readNumber("price");
  var stock = readNumber("stock");
  var sold = readNumber("sold");

  var error = validateProduct(name, cost, price, stock, sold);

  if (error != "") {
    showMessage(error, "error");
    return;
  }

  var product = {
    name: name,
    cost: cost,
    price: price,
    stock: stock,
    sold: sold
  };

  addProduct(product);
  clearForm();
  showMessage("Producto guardado.", "success");
  showProducts();
}

function removeProduct(position) {
  deleteProduct(position);
  showMessage("Producto eliminado.", "success");
  showProducts();
}

function showProducts() {
  var list = readProducts();
  var box = document.getElementById("productTable");
  box.textContent = "";

  if (list.length == 0) {
    box.appendChild(emptyNotice());
    return;
  }

  var table = document.createElement("table");
  table.appendChild(createHeader(["Producto", "Costo", "Precio", "Bodega", "Vendidos al mes", ""]));

  var i = 0;
  while (i < list.length) {
    var row = document.createElement("tr");
    row.appendChild(createCell(list[i].name, ""));
    row.appendChild(createCell(money(list[i].cost), ""));
    row.appendChild(createCell(money(list[i].price), ""));
    row.appendChild(createCell(list[i].stock, ""));
    row.appendChild(createCell(list[i].sold, ""));

    var button = document.createElement("button");
    button.textContent = "Eliminar";
    button.className = "link";
    button.value = i;
    button.onclick = function () {
      removeProduct(Number(this.value));
    };

    var buttonCell = document.createElement("td");
    buttonCell.appendChild(button);
    row.appendChild(buttonCell);

    table.appendChild(row);
    i = i + 1;
  }

  box.appendChild(table);
}

document.getElementById("productForm").addEventListener("submit", saveNewProduct);

showSection("products");
showProducts();
