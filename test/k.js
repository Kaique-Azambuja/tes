let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartDisplay();

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCountElement = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const feedbackElement = document.getElementById('feedback');

function addToCart(event) {
    const product = event.target.closest('.product');
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showFeedback("Item adicionado ao carrinho!");
}

function updateCartDisplay() {
    cartCountElement.textContent = cart.length;
    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} - R$ ${item.price.toFixed(2)}</span>
            <span>${item.quantity}</span>
            <button onclick="removeFromCart(${index})">Remover</button>
        `;
        cartItemsElement.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotalElement.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function showFeedback(message) {
    feedbackElement.textContent = message;
    feedbackElement.classList.remove('hidden');

    setTimeout(() => {
        feedbackElement.classList.add('hidden');
    }, 2000);
}

document.getElementById('open-cart').addEventListener('click', () => {
    cartModal.classList.remove('hidden');
});

document.getElementById('close-cart').addEventListener('click', () => {
    cartModal.classList.add('hidden');
});

document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
});
