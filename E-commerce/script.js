// ============================
// PRODUCTS
// ============================

const products = [

    {
        id: 1,
        name: "Classic T-Shirt",
        price: 599,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
    },

    {
        id: 2,
        name: "Denim Jacket",
        price: 1499,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600"
    },

    {
        id: 3,
        name: "Casual Shirt",
        price: 899,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600"
    },

    {
        id: 4,
        name: "Stylish Hoodie",
        price: 1199,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600"
    },

    {
        id: 5,
        name: "Black T-Shirt",
        price: 649,
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600"
    },

    {
        id: 6,
        name: "Oversized Shirt",
        price: 999,
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600"
    },

    {
        id: 7,
        name: "Summer Dress",
        price: 1299,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600"
    },

    {
        id: 8,
        name: "Casual Pants",
        price: 1099,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600"
    }

];


// ============================
// CART
// ============================

let cart = JSON.parse(
    localStorage.getItem("auraCart")
) || [];


// ============================
// DISPLAY PRODUCTS
// ============================

function displayProducts(productList = products) {

    const container =
        document.getElementById("products-container");

    container.innerHTML = "";


    // No products

    if (productList.length === 0) {

        container.innerHTML = `

            <div class="no-products">

                <i class="fa-solid fa-face-frown"></i>

                <h3>No products found</h3>

                <p>
                    Try searching for another product.
                </p>

            </div>

        `;

        return;
    }


    // Display products

    productList.forEach(product => {

        container.innerHTML += `

            <div class="product-card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                >

                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="product-price">
                        ₹${product.price}
                    </p>

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;

    });

}


// ============================
// SEARCH PRODUCTS
// ============================

function searchProducts() {

    const searchInput =
        document.getElementById("search-input");

    const searchText =
        searchInput.value.toLowerCase().trim();


    const filteredProducts =
        products.filter(product =>
            product.name
                .toLowerCase()
                .includes(searchText)
        );


    displayProducts(filteredProducts);

}


// ============================
// ADD TO CART
// ============================

function addToCart(productId) {

    const product =
        products.find(item => item.id === productId);


    if (!product) {
        return;
    }


    const existingProduct =
        cart.find(item => item.id === productId);


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    updateCart();

    openCart();

}


// ============================
// UPDATE CART
// ============================

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    // Total quantity

    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    cartCount.textContent =
        totalQuantity;


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i
                    class="fa-solid fa-cart-shopping"
                    style="
                        font-size:40px;
                        margin-bottom:15px;
                    "
                ></i>

                <p>
                    Your cart is empty
                </p>

            </div>

        `;

        cartTotal.textContent = "₹0";

        return;
    }


    // Display cart items

    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach(item => {

        total +=
            item.price * item.quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >


                <div class="cart-item-details">

                    <h4>
                        ${item.name}
                    </h4>


                    <p>
                        ₹${item.price}
                    </p>


                    <div class="quantity">

                        <button
                            onclick="
                                changeQuantity(
                                    ${item.id},
                                    -1
                                )
                            "
                        >
                            -
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            onclick="
                                changeQuantity(
                                    ${item.id},
                                    1
                                )
                            "
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="remove-btn"
                        onclick="
                            removeFromCart(
                                ${item.id}
                            )
                        "
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;

    });


    cartTotal.textContent =
        `₹${total}`;

}


// ============================
// CHANGE QUANTITY
// ============================

function changeQuantity(productId, change) {

    const product =
        cart.find(item => item.id === productId);


    if (!product) {
        return;
    }


    product.quantity += change;


    // Remove if quantity becomes 0

    if (product.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== productId
            );

    }


    saveCart();

    updateCart();

}


// ============================
// REMOVE FROM CART
// ============================

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );


    saveCart();

    updateCart();

}


// ============================
// SAVE CART
// ============================

function saveCart() {

    localStorage.setItem(
        "auraCart",
        JSON.stringify(cart)
    );

}


// ============================
// OPEN CART
// ============================

function openCart() {

    document
        .querySelector(".cart-sidebar")
        .style.right = "0";


    document
        .querySelector(".cart-overlay")
        .style.display = "block";

}


// ============================
// CLOSE CART
// ============================

function closeCart() {

    document
        .querySelector(".cart-sidebar")
        .style.right = "-450px";


    document
        .querySelector(".cart-overlay")
        .style.display = "none";

}


// ============================
// MOBILE NAVBAR
// ============================

const sidenav =
    document.querySelector(".side-navbar");


function showNavbar() {

    sidenav.style.left = "0";

}


function closeNavbar() {

    sidenav.style.left = "-70%";

}


// ============================
// CHECKOUT
// ============================

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;
    }


    alert(
        "Thank you for shopping with Aura!"
    );


    cart = [];


    saveCart();

    updateCart();

    closeCart();

}


// ============================
// INITIAL LOAD
// ============================

displayProducts();

updateCart();