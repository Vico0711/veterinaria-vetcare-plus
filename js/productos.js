// ===========================
// PRODUCTOS - FUNCIONALIDAD
// ===========================

// Variables globales
let cart = [];
let products = [];

// Elementos del DOM
const productSearch = document.getElementById('productSearch');
const sortProducts = document.getElementById('sortProducts');
const categoryButtons = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');
const cartButton = document.getElementById('cartButton');
const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartBadge = document.getElementById('cartBadge');
const cartItems = document.getElementById('cartItems');
const emptyCart = document.getElementById('emptyCart');
const cartFooter = document.getElementById('cartFooter');
const totalAmount = document.getElementById('totalAmount');
const clearCartBtn = document.getElementById('clearCart');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const noProductsMessage = document.getElementById('noProductsMessage');
const productsGrid = document.getElementById('productsGrid');

// Cargar carrito del localStorage al iniciar
window.addEventListener('load', () => {
    loadCartFromStorage();
    updateCartUI();
});

// ===========================
// FUNCIONES DEL CARRITO
// ===========================

// Agregar producto al carrito
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: parseFloat(price),
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartUI();
    showNotification('Producto agregado al carrito', 'success');
    
    // Animación del badge
    cartBadge.classList.add('bounce');
    setTimeout(() => {
        cartBadge.classList.remove('bounce');
    }, 500);
}

// Eliminar producto del carrito
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCartToStorage();
    updateCartUI();
    showNotification('Producto eliminado del carrito', 'info');
}

// Actualizar cantidad
function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCartToStorage();
            updateCartUI();
        }
    }
}

// Vaciar carrito
function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
        cart = [];
        saveCartToStorage();
        updateCartUI();
        showNotification('Carrito vaciado', 'info');
    }
}

// Actualizar UI del carrito
function updateCartUI() {
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Actualizar badge
    cartBadge.textContent = itemCount;
    
    // Mostrar/ocultar elementos
    if (cart.length === 0) {
        emptyCart.style.display = 'flex';
        cartItems.style.display = 'none';
        cartFooter.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        cartItems.style.display = 'block';
        cartFooter.style.display = 'block';
        
        // Renderizar items del carrito
        renderCartItems();
        
        // Actualizar total
        totalAmount.textContent = `$${cartTotal.toFixed(2)}`;
    }
}

// Renderizar items del carrito
function renderCartItems() {
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=200" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn minus-btn" data-id="${item.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn plus-btn" data-id="${item.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        cartItems.appendChild(itemElement);
    });
    
    // Event listeners para controles de cantidad
    document.querySelectorAll('.minus-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            updateQuantity(this.getAttribute('data-id'), -1);
        });
    });
    
    document.querySelectorAll('.plus-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            updateQuantity(this.getAttribute('data-id'), 1);
        });
    });
    
    document.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            removeFromCart(this.getAttribute('data-id'));
        });
    });
}

// Guardar carrito en localStorage
function saveCartToStorage() {
    localStorage.setItem('vetcare_cart', JSON.stringify(cart));
}

// Cargar carrito desde localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('vetcare_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// ===========================
// EVENT LISTENERS DEL CARRITO
// ===========================

// Abrir carrito
cartButton.addEventListener('click', () => {
    cartPanel.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Cerrar carrito
function closeCart() {
    cartPanel.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Cerrar con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartPanel.classList.contains('active')) {
        closeCart();
    }
});

// Vaciar carrito
clearCartBtn.addEventListener('click', clearCart);

// Botón de checkout
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    showNotification(`Procesando compra de ${itemCount} productos por $${total.toFixed(2)}`, 'success');
    
    // Aquí iría la lógica de checkout real
    setTimeout(() => {
        alert('¡Gracias por tu compra! En un sistema real, serías redirigido a la página de pago.');
        // clearCart(); // Descomentar si quieres vaciar el carrito después
    }, 1000);
});

// Agregar al carrito
addToCartButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const name = this.getAttribute('data-name');
        const price = this.getAttribute('data-price');
        
        addToCart(id, name, price);
        
        // Animación del botón
        this.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// ===========================
// FILTRADO DE PRODUCTOS
// ===========================

// Filtrar por categoría
categoryButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Actualizar botones activos
        categoryButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        filterProducts(category);
        
        // Scroll suave
        productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

function filterProducts(category) {
    let visibleCount = 0;
    
    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'todos' || cardCategory === category) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Mostrar mensaje si no hay productos
    if (visibleCount === 0) {
        noProductsMessage.style.display = 'block';
    } else {
        noProductsMessage.style.display = 'none';
    }
}

// ===========================
// BÚSQUEDA DE PRODUCTOS
// ===========================

productSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    let visibleCount = 0;
    
    productCards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        const category = card.getAttribute('data-category').toLowerCase();
        const description = card.querySelector('.product-description').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || 
            category.includes(searchTerm) || 
            description.includes(searchTerm) ||
            searchTerm === '') {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Mostrar mensaje si no hay resultados
    if (visibleCount === 0 && searchTerm !== '') {
        noProductsMessage.style.display = 'block';
    } else {
        noProductsMessage.style.display = 'none';
    }
    
    // Reset filtro de categorías si hay búsqueda
    if (searchTerm !== '') {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        categoryButtons[0].classList.add('active');
    }
});

// ===========================
// ORDENAMIENTO DE PRODUCTOS
// ===========================

sortProducts.addEventListener('change', function() {
    const sortType = this.value;
    const productsArray = Array.from(productCards);
    
    productsArray.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));
        const nameA = a.getAttribute('data-name').toLowerCase();
        const nameB = b.getAttribute('data-name').toLowerCase();
        
        switch(sortType) {
            case 'price-asc':
                return priceA - priceB;
            case 'price-desc':
                return priceB - priceA;
            case 'name-asc':
                return nameA.localeCompare(nameB);
            case 'name-desc':
                return nameB.localeCompare(nameA);
            default:
                return 0;
        }
    });
    
    // Reordenar en el DOM
    productsArray.forEach(card => {
        productsGrid.appendChild(card);
    });
    
    // Reiniciar animaciones
    productsArray.forEach((card, index) => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = '';
            card.style.animationDelay = `${index * 0.05}s`;
        }, 10);
    });
});

// ===========================
// VISTA RÁPIDA DE PRODUCTOS
// ===========================

// Base de datos de productos con información detallada
const productsDatabase = {
    '1': {
        name: 'Royal Canin Adult 15kg',
        category: 'Alimentos',
        price: 45,
        oldPrice: null,
        badge: { text: 'Nuevo', class: 'new' },
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600',
        description: 'Alimento completo y balanceado para perros adultos de todas las razas. Fórmula especialmente diseñada con nutrientes esenciales para mantener la salud y vitalidad de tu mascota.',
        features: [
            'Alto contenido de proteína de calidad',
            'Vitaminas y minerales esenciales',
            'Ácidos grasos Omega 3 y 6',
            'Fortalece el sistema inmunológico',
            'Mejora la digestión',
            'Pelaje brillante y saludable'
        ]
    },
    '2': {
        name: 'Collar Reflectivo Ajustable',
        category: 'Accesorios',
        price: 15,
        oldPrice: 18,
        badge: { text: '-20%', class: 'sale' },
        rating: 4.0,
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600',
        description: 'Collar ajustable con material reflectivo de alta visibilidad para paseos nocturnos seguros. Fabricado con nylon resistente y duradero.',
        features: [
            'Material reflectivo 360°',
            'Ajustable de 30cm a 50cm',
            'Hebilla de liberación rápida',
            'Resistente al agua',
            'Anilla D para correa',
            'Disponible en varios colores'
        ]
    },
    '3': {
        name: 'Shampoo Hipoalergénico 500ml',
        category: 'Higiene',
        price: 12,
        oldPrice: null,
        badge: null,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600',
        description: 'Fórmula suave sin parabenos, ideal para pieles sensibles y alérgicas. Enriquecido con aloe vera y vitamina E para un pelaje suave y brillante.',
        features: [
            'Sin parabenos ni sulfatos',
            'pH balanceado para mascotas',
            'Enriquecido con aloe vera',
            'Vitamina E para el pelaje',
            'Aroma natural suave',
            'Hipoalergénico dermatológicamente probado'
        ]
    },
    '4': {
        name: 'Pelota Interactiva LED',
        category: 'Juguetes',
        price: 18,
        oldPrice: null,
        badge: { text: 'Popular', class: 'trending' },
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
        description: 'Pelota con luces LED multicolor y movimiento automático para horas de diversión. Perfecta para estimular el instinto de caza de tu mascota.',
        features: [
            'Luces LED multicolor',
            'Movimiento automático irregular',
            'Material resistente a mordidas',
            'Batería recargable USB',
            'Modo de ahorro de energía',
            'Ideal para interiores y exteriores'
        ]
    },
    '5': {
        name: 'Vitaminas Multivitamínico',
        category: 'Salud',
        price: 22,
        oldPrice: null,
        badge: null,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600',
        description: 'Complemento vitamínico completo para fortalecer el sistema inmune. Rico en vitaminas A, D, E y complejo B para una salud óptima.',
        features: [
            'Complejo vitamínico completo',
            'Fortalece el sistema inmune',
            'Mejora la energía y vitalidad',
            'Apoya la salud articular',
            'Rico en antioxidantes',
            'Sabor agradable para mascotas'
        ]
    },
    '6': {
        name: 'Cama Ortopédica Memory Foam',
        category: 'Camas y Casas',
        price: 65,
        oldPrice: null,
        badge: { text: 'Nuevo', class: 'new' },
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1618224401806-f31c31f3d435?w=600',
        description: 'Cama con memory foam de alta densidad para máximo confort y apoyo articular. Ideal para mascotas senior o con problemas articulares.',
        features: [
            'Memory foam de alta densidad',
            'Alivia presión en articulaciones',
            'Funda removible y lavable',
            'Base antideslizante',
            'Diseño ergonómico',
            'Disponible en 3 tamaños'
        ]
    },
    '7': {
        name: 'ProPlan Cachorro 10kg',
        category: 'Alimentos',
        price: 38,
        oldPrice: null,
        badge: null,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600',
        description: 'Nutrición específica para el crecimiento saludable de cachorros. Rico en DHA para desarrollo cerebral y visual.',
        features: [
            'Alto en proteínas de calidad',
            'DHA para desarrollo cerebral',
            'Calcio y fósforo balanceado',
            'Fortalece huesos y músculos',
            'Fácil digestión',
            'Para cachorros de 2 a 12 meses'
        ]
    },
    '8': {
        name: 'Correa Retráctil 5 metros',
        category: 'Accesorios',
        price: 25,
        oldPrice: 29,
        badge: { text: '-15%', class: 'sale' },
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=600',
        description: 'Correa resistente con sistema de retracción automática y freno. Mango ergonómico antideslizante para mayor control.',
        features: [
            'Longitud de 5 metros',
            'Sistema de freno seguro',
            'Mango ergonómico',
            'Retracción suave y silenciosa',
            'Cinta reflectante',
            'Soporta hasta 50kg'
        ]
    },
    '9': {
        name: 'Kit Cepillo Dental + Pasta',
        category: 'Higiene',
        price: 8,
        oldPrice: null,
        badge: null,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600',
        description: 'Kit completo para higiene dental con sabor agradable para mascotas. Previene placa, sarro y mal aliento.',
        features: [
            'Cepillo de doble cabeza',
            'Pasta dental sabor carne',
            'Previene placa y sarro',
            'Refresca el aliento',
            'Sin fluoruro',
            'Fórmula enzimática'
        ]
    },
    '10': {
        name: 'Kong Rellenable Resistente',
        category: 'Juguetes',
        price: 14,
        oldPrice: null,
        badge: { text: 'Popular', class: 'trending' },
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=600',
        description: 'Juguete indestructible que se puede rellenar con premios y snacks. Perfecto para mascotas que mastican fuerte.',
        features: [
            'Material ultra resistente',
            'Se puede rellenar con premios',
            'Estimula mentalmente',
            'Reduce ansiedad',
            'Rebote impredecible',
            'Apto para lavavajillas'
        ]
    },
    '11': {
        name: 'Antipulgas Spot-On 3 pipetas',
        category: 'Salud',
        price: 16,
        oldPrice: null,
        badge: null,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1573865526739-10c1dd7aa5b8?w=600',
        description: 'Protección contra pulgas, garrapatas y mosquitos por 3 meses. Fórmula de acción rápida y larga duración.',
        features: [
            'Protección por 30 días cada pipeta',
            'Elimina pulgas en 24 horas',
            'Previene garrapatas',
            'Repele mosquitos',
            'Resistente al agua',
            'Fácil aplicación'
        ]
    },
    '12': {
        name: 'Casa Térmica Acogedora',
        category: 'Camas y Casas',
        price: 55,
        oldPrice: 73,
        badge: { text: '-25%', class: 'sale' },
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600',
        description: 'Casa térmica con techo removible y cojín lavable ultra suave. Mantiene el calor en invierno y frescura en verano.',
        features: [
            'Techo removible',
            'Cojín ultra suave lavable',
            'Material térmico aislante',
            'Base antideslizante',
            'Ventanas de malla',
            'Fácil de armar'
        ]
    }
};

// Elementos del modal
const quickViewModal = document.getElementById('quickViewModal');
const quickViewOverlay = document.getElementById('quickViewOverlay');
const quickViewClose = document.getElementById('quickViewClose');
let currentModalQuantity = 1;
let currentProduct = null;

// Abrir modal de vista rápida
function showQuickView(productId) {
    const product = productsDatabase[productId];
    
    if (!product) {
        showNotification('Producto no encontrado', 'error');
        return;
    }
    
    currentProduct = { ...product, id: productId };
    currentModalQuantity = 1;
    
    // Llenar información del modal
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalCategory').textContent = product.category;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPriceCurrent').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modalQuantity').value = currentModalQuantity;
    
    // Rating
    const ratingHTML = generateStarRating(product.rating);
    document.getElementById('modalRating').innerHTML = ratingHTML;
    
    // Precio anterior si existe
    const priceOldElement = document.getElementById('modalPriceOld');
    if (product.oldPrice) {
        priceOldElement.textContent = `$${product.oldPrice.toFixed(2)}`;
        priceOldElement.style.display = 'block';
    } else {
        priceOldElement.style.display = 'none';
    }
    
    // Badge si existe
    const badgeElement = document.getElementById('modalBadge');
    if (product.badge) {
        badgeElement.textContent = product.badge.text;
        badgeElement.className = `modal-badge ${product.badge.class}`;
        badgeElement.style.display = 'block';
        
        // Aplicar estilos según el tipo de badge
        if (product.badge.class === 'new') {
            badgeElement.style.background = 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)';
        } else if (product.badge.class === 'sale') {
            badgeElement.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)';
        } else if (product.badge.class === 'trending') {
            badgeElement.style.background = 'linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)';
            badgeElement.style.color = '#2d3436';
        }
    } else {
        badgeElement.style.display = 'none';
    }
    
    // Características
    const featuresList = document.getElementById('modalFeaturesList');
    featuresList.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Mostrar modal
    quickViewModal.classList.add('active');
    quickViewOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Generar estrellas de rating
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    
    let starsHTML = '';
    
    // Estrellas llenas
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Media estrella
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    starsHTML += `<span>(${rating.toFixed(1)})</span>`;
    
    return starsHTML;
}

// Cerrar modal
function closeQuickView() {
    quickViewModal.classList.remove('active');
    quickViewOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProduct = null;
    currentModalQuantity = 1;
}

quickViewClose.addEventListener('click', closeQuickView);
quickViewOverlay.addEventListener('click', closeQuickView);

// Cerrar con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && quickViewModal.classList.contains('active')) {
        closeQuickView();
    }
});

// Controles de cantidad en el modal
document.getElementById('modalQtyPlus').addEventListener('click', () => {
    if (currentModalQuantity < 99) {
        currentModalQuantity++;
        document.getElementById('modalQuantity').value = currentModalQuantity;
    }
});

document.getElementById('modalQtyMinus').addEventListener('click', () => {
    if (currentModalQuantity > 1) {
        currentModalQuantity--;
        document.getElementById('modalQuantity').value = currentModalQuantity;
    }
});

// Agregar al carrito desde el modal
document.getElementById('modalAddToCart').addEventListener('click', () => {
    if (!currentProduct) return;
    
    for (let i = 0; i < currentModalQuantity; i++) {
        addToCart(currentProduct.id, currentProduct.name, currentProduct.price);
    }
    
    showNotification(`${currentModalQuantity} producto(s) agregado(s) al carrito`, 'success');
    closeQuickView();
    
    // Abrir el carrito automáticamente
    setTimeout(() => {
        cartPanel.classList.add('active');
        cartOverlay.classList.add('active');
    }, 500);
});

// Comprar ahora
document.querySelector('.modal-buy-now').addEventListener('click', () => {
    if (!currentProduct) return;
    
    for (let i = 0; i < currentModalQuantity; i++) {
        addToCart(currentProduct.id, currentProduct.name, currentProduct.price);
    }
    
    closeQuickView();
    showNotification('Redirigiendo a checkout...', 'success');

setTimeout(() => {
    alert(`Comprando ${currentModalQuantity} unidad(es) de ${currentProduct.name} por $${(currentProduct.price * currentModalQuantity).toFixed(2)} En un sistema real, serías redirigido al proceso de pago.`);
}, 1000);
});

// Actualizar los botones de vista rápida
document.querySelectorAll('.quick-view-btn').forEach(btn => {
btn.addEventListener('click', function(e) {
e.stopPropagation();
const productId = this.getAttribute('data-product');
showQuickView(productId);
});
});

// ===========================
// NOTIFICACIONES
// ===========================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle',
        warning: 'exclamation-triangle'
    };
    
    const colors = {
        success: '#00b894',
        error: '#ff6b6b',
        info: '#00cec9',
        warning: '#fdcb6e'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        animation: slideInRight 0.5s ease;
        max-width: 350px;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-${icons[type]}" style="font-size: 1.3rem;"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// ===========================
// EFECTOS VISUALES
// ===========================

// Efecto parallax en imágenes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const productImages = document.querySelectorAll('.product-image img');
    
    productImages.forEach((img, index) => {
        if (img.getBoundingClientRect().top < window.innerHeight && 
            img.getBoundingClientRect().top > -img.offsetHeight) {
            const speed = 0.3;
            const yPos = -(scrolled * speed / (index + 5));
            img.style.transform = `translateY(${yPos}px) scale(1.15)`;
        }
    });
});

// Hover en tarjetas de producto
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const addBtn = this.querySelector('.add-to-cart-btn');
        addBtn.style.transform = 'scale(1.1) rotate(15deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        const addBtn = this.querySelector('.add-to-cart-btn');
        addBtn.style.transform = 'scale(1) rotate(0)';
    });
});

// Animación del botón de carrito
setInterval(() => {
    if (cart.length > 0) {
        cartButton.style.animation = 'pulse 1s ease';
        setTimeout(() => {
            cartButton.style.animation = '';
        }, 1000);
    }
}, 10000);

// ===========================
// ESTADÍSTICAS Y LOGS
// ===========================

function logProductStats() {
    const totalProducts = productCards.length;
    const visibleProducts = document.querySelectorAll('.product-card:not(.hidden)').length;
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    console.log('%c📦 Estadísticas de Productos', 'color: #00b894; font-size: 16px; font-weight: bold;');
    console.log(`Total de productos: ${totalProducts}`);
    console.log(`Productos visibles: ${visibleProducts}`);
    console.log(`Items en carrito: ${cart.length}`);
    console.log(`Total del carrito: $${cartTotal.toFixed(2)}`);
}

// Ejecutar estadísticas al cargar
logProductStats();

// Actualizar estadísticas cuando cambia el carrito
const originalAddToCart = addToCart;
addToCart = function(...args) {
    originalAddToCart.apply(this, args);
    logProductStats();
};

// ===========================
// MEJORAS DE ACCESIBILIDAD
// ===========================

// Focus trap en el carrito
cartPanel.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const focusableElements = cartPanel.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// Anunciar cambios para lectores de pantalla
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ===========================
// INICIALIZACIÓN
// ===========================

console.log('%c🛍️ Sistema de Productos Cargado', 
    'color: #00b894; font-size: 16px; font-weight: bold;');

// Verificar si hay productos en el carrito al cargar
if (cart.length > 0) {
    showNotification(`Tienes ${cart.length} producto(s) en tu carrito`, 'info');
}

// Agregar estilos para las animaciones de notificaciones
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(notificationStyles);

// Prevenir que el formulario se envíe si existe
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
});

// Guardar scroll position
let scrollPosition = 0;

cartButton.addEventListener('click', () => {
    scrollPosition = window.pageYOffset;
});

cartClose.addEventListener('click', () => {
    window.scrollTo(0, scrollPosition);
});