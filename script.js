document.addEventListener('DOMContentLoaded', () => {
    const menuItems = [
        { id: 1, name: 'Pizza', price: 12, img: 'pizza.jpg' },
        { id: 2, name: 'Burger', price: 8, img: 'burger.jpg' },
        { id: 3, name: 'Pasta', price: 10, img: 'pasta.jpg' },
        { id: 4, name: 'Sushi', price: 15, img: 'sushi.jpg' },
        { id: 1, name: 'Pizza', price: 12, img: 'pizza.jpg' },
        { id: 2, name: 'Burger', price: 8, img: 'burger.jpg' },
        { id: 3, name: 'Pasta', price: 10, img: 'pasta.jpg' },
        { id: 4, name: 'Sushi', price: 15, img: 'sushi.jpg' },
        { id: 1, name: 'Pizza', price: 12, img: 'pizza.jpg' },
        { id: 2, name: 'Burger', price: 8, img: 'burger.jpg' },
        { id: 3, name: 'Pasta', price: 10, img: 'pasta.jpg' },
        { id: 4, name: 'Sushi', price: 15, img: 'sushi.jpg' }
    ];

    const cart = [];

    const menuContainer = document.querySelector('.menu-items');
    const cartContainer = document.querySelector('.cart-items');
    const checkoutButton = document.getElementById('checkout');
    const orderConfirmation = document.getElementById('order-confirmation');
    const doneButton = document.getElementById('done');

    const renderMenuItems = () => {
        menuContainer.innerHTML = '';
        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>₹ ${item.price}</p>
                <button onclick="addToCart(${item.id})">Add to Cart</button>
            `;
            menuContainer.appendChild(menuItem);
        });
    };

    const renderCartItems = () => {
        cartContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <div>
                    <button onclick="updateCart(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCart(${item.id}, 1)">+</button>
                    <button onclick="removeFromCart(${item.id})">Delete</button>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        checkoutButton.disabled = cart.length === 0;
    };

    window.addToCart = (id) => {
        const item = menuItems.find(item => item.id === id);
        const cartItem = cart.find(item => item.id === id);

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }

        renderCartItems();
    };

    window.updateCart = (id, quantity) => {
        const cartItem = cart.find(item => item.id === id);

        if (cartItem) {
            cartItem.quantity += quantity;

            if (cartItem.quantity === 0) {
                removeFromCart(id);
            } else {
                renderCartItems();
            }
        }
    };

    window.removeFromCart = (id) => {
        const cartIndex = cart.findIndex(item => item.id === id);
        
        if (cartIndex > -1) {
            cart.splice(cartIndex, 1);
        }

        renderCartItems();
    };

    checkoutButton.addEventListener('click', () => {
        orderConfirmation.style.display = 'flex';
    });

    doneButton.addEventListener('click', () => {
        cart.length = 0;
        renderCartItems();
        orderConfirmation.style.display = 'none';
    });

    renderMenuItems();
    renderCartItems();
});
