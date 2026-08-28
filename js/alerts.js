function salesPerDay(sold) {
  return sold / 30;
}

function daysOfStock(stock, sold) {
  var dailySales = salesPerDay(sold);
  if (dailySales == 0) {
    return -1;
  }
  return stock / dailySales;
}

function productStatus(days) {
  if (days == -1) {
    return "Sin rotación";
  }
  if (days <= 7) {
    return "Reponer ya";
  }
  if (days <= 15) {
    return "Reponer pronto";
  }
  return "Bien";
}

function statusClass(status) {
  if (status == "Sin rotación") {
    return "tag-gray";
  }
  if (status == "Reponer ya") {
    return "tag-red";
  }
  if (status == "Reponer pronto") {
    return "tag-amber";
  }
  return "tag-green";
}

function showAlerts() {
  var list = readProducts();
  var box = document.getElementById("alertTable");
  box.textContent = "";

  if (list.length == 0) {
    box.appendChild(emptyNotice());
    return;
  }

  var table = document.createElement("table");
  table.appendChild(createHeader(["Producto", "En bodega", "Vende al día", "Días que le quedan", "Estado"]));

  var i = 0;
  while (i < list.length) {
    var row = document.createElement("tr");
    var dailySales = salesPerDay(list[i].sold);
    var days = daysOfStock(list[i].stock, list[i].sold);
    var daysText = "-";

    if (days != -1) {
      daysText = roundNumber(days);
    }

    var status = productStatus(days);
    row.appendChild(createCell(list[i].name, ""));
    row.appendChild(createCell(list[i].stock, ""));
    row.appendChild(createCell(roundNumber(dailySales), ""));
    row.appendChild(createCell(daysText, ""));
    row.appendChild(createTagCell(status, statusClass(status)));
    table.appendChild(row);
    i = i + 1;
  }

  box.appendChild(table);
}
