const menuData = [
    { id: 1, name: "bread and beans", category: "Maincourse", price: 1500.99, icon: "🍔", desc: "yummy." },
    { id: 2, name: "eba and soup", category: "Maincourse", price: 1000.49, icon: "🍗", desc: "fried." },
    { id: 3, name: "Pepperoni Pizza", category: "pizza", price: 1400.99, icon: "🍕", desc: "Fresh." },
    { id: 4, name: "Meat pie", category: "pizza", price: 1300.99, icon: "🌱", desc: "peppers," },
    { id: 5, name: "Iced Cream", category: "drinks", price: 4000.50, icon: "☕", desc: "cold creamy." },
    { id: 6, name: "Fresh Lime Soda", category: "drinks", price: 3000.25, icon: "🥤", desc: "fresh." }
    { id: 7, name: "Black Pepper Vanilla IceCream with Warm Honey", category: "Maincourse", price: 2000.99, icon: "🌱", desc: "Peppers." },
    { id: 8, name: "Pasta", category: "Maincourse", price: 2500.99, icon: "🍔", desc: "yummy." },
    { id: 9, name: "Strawberry and Vanilla IceCream", category: "Maincourse", price: 2000.99, icon: "☕", desc: "coldcreamy." },
];

// Shopping state holding tracking variables
let shoppingCart = [];

// Initialize interface render upon application loading
document.addEventListener("DOMContentLoaded", () => {
    renderMenuCardGrid(menuData);
});

// Render cards dynamically into DOM container
function renderMenuCardGrid(items) {
    const gridContainer = document.getElementById("menu-grid");
    gridContainer.innerHTML = "";

    if (items.length === 0) {
        gridContainer.innerHTML = `<p class='empty-msg'>No culinary options found.</p>`;
        return;
    }

    items.forEach(product => {
        const cardHTML = `
            <div class="food-card" data-category="${product.category}">
                <div class="food-img-placeholder">${product.icon}</div>
                <div class="food-info">
                    <h3>${product.name}</h3>
                    <p class="food-desc">${product.desc}</p>
                    <div class="card-footer">
                        <span class="food-price">$${product.price.toFixed(2)}</span>
                        <button class="add-btn" onclick="addItemToCart(${product.id})">+</button>
                    </div>
                </div>
            </div>
        `;
        gridContainer.insertAdjacentHTML("beforeend", cardHTML);
    });
}

// Handle Menu filtering buttons active styles and view sorting
function filterMenu(categoryName) {
    // Toggle active classes on action target buttons
    const filters = document.querySelectorAll(".filter-btn");
    filters.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    // Evaluate dynamic filter sorting criteria
    if (categoryName === "all") {
        renderMenuCardGrid(menuData);
    } else {
        const filteredArray = menuData.filter(foodItem => foodItem.category === categoryName);
        renderMenuCardGrid(filteredArray);
    }
}

// Add Item into application shopping session array
function addItemToCart(productId) {
    const productMatch = menuData.find(item => item.id === productId);
    const existingEntry = shoppingCart.find(cartItem => cartItem.id === productId);

    if (existingEntry) {
        existingEntry.quantity += 1;
    } else {
        shoppingCart.push({ ...productMatch, quantity: 1 });
    }
   
    updateCartUIStructure();
}

// Remove item entry cleanly from cart arrays
function removeCartItem(productId) {
    shoppingCart = shoppingCart.filter(item => item.id !== productId);
    updateCartUIStructure();
}

// Calculate totals and re-generate list layout views
function updateCartUIStructure() {
    const cartContainer = document.getElementById("cart-items");
    const countBadge = document.getElementById("cart-count");
    const totalDisplay = document.getElementById("cart-total");

    cartContainer.innerHTML = "";
   
    let completeCount = 0;
    let computedTotal = 0;

    if (shoppingCart.length === 0) {
        cartContainer.innerHTML = `<p class="empty-msg">Your cart is empty.</p>`;
    } else {
        shoppingCart.forEach(record => {
            completeCount += record.quantity;
            computedTotal += (record.price * record.quantity);

            const rowTemplate = `
                <div class="cart-item-row">
                    <div class="item-details">
                        <h4>${record.name}</h4>
                        <span>$${record.price.toFixed(2)} x ${record.quantity}</span>
                    </div>
                    <button class="remove-item-btn" onclick="removeCartItem(${record.id})">Remove</button>
                </div>
            `;
            cartContainer.insertAdjacentHTML("beforeend", rowTemplate);
        });
    }

    countBadge.innerText = completeCount;
    totalDisplay.innerText = `$${computedTotal.toFixed(2)}`;
}

// Open/Close slide view transitions for adaptive mobile formats
function toggleCart() {
    const cartDrawer = document.getElementById("cart-sidebar");
    cartDrawer.classList.toggle("open");
}

// Final action validation trigger alerting client checkout submission status
function processCheckout() {
    if (shoppingCart.length === 0) {
        alert("Your order sheet is currently empty!");
        return;
    }
    alert("🎉 Order placed successfully! Thank you for ordering from KamadoFamilyChicken.");
    shoppingCart = [];
    updateCartUIStructure();
   
    const cartDrawer = document.getElementById("cart-sidebar");
    if(cartDrawer.classList.contains("open")) {
        cartDrawer.classList.remove("open");
    }
}