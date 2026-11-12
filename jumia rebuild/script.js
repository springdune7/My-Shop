

let cart = [];

let currentCategory = "all";


function addToCart(button) {

    const product = button.closest(".product");

    const name = product.querySelector("h3").textContent;

    const price = Number(product.dataset.price);

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

    alert(name + " has been added to your cart!");

}


function updateCart() {

    let count = 0;

    let total = 0;

    const cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    }

    cart.forEach((item, index) => {

        count += item.quantity;

        const subtotal = item.price * item.quantity;

        total += subtotal;

        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <strong>${item.name}</strong>

                    <p>KSh ${item.price.toLocaleString()}</p>

                    <button onclick="changeQuantity(${index}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                    <button class="remove-btn"
                            onclick="removeItem(${index})">
                        Remove
                    </button>

                </div>

                <strong>
                    KSh ${subtotal.toLocaleString()}
                </strong>

            </div>

        `;

    });


    document.getElementById("cart-count").textContent = count;

    document.getElementById("cart-total").textContent =
        total.toLocaleString();

}


function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();

}

function removeItem(index) {

    const productName = cart[index].name;

    cart.splice(index, 1);

    updateCart();

    alert(productName + " has been removed from your cart.");

}


function toggleCart() {

    const cartPanel = document.getElementById("cart-panel");

    cartPanel.classList.toggle("show");

    if (cartPanel.classList.contains("show")) {

        cartPanel.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


function clearCart() {

    if (cart.length === 0) {

        alert("Your cart is already empty!");

        return;

    }

    if (confirm("Are you sure you want to clear your cart?")) {

        cart = [];

        updateCart();

        alert("Your cart has been cleared.");

    }

}



function searchProducts() {

    const searchValue = document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();

    const products = document.querySelectorAll(".product");

    let found = 0;

    products.forEach(product => {

        const name = product.querySelector("h3")
            .textContent.toLowerCase();

        const description = product.querySelector(".description")
            .textContent.toLowerCase();

        const matchesSearch =
            name.includes(searchValue) ||
            description.includes(searchValue);

        const matchesCategory =
            currentCategory === "all" ||
            product.dataset.category === currentCategory;

        if (matchesSearch && matchesCategory) {

            product.style.display = "";

            found++;

        } else {

            product.style.display = "none";

        }

    });

    document.getElementById("no-products").style.display =
        found === 0 ? "block" : "none";

    document.getElementById("product-count").textContent =
        found + " products found";

}


function filterCategory(category) {

    currentCategory = category;

    const searchValue = document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();

    const products = document.querySelectorAll(".product");

    let found = 0;

    products.forEach(product => {

        const productCategory = product.dataset.category;

        const name = product.querySelector("h3")
            .textContent.toLowerCase();

        const description = product.querySelector(".description")
            .textContent.toLowerCase();

        const matchesCategory =
            category === "all" || productCategory === category;

        const matchesSearch =
            name.includes(searchValue) ||
            description.includes(searchValue);

        if (matchesCategory && matchesSearch) {

            product.style.display = "";

            found++;

        } else {

            product.style.display = "none";

        }

    });

    document.getElementById("no-products").style.display =
        found === 0 ? "block" : "none";

    document.getElementById("product-count").textContent =
        found + " products found";

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });

}



function sortProducts() {

    const sortValue = document.getElementById("sort-products").value;

    const container = document.getElementById("product-grid");

    const products = Array.from(
        container.querySelectorAll(".product")
    );

    if (sortValue === "low") {

        products.sort((a, b) =>
            Number(a.dataset.price) - Number(b.dataset.price)
        );

    }

    else if (sortValue === "high") {

        products.sort((a, b) =>
            Number(b.dataset.price) - Number(a.dataset.price)
        );

    }

    else if (sortValue === "name") {

        products.sort((a, b) => {

            const nameA = a.querySelector("h3").textContent;

            const nameB = b.querySelector("h3").textContent;

            return nameA.localeCompare(nameB);

        });

    }

    products.forEach(product => {

        container.appendChild(product);

    });

}


function shopNow() {

    document.getElementById("products").scrollIntoView({

        behavior: "smooth"

    });

}



function showAccount() {

    alert(
        "Welcome to MY SHOP!\n\n" +
        "Customer account functionality is planned " +
        "for a future version of this website."
    );

}



function goToCheckout() {

    if (cart.length === 0) {

        alert("Your shopping cart is empty!");

        return;

    }

    const checkoutItems =
        document.getElementById("checkout-items");

    let total = 0;

    checkoutItems.innerHTML = "";

    cart.forEach(item => {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        checkoutItems.innerHTML += `

            <div class="checkout-item">

                <span>
                    ${item.name} x ${item.quantity}
                </span>

                <strong>
                    KSh ${subtotal.toLocaleString()}
                </strong>

            </div>

        `;

    });

    document.getElementById("checkout-total").textContent =
        total.toLocaleString();

    document.getElementById("cart-panel").classList.remove("show");

    document.getElementById("checkout").classList.add("show");

    document.getElementById("checkout").scrollIntoView({

        behavior: "smooth"

    });

}



function closeCheckout() {

    document.getElementById("checkout").classList.remove("show");

    document.getElementById("products").scrollIntoView({

        behavior: "smooth"

    });

}



function placeOrder(event) {

    event.preventDefault();

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    const name = document
        .getElementById("buyer-name")
        .value.trim();

    if (!name) {

        alert("Please enter your name.");

        return;

    }

    const total = cart.reduce((sum, item) => {

        return sum + item.price * item.quantity;

    }, 0);

    alert(

        "ORDER PLACED SUCCESSFULLY!\n\n" +

        "Thank you, " + name + "!\n\n" +

        "Your demonstration order total is KSh " +

        total.toLocaleString() +

        "\n\nThis is a website demonstration. " +
        "No actual payment or delivery has been made."

    );

    cart = [];

    updateCart();

    document.getElementById("checkout-form").reset();

    document.getElementById("checkout").classList.remove("show");

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



function sendMessage(event) {

    event.preventDefault();

    const name = document
        .getElementById("customer-name")
        .value.trim();

    alert(

        "Thank you, " + name + "!\n\n" +

        "Your demonstration message has been received. " +

        "This form does not send messages to a server."

    );

    event.target.reset();

}



function subscribeNewsletter(event) {

    event.preventDefault();

    const email = document
        .getElementById("newsletter-email")
        .value.trim();

    alert(

        "Thank you for subscribing!\n\n" +

        email +

        " has been entered into this demonstration form. " +

        "No email has been stored or sent."

    );

    event.target.reset();

}


document.getElementById("search").addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            searchProducts();

        }

    }
);


updateCart()