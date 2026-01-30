document.addEventListener("DOMContentLoaded", () => {

  const loggedInUser = localStorage.getItem("loggedInUser");
  if (window.location.pathname.includes("dashboard") && !loggedInUser) {
    alert("Please login first!");
    window.location.href = "login.html";
  }

  const menuData = [
    { name: "Espresso", price: 120, img: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d" },
    { name: "Cappuccino", price: 160, img: "https://as1.ftcdn.net/v2/jpg/03/60/64/04/1000_F_360640468_ZD6nIMvYQ9EEDiHDeZ9IGxLsZj914wcT.jpg" },
    { name: "Latte", price: 180, img: "https://images.pexels.com/photos/2067399/pexels-photo-2067399.jpeg" },
    { name: "Americano", price: 150, img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Mocha", price: 190, img: "https://gatherforbread.com/wp-content/uploads/2014/10/Dark-Chocolate-Mocha-.jpg" },
    { name: "Cold Brew", price: 200, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-c7TG638AJ-_OdMbHW9G1WUfwHVcBNNHYOw&s" },
    { name: "Hot Chocolate", price: 140, img: "https://images.unsplash.com/photo-1637572815755-c4b80092dce1" },
    { name: "Pastries", price: 250, img: "https://www.shutterstock.com/image-photo/sweet-traditional-pastry-on-dark-600nw-2428064751.jpg" }
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

  function addToCart(name, price) {
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

}); 