var PRODUCTS_KEY = "bodegon_products";
var FIXED_COST_KEY = "bodegon_fixed_cost";

function readProducts() {
  var text = localStorage.getItem(PRODUCTS_KEY);
  if (text == null) {
    return [];
  }
  return JSON.parse(text);
}

function saveProducts(list) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list));
}

function addProduct(product) {
  var list = readProducts();
  list.push(product);
  saveProducts(list);
}

function deleteProduct(position) {
  var list = readProducts();
  list.splice(position, 1);
  saveProducts(list);
}

function readFixedCost() {
  var text = localStorage.getItem(FIXED_COST_KEY);
  if (text == null) {
    return 0;
  }
  return Number(text);
}

function saveFixedCost(value) {
  localStorage.setItem(FIXED_COST_KEY, value);
}
