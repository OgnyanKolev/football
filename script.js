
let cart = [];
let total = 0;

function addToCart(productName, price, sizeId) {
  const sizeElement = document.getElementById(sizeId);
  if (!sizeElement) return;
  const size = sizeElement.value;

  const existing = cart.find(item => item.name === productName && item.size === size);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name: productName, price: price, size: size, quantity: 1 });
  }

  updateCartUI();
}




function submitOrder(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;

  if (!name || !address || cart.length === 0) {
    alert("Моля, попълнете всички полета и добавете поне един продукт.");
    return;
  }

  document.getElementById("confirmation").classList.remove("hidden");
  document.getElementById("orderForm").reset();
  document.getElementById("cart").innerHTML = "";
  document.getElementById("total").textContent = "Общо: 0.00 лв";
  cart = [];
  total = 0;
}
function filterTeam(team) {
  const allProducts = document.querySelectorAll('.product');
  allProducts.forEach(product => {
    if (team === 'all' || product.dataset.team === team) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}
function updateCartUI() {
  const cartList = document.getElementById("cart-list");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartList.innerHTML = "";
  let totalItems = 0;
  total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    totalItems += item.quantity;
    total += item.price * item.quantity;

    li.innerHTML = `
      ${item.name} (${item.size}) - ${item.price.toFixed(2)} лв x ${item.quantity}
      <button class="qty-btn" onclick="changeQuantity(${index}, 1)">➕</button>
      <button class="qty-btn" onclick="changeQuantity(${index}, -1)">➖</button>
    `;

    cartList.appendChild(li);
  });

  cartCount.textContent = totalItems;
  cartTotal.textContent = "Общо: " + total.toFixed(2) + " лв";
}


function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("hidden");
}

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCartUI();
}


function changeQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
}
