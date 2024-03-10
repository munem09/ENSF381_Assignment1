document.addEventListener("DOMContentLoaded", function () {
    var cart = [];

    // Ensure the cart display has a header and a container for items
    var cartDisplay = document.getElementById("cart-display");
    var cartHeader = document.createElement("h2");
    cartHeader.className = "cart-header";
    cartHeader.textContent = "Shopping Cart";
    cartDisplay.appendChild(cartHeader);

    var cartItemsContainer = document.createElement("div");
    cartItemsContainer.className = "cart-items-container";
    cartDisplay.appendChild(cartItemsContainer);

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ""; // Clear existing cart items

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

            cartItemsContainer.appendChild(cartItem);
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
});
