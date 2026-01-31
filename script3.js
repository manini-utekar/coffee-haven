document.addEventListener("DOMContentLoaded", () => {

  const loggedInUser = localStorage.getItem("loggedInUser");
  if (window.location.pathname.includes("dashboard") && !loggedInUser) {
    alert("Please login first!");
    window.location.href = "login.html";
  }

  const menuData = [
    { name: "Espresso", price: 120, img: "images/espresso.jpg" },
    { name: "Cappuccino", price: 160, img: "images/cappacino.jpg" },
    { name: "Latte", price: 180, img: "images/latte.jpeg" },
    { name: "Americano", price: 150, img: "images/americano.jpg" },
    { name: "Mocha", price: 190, img: "images/mocha.jpg" },
    { name: "Cold Brew", price: 200, img: "images/cold brew.jpg" },
    { name: "Hot Chocolate", price: 140, img: "images/hot chocolate.jpg" },
    { name: "Pastries", price: 250, img: "images/pastry.jpg" }
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) cartCount.innerText = cart.length;
  }

  function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return;
    cartContainer.innerHTML = "";
    cart.forEach((item, i) => {
      cartContainer.innerHTML += `${item.itemName} ₹${item.price}
      <button onclick="removeFromCart(${i})">Remove</button><br>`;
    });
  }

  window.removeFromCart = function(i) {
    cart.splice(i,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    displayCart();
  }

  window.addToCart = function(name, price) {
    cart.push({ itemName: name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    displayCart();
    alert(name + " added!");
  }

  const menuContainer = document.getElementById("menu-items");
  if (menuContainer) {
    menuData.forEach(item => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <img src="${item.img}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        ${loggedInUser ? `<button onclick="addToCart('${item.name}',${item.price})">Add</button>` : ""}
      `;
      menuContainer.appendChild(div);
    });
  }

  window.confirmOrder = function() {
    if (!cart.length) return alert("Cart empty!");
    alert("✅ Order Confirmed!");
    cart = [];
    localStorage.removeItem("cart");
    updateCartCount();
    displayCart();
  }

  const confirmBtn = document.getElementById("confirm-order");
  if (confirmBtn) confirmBtn.onclick = confirmOrder;

  updateCartCount();
  displayCart();

  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.onsubmit = e => {
      e.preventDefault();
      localStorage.setItem("loggedInUser", "yes");
      window.location.href = "dashboard.html";
    };
  }
  // ---------- REVIEWS ----------
let reviews = JSON.parse(localStorage.getItem("reviews")) || [
  { name: "Alia", text: "Amazing coffee!", date: "01/01/2026" },
  { name: "Cathrine", text: "Loved the cappuccino.", date: "02/01/2026" }
];

const reviewForm = document.getElementById("review-form");
const reviewList = document.getElementById("review-list");

function displayReviews() {
  if (!reviewList) return;

  reviewList.innerHTML = "";
  reviews.forEach((r, index) => {
    const div = document.createElement("div");
    div.className = "review-card";
    div.innerHTML = `
      <strong>${r.name}</strong>
      <small> • ${r.date}</small>
      <p>${r.text}</p>
      <button onclick="removeReview(${index})" class="btn-remove">Remove</button>
    `;
    reviewList.appendChild(div);
  });
}


// save only once if not present
localStorage.setItem("reviews", JSON.stringify(reviews));
displayReviews();
 

if (reviewForm) {
  reviewForm.onsubmit = e => {
    e.preventDefault();

    const name = document.getElementById("review-name").value.trim();
    const text = document.getElementById("review-text").value.trim();
    if (!name || !text) return;

    reviews.push({
      name,
      text,
      date: new Date().toLocaleDateString()
    });

    localStorage.setItem("reviews", JSON.stringify(reviews));
    displayReviews();
    reviewForm.reset();
  };
}
// Remove review function
window.removeReview = function(index) {
  reviews.splice(index, 1);
  localStorage.setItem("reviews", JSON.stringify(reviews));
  displayReviews();
};
// ---------- BOOK A TABLE ----------
const bookBtn = document.getElementById("book-btn");
if (bookBtn) {
  bookBtn.addEventListener("click", () => {
    const name = document.getElementById("table-name").value.trim();
    const date = document.getElementById("table-date").value;
    const time = document.getElementById("table-time").value;
    const people = document.getElementById("table-people").value;
<<<<<<< HEAD
=======

    if (!name || !date || !time || !people) {
      alert("Please fill in all fields to book a table.");
      return;
    }

    alert(`✅ Table booked for ${people} people by ${name} at ${time} on ${date}`);

    // Optionally, clear the form after booking
    document.getElementById("table-form").reset();
  });
}

>>>>>>> 45285ed (Updated PPT and other changes)

    if (!name || !date || !time || !people) {
      alert("Please fill in all fields to book a table.");
      return;
    }

    alert(`✅ Table booked for ${people} people by ${name} at ${time} on ${date}`);

    // Optionally, clear the form after booking
    document.getElementById("table-form").reset();
  });
}


}); 
