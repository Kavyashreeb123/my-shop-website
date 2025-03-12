// Function to display the cart items in the table
function displayCart() {
    // Get the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Get the cart items container and total price elements
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    // Clear any previous items
    cartItemsContainer.innerHTML = '';
    
    // Initialize total price
    let totalPrice = 0;

    // Loop through cart items and generate table rows
    cart.forEach(item => {
        const price = getProductPrice(item.name);  // Get price from product name
        const totalItemPrice = price * item.quantity;
        totalPrice += totalItemPrice;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${price.toFixed(2)}</td>
            <td>$${totalItemPrice.toFixed(2)}</td>
            <td><button onclick="removeFromCart('${item.name}')">Remove</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });

    // Update total price
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Function to remove item from the cart
function removeFromCart(productName) {
    // Get the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filter out the item that matches the product name
    cart = cart.filter(item => item.name !== productName);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Refresh the cart display
    displayCart();
}

// Function to add item to the cart
function addToCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex > -1) {
        // If product exists, increment its quantity
        cart[productIndex].quantity += 1;
    } else {
        // Otherwise, add a new product with quantity 1
        cart.push({ name: productName, quantity: 1 });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optionally, alert the user or update the cart icon dynamically
    alert(productName + ' has been added to the cart!');

}

// Function to get the price of a product based on its name
function getProductPrice(productName) {
    const productPrices = {
        "Wireless Headphones": 50.00,
        "Smartwatch": 120.00,
        "Bluetooth Speaker": 40.00,
        "Smartphone Case": 15.00,
        "Portable Charger": 25.00,
        "Gaming Mouse": 30.00,
        "LED Desk Lamp": 35.00,
        "Ergonomic Keyboard": 60.00,
        "4K Monitor": 350.00,
        "Wireless Mouse": 20.00,
        "USB Flash Drive": 12.00,
        "Smart Light Bulb": 18.00,
        "Fitness Tracker": 45.00,
        "Bluetooth Earbuds": 40.00,
        "Wireless Charger": 25.00,
        "Camera Lens": 100.00,
        "Car Mount for Phone": 20.00
    };

    // Return the price or 0 if not found
    return productPrices[productName] || 0.00;
}

// Ensure cart is displayed when page loads
window.onload = displayCart;
