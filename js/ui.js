function showSection(name) {
  var sections = document.getElementsByTagName("section");
  var i = 0;
  while (i < sections.length) {
    sections[i].style.display = "none";
    i = i + 1;
  }
  document.getElementById(name).style.display = "block";

  var tabs = document.getElementsByClassName("tab");
  var j = 0;
  while (j < tabs.length) {
    tabs[j].className = "tab";
    j = j + 1;
  }
  document.getElementById("tab-" + name).className = "tab active";
}

function roundNumber(number) {
  return Math.round(number * 100) / 100;
}

function money(number) {
  return "$" + roundNumber(number).toFixed(2);
}

function createCell(text, cssClass) {
  var cell = document.createElement("td");
  cell.textContent = text;
  if (cssClass != "") {
    cell.className = cssClass;
  }
  return cell;
}

function createTagCell(text, cssClass) {
  var tag = document.createElement("span");
  tag.textContent = text;
  tag.className = "tag " + cssClass;
  var cell = document.createElement("td");
  cell.appendChild(tag);
  return cell;
}

function createHeader(titles) {
  var row = document.createElement("tr");
  var i = 0;
  while (i < titles.length) {
    var cell = document.createElement("th");
    cell.textContent = titles[i];
    row.appendChild(cell);
    i = i + 1;
  }
  return row;
}

function emptyNotice() {
  var notice = document.createElement("p");
  notice.className = "note";
  notice.textContent = "Todavía no hay productos registrados. Ve a la pestaña Productos y agrega al menos uno.";
  return notice;
}
