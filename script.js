let cart = [];


// MOBILE MENU
function toggleMenu() {
  const nav = document.querySelector(".nav-links");
  nav.classList.toggle("active");
}


// ADD TO CART
function addToCart(name, price) {

  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();

  showToast(`${name} added to cart! 🧁`);
}


// UPDATE CART
function updateCart() {

  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  let totalQuantity = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalQuantity += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = totalPrice;


  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="empty-cart">Your cart is empty.</p>';

    return;
  }


  cartItems.innerHTML = cart.map((item, index) => {

    return `
      <div class="cart-item">

        <div>
          <strong>${item.name}</strong>
          <small>
            ₹${item.price} × ${item.quantity}
          </small>
        </div>

        <div>
          <strong>₹${item.price * item.quantity}</strong>

          <button onclick="removeItem(${index})">
            ×
          </button>
        </div>

      </div>
    `;

  }).join("");
}


// REMOVE ITEM
function removeItem(index) {

  cart.splice(index, 1);

  updateCart();

  showToast("Item removed");
}


// OPEN CART
function openCart() {

  document
    .getElementById("cartOverlay")
    .classList.add("show");
}


// CLOSE CART
function closeCart(event) {

  if (
    !event ||
    event.target.id === "cartOverlay"
  ) {

    document
      .getElementById("cartOverlay")
      .classList.remove("show");

  }
}


// TOAST
function showToast(message) {

  const toast = document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


// WHATSAPP CHECKOUT
function checkout() {

  if (cart.length === 0) {

    showToast("Your cart is empty!");

    return;
  }


  let message =
    "Hello Prince Bakery!%0A%0AI want to order:%0A";


  let total = 0;


  cart.forEach(item => {

    const itemTotal =
      item.price * item.quantity;

    total += itemTotal;

    message +=
      `• ${item.name} x ${item.quantity} = ₹${itemTotal}%0A`;

  });


  message +=
    `%0ATotal: ₹${total}%0A%0APlease confirm my order.`;


  window.open(
    `https://wa.me/918707050016?text=${message}`,
    "_blank"
  );
}


// NAV LINK CLICK -> CLOSE MOBILE MENU
document.querySelectorAll(".nav-links a").forEach(link => {

  link.addEventListener("click", () => {

    document
      .querySelector(".nav-links")
      .classList.remove("active");

  });

});


// SIMPLE SCROLL REVEAL
const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

      }

    });

  },
  {
    threshold: 0.1
  }
);


document
  .querySelectorAll(
    ".product-card, .review-card, .feature, .about-image"
  )
  .forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(25px)";
    el.style.transition = "opacity .7s ease, transform .7s ease";

    observer.observe(el);

  });
