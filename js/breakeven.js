function monthlyIncome(list) {
  var total = 0;
  var i = 0;
  while (i < list.length) {
    total = total + list[i].price * list[i].sold;
    i = i + 1;
  }
  return total;
}

function monthlyCost(list) {
  var total = 0;
  var i = 0;
  while (i < list.length) {
    total = total + list[i].cost * list[i].sold;
    i = i + 1;
  }
  return total;
}

function averageMargin(list) {
  var income = monthlyIncome(list);
  if (income <= 0) {
    return -1;
  }
  var cost = monthlyCost(list);
  return (income - cost) / income;
}

function breakevenSales(fixedCost, margin) {
  if (margin <= 0) {
    return -1;
  }
  return fixedCost / margin;
}

function profitAtSales(sales, margin, fixedCost) {
  return sales * margin - fixedCost;
}

function showBreakeven() {
  var list = readProducts();
  var message = document.getElementById("breakevenMessage");
  var result = document.getElementById("breakevenResult");
  var chart = document.getElementById("breakevenChart");
  var fixedCostInput = document.getElementById("fixedCost");

  message.textContent = "";
  message.className = "message";
  result.textContent = "";
  chart.textContent = "";

  if (list.length == 0) {
    message.textContent = "Primero registra tus productos en la pestaña Productos.";
    message.className = "message error";
    return;
  }

  var fixedCostText = fixedCostInput.value;
  var fixedCost = Number(fixedCostText);

  if (fixedCostText == "" || isNaN(fixedCost)) {
    message.textContent = "Escribe cuánto gastas fijo al mes.";
    message.className = "message error";
    return;
  }

  if (fixedCost <= 0) {
    message.textContent = "El gasto fijo debe ser un número mayor que 0.";
    message.className = "message error";
    return;
  }

  var income = monthlyIncome(list);
  if (income <= 0) {
    message.textContent = "Ningún producto tiene ventas registradas, no se puede calcular.";
    message.className = "message error";
    return;
  }

  var margin = averageMargin(list);
  if (margin <= 0) {
    message.textContent = "No hay margen de ganancia para calcular el punto de equilibrio.";
    message.className = "message error";
    return;
  }

  saveFixedCost(fixedCost);
  var breakeven = breakevenSales(fixedCost, margin);
  var table = document.createElement("table");
  table.appendChild(createHeader(["Fila", "Valor"]));

  var fixedCostRow = document.createElement("tr");
  fixedCostRow.appendChild(createCell("Gasto fijo del mes", ""));
  fixedCostRow.appendChild(createCell(money(fixedCost), ""));
  table.appendChild(fixedCostRow);

  var marginRow = document.createElement("tr");
  marginRow.appendChild(createCell("Margen promedio", ""));
  marginRow.appendChild(createCell(roundNumber(margin * 100) + "%", ""));
  table.appendChild(marginRow);

  var breakevenRow = document.createElement("tr");
  breakevenRow.appendChild(createCell("Necesitas vender al mes", ""));
  breakevenRow.appendChild(createCell(money(breakeven), ""));
  table.appendChild(breakevenRow);

  var incomeRow = document.createElement("tr");
  incomeRow.appendChild(createCell("Vendes ahora al mes", ""));
  incomeRow.appendChild(createCell(money(income), ""));
  table.appendChild(incomeRow);

  result.appendChild(table);

  var note = document.createElement("p");
  note.className = "note";
  var currentProfit = profitAtSales(income, margin, fixedCost);
  if (income >= breakeven) {
    note.textContent = "Ya pasaste el punto de equilibrio. Este mes el negocio gana " + money(currentProfit) + ".";
  } else {
    var missingSales = breakeven - income;
    note.textContent = "Todavía no llegas al punto de equilibrio. Te faltan " + money(missingSales) + " de venta al mes.";
  }
  result.appendChild(note);
  drawChart(breakeven, margin, fixedCost);
}

function drawChart(breakeven, margin, fixedCost) {
  var box = document.getElementById("breakevenChart");
  box.textContent = "";

  var title = document.createElement("h3");
  title.textContent = "Utilidad según cuánto vendas";
  box.appendChild(title);

  var maxLevel = breakeven * 2.5;
  if (maxLevel <= 0) {
    return;
  }

  var multiplier = 0;
  while (multiplier <= 2.5) {
    var sales = breakeven * multiplier;
    var profit = profitAtSales(sales, margin, fixedCost);
    var bar = document.createElement("div");
    bar.className = "bar";

    if (sales == 0) {
      bar.style.width = "3%";
    } else {
      bar.style.width = (sales / maxLevel) * 100 + "%";
    }

    if (profit < 0) {
      bar.style.backgroundColor = "#a3301f";
      bar.textContent = "Vendiendo " + money(sales) + " -> pierde " + money(Math.abs(profit));
    } else {
      bar.textContent = "Vendiendo " + money(sales) + " -> gana " + money(profit);
    }

    box.appendChild(bar);
    multiplier = multiplier + 0.5;
  }
}

var savedFixedCost = readFixedCost();
if (savedFixedCost > 0) {
  document.getElementById("fixedCost").value = savedFixedCost;
}
