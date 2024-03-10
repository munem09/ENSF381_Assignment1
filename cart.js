document.addEventListener("DOMContentLoaded", function () {
    var cart = [];

    // Check if a shopping cart header exists, if not create one
    var cartDisplay = document.getElementById("cart-display");
    if (!cartDisplay.querySelector(".cart-header")) {
        var cartHeader = document.createElement("h2");
        cartHeader.className = "cart-header";
        cartHeader.textContent = "Shopping Cart";
        cartDisplay.appendChild(cartHeader);
    }

    function updateCartDisplay() {
        // Remove all cart items before adding new ones to update the cart display
        var existingItems = cartDisplay.querySelectorAll(".cart-item");
        existingItems.forEach(function(item) {
            cartDisplay.removeChild(item);
        });

        cart.forEach(function (item) {
            var cartItem = document.createElement("div");
            cartItem.className = "cart-item";

            var itemText = document.createElement("span");
            itemText.textContent = `${item.name} - $${item.price.toFixed(2)} - Quantity: ${item.quantity}`;
            cartItem.appendChild(itemText);

            var removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.className = "remove-button";
            removeButton.addEventListener("click", function () {
                removeItemFromCart(item.name);
            });
            cartItem.appendChild(removeButton);

            cartDisplay.appendChild(cartItem);
        });
    }

    function addItemToCart(name, price) {
        var existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name: name, price: price, quantity: 1 });
        }
        updateCartDisplay();
    }

    function removeItemFromCart(name) {
        var itemIndex = cart.findIndex(item => item.name === name);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity--;
            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1);
            }
        }
        updateCartDisplay();
    }

    var addToCartButtons = document.querySelectorAll(".add-to-cart-button");

    addToCartButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var productCell = this.closest("td");
            var productName = productCell.querySelector("h2").textContent;
            var productPrice = parseFloat(productCell.querySelector("p").textContent.replace("Price: $", ""));
            addItemToCart(productName, productPrice);
        });
    });

    updateCartDisplay(); // To ensure the shopping cart header is added upon initial load
});
