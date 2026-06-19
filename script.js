let cartCount = 0;

function addToCart(productName, price) {
    cartCount++;
    updateCartDisplay();
    showNotification('✓ Товар "' + productName + '" добавлен в корзину!');
}
function updateCartDisplay() {
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? 'inline-block' : 'none';
    }
}
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #3A3A3A;
        color: #fff;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 999;
        font-family: 'Montserrat', Arial, sans-serif;
        animation: slideIn 0.5s ease;
        border-left: 4px solid #C25D3A;
        max-width: 350px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);
document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const quantityInput = document.getElementById('quantity');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productName = document.querySelector('.product-info h1')?.textContent || 'Товар';
            const price = document.querySelector('.price-big')?.textContent || '0 ₽';
            const quantity = parseInt(quantityInput?.value) || 1;
            for (let i = 0; i < quantity; i++) {
                addToCart(productName, price);
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const filterCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    const productCards = document.querySelectorAll('.product-card');
    const applyFilterBtn = document.getElementById('applyFilterBtn');
    
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', function() {
            const selectedCategories = [];
            const categoryCheckboxes = document.querySelectorAll('.filter-group:first-child input[type="checkbox"]:checked');
            categoryCheckboxes.forEach(cb => {
                selectedCategories.push(cb.parentElement.textContent.trim());
            });
            productCards.forEach(card => {
                const productName = card.querySelector('h3')?.textContent || '';
                let show = false;
                
                if (selectedCategories.length === 0) {
                    show = true;
                } else {
                    selectedCategories.forEach(cat => {
                        if (productName.includes(cat.slice(0, -1))) {
                            show = true;
                        }
                    });
                }
                
                card.style.display = show ? 'block' : 'none';
            });
            const visibleCount = document.querySelectorAll('.product-card[style*="display: block"]').length;
            const totalCount = productCards.length;
            showNotification('Найдено ' + visibleCount + ' товаров из ' + totalCount);
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateDelivery');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const distance = parseInt(document.getElementById('deliveryDistance')?.value) || 0;
            const weight = parseInt(document.getElementById('deliveryWeight')?.value) || 0;
            
            if (distance <= 0 || weight <= 0) {
                alert('Пожалуйста, введите корректные значения расстояния и веса.');
                return;
            }
            const basePrice = 500;
            const pricePerKm = 30;
            const pricePerKg = 50;
            const totalPrice = basePrice + (distance * pricePerKm) + (weight * pricePerKg);
            const resultDiv = document.getElementById('deliveryResult');
            if (resultDiv) {
                resultDiv.style.display = 'block';
                resultDiv.innerHTML = `
                    <strong>Стоимость доставки:</strong><br>
                    🚚 Расстояние: ${distance} км<br>
                    📦 Вес: ${weight} кг<br>
                    💰 Итого: <span style="color: #C25D3A; font-size: 24px; font-weight: 700;">${totalPrice.toLocaleString()} ₽</span>
                `;
            }
        });
    }
});

console.log('✅ NORDA LIVING — Все JavaScript-обработчики успешно загружены!');