const WHATSAPP_NUMBER = "2348162179179"; // Replace with actual number

// High quality images for products
const products = [
  { id: 1, name: "Box Basket", category: "Storage", price: 240000, image: "images/boxbasket.jpg" },
  { id: 2, name: "luxury Clay vase", category: "vase", price: 85000, image: "images/clayVase.jpg" },
  { id: 3, name: "craft", category: "Tables", price: 120000, image: "images/craft.jpg" },
  { id: 4, name: "Woven Planter Basket", category: "Decor", price: 45000, image: "https://images.unsplash.com/photo-1592921870789-04563d55041c?q=80&w=800&auto=format&fit=crop" },
  { id: 5, name: "Classic Rattan mirror", category: "mirror", price: 180000, image: "images/mirror1.jpg" },
  { id: 6, name: "Minimalist luxury rattan mirror", category: "mirror", price: 210000, image: "images/mirror2.jpg" },
  { id: 7, name: "Round rattan vase with flowers", category: "vase", price: 75000, image: "images/standvase.jpg" },
  { id: 8, name: "Woven Wall Mirror", category: "Decor", price: 55000, image: "https://images.unsplash.com/photo-1618220179428-22790b46a013?q=80&w=800&auto=format&fit=crop" },
  { id: 9, name: "Bamboo Bookshelf", category: "Storage", price: 320000, image: "https://images.unsplash.com/photo-1594681656829-063a566f108b?q=80&w=800&auto=format&fit=crop" },
  { id: 10, name: "Boho Rattan shelf", category: "Storage", price: 280000, image: "images/luxurycrafted.jpg" },
  { id: 11, name: "Round Rattan Coffee Table", category: "Tables", price: 160000, image: "https://images.unsplash.com/photo-1532372576444-eca405041296?q=80&w=800&auto=format&fit=crop" },
  { id: 12, name: "luxury glow vase", category: "vase", price: 95000, image: "images/glowvase.jpg" },
  { id: 13, name: "luxury carved rattan vase", category: "vase", price: 195000, image: "images/standvase2.jpg" },
  { id: 14, name: "Hanging Egg Chair", category: "Seating", price: 310000, image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?q=80&w=800&auto=format&fit=crop" },
  { id: 15, name: "Rattan Room Divider", category: "Decor", price: 145000, image: "https://images.unsplash.com/photo-1583847268964-b28ce8f31586?q=80&w=800&auto=format&fit=crop" },
  { id: 16, name: "Nesting Tables Set", category: "Tables", price: 175000, image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=800&auto=format&fit=crop" },
  { id: 17, name: "Handwoven Floor Mat", category: "Decor", price: 35000, image: "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?q=80&w=800&auto=format&fit=crop" },
  { id: 18, name: "Rattan Bar Stool", category: "Seating", price: 110000, image: "https://images.unsplash.com/photo-1506898667547-42e22a46e125?q=80&w=800&auto=format&fit=crop" },
  { id: 19, name: "Decorative Bamboo Tray", category: "Kitchen", price: 25000, image: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?q=80&w=800&auto=format&fit=crop" },
  { id: 20, name: "Rattan Console Table", category: "Tables", price: 220000, image: "https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=80&w=800&auto=format&fit=crop" },
  { id: 21, name: "Woven Laundry Hamper", category: "Storage", price: 65000, image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=800&auto=format&fit=crop" }
];

let cart = [];

// DOM Elements
const body = document.body;
const loader = document.getElementById("loader");
const navbar = document.getElementById("navbar");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");
const productGrid = document.getElementById("productGrid");
const cartBtn = document.getElementById("cartBtn");
const closeCartBtn = document.getElementById("closeCart");
const cartSidebar = document.getElementById("cartSidebar");
const backdrop = document.getElementById("backdrop");
const cartItemsContainer = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartCount = document.getElementById("cartCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const continueShoppingBtn = document.getElementById("continueShopping");
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toast-msg");

// ==========================================
// Initialization
// ==========================================
window.addEventListener("load", () => {
  // Remove Loader after slight delay for effect
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1500);

  // Initialize Theme
  initTheme();
  
  // Render Products
  renderProducts();
  
  // Setup Observers for Animations
  setupScrollReveal();
});

// ==========================================
// Theme Logic
// ==========================================
function initTheme() {
  const savedTheme = localStorage.getItem("ardun_theme") || "light";
  if (savedTheme === "dark") {
    body.classList.add("dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  
  if (isDark) {
    themeIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("ardun_theme", "dark");
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("ardun_theme", "light");
  }
});

// ==========================================
// Navbar Scroll Logic
// ==========================================
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ==========================================
// Render Products
// ==========================================
function renderProducts() {
  productGrid.innerHTML = products.map((p, index) => `
    <div class="product-card reveal" style="transition-delay: ${index * 0.1}s">
      <div class="product-img-wrapper">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="product-overlay">
          <button class="add-to-cart-btn" onclick="addToCart(${p.id})">
            Add to Bag
          </button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-details">
          <h3>${p.name}</h3>
          <span class="product-category">${p.category}</span>
        </div>
        <div class="product-price">₦${p.price.toLocaleString()}</div>
      </div>
    </div>
  `).join("");
}

// ==========================================
// Cart Logic
// ==========================================
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  openCart();
  showToast(`${product.name} added to cart`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

function updateQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      updateCartUI();
    }
  }
}

function updateCartUI() {
  // Update Badge
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Toggle Empty State
  if (cart.length === 0) {
    cartEmpty.classList.add("active");
    cartItemsContainer.innerHTML = "";
    cartSubtotal.textContent = "₦0";
    cartTotal.textContent = "₦0";
    return;
  }

  cartEmpty.classList.remove("active");

  // Render Items
  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <div>
          <h4 class="cart-item-title">${item.name}</h4>
          <div class="cart-item-price">₦${item.price.toLocaleString()}</div>
        </div>
        <div class="cart-item-controls">
          <div class="qty-control">
            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
          <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join("");

  // Calculate Totals
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartSubtotal.textContent = `₦${totalAmount.toLocaleString()}`;
  cartTotal.textContent = `₦${totalAmount.toLocaleString()}`;
}

// ==========================================
// Sidebar UI Controls
// ==========================================
function openCart() {
  cartSidebar.classList.add("active");
  backdrop.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

function closeCart() {
  cartSidebar.classList.remove("active");
  backdrop.classList.remove("active");
  document.body.style.overflow = "";
}

cartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);
continueShoppingBtn.addEventListener("click", closeCart);

// ==========================================
// WhatsApp Checkout
// ==========================================
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return;
  
  let msg = "Hello Ardun! I would like to place an order:%0A%0A";
  cart.forEach((item, i) => {
    msg += `${i+1}. ${item.name} (x${item.quantity}) - ₦${(item.price * item.quantity).toLocaleString()}%0A`;
  });
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  msg += `%0A*Total: ₦${total.toLocaleString()}*`;
  
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
});

// ==========================================
// Toast Notifications
// ==========================================
let toastTimeout;
function showToast(message) {
  toastMsg.textContent = message;
  toast.classList.add("show");
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ==========================================
// Scroll Reveal Animations
// ==========================================
function setupScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });
}