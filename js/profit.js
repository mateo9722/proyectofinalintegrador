function unitProfit(price, cost) {
  return price - cost;
}

function profitMargin(price, cost) {
  if (price <= 0) {
    return 0;
  }
  return (unitProfit(price, cost) / price) * 100;
}

function monthlyProfit(price, cost, sold) {
  return unitProfit(price, cost) * sold;
}

function sortByProfit(list) {
  var ordered = [];
  var i = 0;

  while (i < list.length) {
    ordered.push(list[i]);
    i = i + 1;
  }

  var passes = 0;
  while (passes < ordered.length - 1) {
    var j = 0;
    while (j < ordered.length - passes - 1) {
      var currentProfit = monthlyProfit(ordered[j].price, ordered[j].cost, ordered[j].sold);
      var nextProfit = monthlyProfit(ordered[j + 1].price, ordered[j + 1].cost, ordered[j + 1].sold);

      if (currentProfit < nextProfit) {
        var temporary = ordered[j];
        ordered[j] = ordered[j + 1];
        ordered[j + 1] = temporary;
      }
      j = j + 1;
    }
    passes = passes + 1;
  }

  return ordered;
}

function totalProfit(list) {
  var total = 0;
  var i = 0;
  while (i < list.length) {
    total = total + monthlyProfit(list[i].price, list[i].cost, list[i].sold);
    i = i + 1;
  }
  return total;
}

function showProfit() {
  var list = readProducts();
  var box = document.getElementById("profitTable");
  box.textContent = "";

  if (list.length == 0) {
    box.appendChild(emptyNotice());
    return;
  }

  var ordered = sortByProfit(list);
  var table = document.createElement("table");
  table.appendChild(createHeader(["Producto", "Ganancia por unidad", "Margen", "Ganancia del mes"]));

  var i = 0;
  while (i < ordered.length) {
    var row = document.createElement("tr");
    var unitGain = unitProfit(ordered[i].price, ordered[i].cost);
    var margin = profitMargin(ordered[i].price, ordered[i].cost);
    var monthGain = monthlyProfit(ordered[i].price, ordered[i].cost, ordered[i].sold);

    row.appendChild(createCell(ordered[i].name, ""));
    row.appendChild(createCell(money(unitGain), ""));
    row.appendChild(createCell(roundNumber(margin) + "%", ""));
    row.appendChild(createCell(money(monthGain), ""));
    table.appendChild(row);
    i = i + 1;
  }

  var totalRow = document.createElement("tr");
  totalRow.className = "total";
  var totalLabel = createCell("Ganancia total del mes", "");
  totalLabel.colSpan = 3;
  totalRow.appendChild(totalLabel);
  totalRow.appendChild(createCell(money(totalProfit(list)), ""));
  table.appendChild(totalRow);
  box.appendChild(table);
}
