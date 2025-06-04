let cart = [];
let total = 0;

function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  total += price;

  const cartList = document.getElementById("cart");
  const listItem = document.createElement("li");
  listItem.textContent = `${productName} – ${price.toFixed(2)} лв`;
  cartList.appendChild(listItem);

  document.getElementById("total").textContent = `Общо: ${total.toFixed(2)} лв`;
}

function submitOrder(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();

  if (cart.length === 0) {
    alert("Количката е празна.");
    return;
  }

  if (!name || !address) {
    alert("Моля, попълнете всички полета.");
    return;
  }

  // Показване на потвърждение
  document.getElementById("confirmation").classList.remove("hidden");

  // Нулиране
  document.getElementById("orderForm").reset();
  document.getElementById("cart").innerHTML = "";
  document.getElementById("total").textContent = "Общо: 0.00 лв";

  cart = [];
  total = 0;
}
