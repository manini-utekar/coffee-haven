document.addEventListener("DOMContentLoaded", () => {

  /* ================= LOGIN CHECK ================= */
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (window.location.pathname.includes("dashboard") && !loggedInUser) {
    alert("Please login first!");
    window.location.href = "login.html";
    return;
  }

  /* ================= LOGIN / REGISTER ================= */
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      localStorage.setItem("loggedInUser", "yes");
      alert("Login successful!");
      window.location.href = "dashboard.html";
    });
  }

  /* ================= MENU DATA ================= */
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

  /* ================= CART ================= */
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) cartCount.innerText = cart.length;
  }

  function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return;

    cartContainer.innerHTML = "";
    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.innerHTML = `
        ${item.itemName} - ₹${item.price}
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartContainer.appendChild(div);
    });
  }

  window.addToCart = function (name, price) {
    cart.push({ itemName: name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    displayCart();
    alert(name + " added to cart!");
  };

  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    displayCart();
  };

  window.confirmOrder = function () {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }
    alert("✅ Order confirmed!");
    cart = [];
    localStorage.removeItem("cart");
    updateCartCount();
    displayCart();
  };

  updateCartCount();
  displayCart();

  /* ================= MENU DISPLAY ================= */
  const menuContainer = document.getElementById("menu-items");
  if (menuContainer) {
    menuData.forEach(item => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        ${loggedInUser ? `<button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>` : ""}
      `;
      menuContainer.appendChild(div);
    });
  }

  /* ================= REVIEWS ================= */
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [
    { name: "Alia", text: "Amazing coffee!", date: "01/01/2026" }
  ];

  const reviewForm = document.getElementById("review-form");
  const reviewList = document.getElementById("review-list");

  function displayReviews() {
    if (!reviewList) return;

    reviewList.innerHTML = "";
    reviews.forEach((r, index) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <strong>${r.name}</strong> (${r.date})
        <p>${r.text}</p>
        <button onclick="removeReview(${index})">Remove</button>
      `;
      reviewList.appendChild(div);
    });
  }

  window.removeReview = function (index) {
    reviews.splice(index, 1);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    displayReviews();
  };

  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
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
    });
  }

  displayReviews();

  /* ================= BOOK A TABLE ================= */
  const bookBtn = document.getElementById("book-btn");
  if (bookBtn) {
    bookBtn.addEventListener("click", () => {
      const name = document.getElementById("table-name").value.trim();
      const date = document.getElementById("table-date").value;
      const time = document.getElementById("table-time").value;
      const people = document.getElementById("table-people").value;

      if (!name || !date || !time || !people) {
        alert("Please fill all fields!");
        return;
      }

      alert(`✅ Table booked for ${people} people by ${name} at ${time} on ${date}`);
      document.getElementById("table-form").reset();
    });
  }

});
