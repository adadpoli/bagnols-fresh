
let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} €`;
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => {
      cart.splice(index, 1);
      updateCart();
    };
    li.appendChild(btn);
    cartItems.appendChild(li);
    total += item.price;
  });
  cartTotal.textContent = total.toFixed(2);
  renderPayPalButton(total);
}

function renderPayPalButton(total) {
  document.getElementById("paypal-button-container").innerHTML = "";
  if (total > 0) {
    paypal.Buttons({
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [{ amount: { value: total.toFixed(2) } }]
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          alert("Merci " + details.payer.name.given_name + " pour votre achat !");
          cart = [];
          updateCart();
        });
      }
    }).render("#paypal-button-container");
  }
}
