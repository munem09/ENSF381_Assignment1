document.addEventListener("DOMContentLoaded", function () {
    // Cart array to store added products
    var cart = [];

    // Function to update the cart display
    function updateCartDisplay() {
        var cartDisplay = document.getElementById("cart-display");
        cartDisplay.innerHTML = "";

        cart.forEach(function (item) {
            var cartItem = document.createElement("div");
            cartItem.className = "cart-item";

            var itemName = document.createElement("span");
            itemName.textContent = item.name;
            cartItem.appendChild(itemName);

            var itemPrice = document.createElement("span");
            itemPrice.textContent = "$" + item.price.toFixed(2);
            cartItem.appendChild(itemPrice);

            var itemQuantity = document.createElement("span");
            itemQuantity.textContent = "Quantity: " + item.quantity;
            cartItem.appendChild(itemQuantity);

            var removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.className = "remove-button";
            removeButton.addEventListener("click", function () {
                removeItemFromCart(item);
                updateCartDisplay();
            });
            cartItem.appendChild(removeButton);

            cartDisplay.appendChild(cartItem);
        });
    }

    // Function to add an item to the cart
    function addItemToCart(name, price) {
        var existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name: name, price: price, quantity: 1 });
        }

        alert("Product added to the cart!");
        updateCartDisplay();
    }

    // Function to remove an item from the cart
    function removeItemFromCart(item) {
        item.quantity--;

        if (item.quantity === 0) {
            var itemIndex = cart.indexOf(item);
            cart.splice(itemIndex, 1);
        }
    }

    // Event listeners for "Add to Cart" buttons
    var addToCartButtons = document.querySelectorAll("button");

    addToCartButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var productName = this.parentNode.querySelector("h2").textContent;
            var productPrice = parseFloat(this.parentNode.querySelector("p").textContent.replace("$", ""));
            addItemToCart(productName, productPrice);
        });
    });

    // Event listener for "Remove" button hover effect
    document.addEventListener("mouseover", function (event) {
        if (event.target.classList.contains("remove-button")) {
            event.target.style.backgroundColor = "#ff0000";
        }
    });

    // Event listener for "Remove" button mouseout effect
    document.addEventListener("mouseout", function (event) {
        if (event.target.classList.contains("remove-button")) {
            event.target.style.backgroundColor = "";
        }
    });

    // Initial cart display setup
    updateCartDisplay();
});
