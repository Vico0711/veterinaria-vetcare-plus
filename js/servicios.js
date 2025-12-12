// ===========================
// SERVICIOS - FUNCIONALIDAD
// ===========================

// Sistema de filtrado de servicios
const filterButtons = document.querySelectorAll('.filter-btn');
const serviceCards = document.querySelectorAll('.service-card-full');

// Función para filtrar servicios
function filterServices(category) {
    serviceCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'todos' || cardCategory === category) {
            card.classList.remove('hidden');
            // Animación escalonada
            setTimeout(() => {
                card.style.animation = 'fadeInScale 0.5s ease forwards';
            }, index * 100);
        } else {
            card.classList.add('hidden');
        }
    });
}

// Event listeners para botones de filtro
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remover clase active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Agregar clase active al botón clickeado
        this.classList.add('active');
        
        // Obtener la categoría del botón
        const category = this.getAttribute('data-filter');
        
        // Filtrar servicios
        filterServices(category);
        
        // Scroll suave hacia los servicios
        const servicesSection = document.querySelector('.services-section');
        const offset = 100; // Offset para el sticky header
        const elementPosition = servicesSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Animación de contador en los precios
function animatePrice(element) {
    const target = parseInt(element.textContent.replace('$', ''));
    let current = 0;
    const increment = target / 50;
    const duration = 1000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = '$' + target;
            clearInterval(timer);
        } else {
            element.textContent = '$' + Math.floor(current);
        }
    }, stepTime);
}

// Observer para animar precios cuando aparecen en pantalla
const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            animatePrice(entry.target);
            entry.target.classList.add('animated');
        }
    });
}, {
    threshold: 0.5
});

// Observar todos los precios
document.querySelectorAll('.price').forEach(price => {
    priceObserver.observe(price);
});

// Efecto parallax suave en imágenes de servicio
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const serviceImages = document.querySelectorAll('.service-image img');
    
    serviceImages.forEach((img, index) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed / (index + 2));
        img.style.transform = `translateY(${yPos}px) scale(1.1)`;
    });
});

// Tooltip para las características de los servicios
const serviceFeatures = document.querySelectorAll('.service-features li');

serviceFeatures.forEach(feature => {
    feature.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(0, 184, 148, 0.05)';
        this.style.paddingLeft = '10px';
    });
    
    feature.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
        this.style.paddingLeft = '0';
    });
});

// Efecto de revelación progresiva para planes
const planObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
            planObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.plan-card').forEach(plan => {
    plan.style.opacity = '0';
    plan.style.transform = 'translateY(30px)';
    plan.style.transition = 'all 0.6s ease';
    planObserver.observe(plan);
});

// Búsqueda rápida de servicios (opcional)
function createSearchBar() {
    const searchHTML = `
        <div class="services-search" style="
            max-width: 500px;
            margin: 0 auto 2rem;
            position: relative;
        ">
            <i class="fas fa-search" style="
                position: absolute;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
                color: var(--text-light);
            "></i>
            <input type="text" id="serviceSearch" placeholder="Buscar servicio..." style="
                width: 100%;
                padding: 1rem 1rem 1rem 3rem;
                border: 2px solid var(--light-color);
                border-radius: 30px;
                font-size: 1rem;
                transition: var(--transition);
            ">
        </div>
    `;
    
    const servicesSection = document.querySelector('.services-section .container');
    servicesSection.insertAdjacentHTML('afterbegin', searchHTML);
    
    const searchInput = document.getElementById('serviceSearch');
    
    searchInput.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary-color)';
        this.style.boxShadow = '0 0 0 3px rgba(0, 184, 148, 0.1)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.style.borderColor = 'var(--light-color)';
        this.style.boxShadow = 'none';
    });
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        serviceCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.service-description').textContent.toLowerCase();
            const category = card.getAttribute('data-category');
            
            if (title.includes(searchTerm) || 
                description.includes(searchTerm) || 
                category.includes(searchTerm) ||
                searchTerm === '') {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
}

// Inicializar búsqueda (opcional, descomenta si deseas activarla)
createSearchBar();

// Smooth scroll para botones de agendar
document.querySelectorAll('.service-footer .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.getAttribute('href') === 'contacto.html') {
            // El comportamiento por defecto de navegación funcionará normalmente
        }
    });
});

// Animación de "sacudida" para el botón de emergencias
const emergencyBtn = document.querySelector('.emergency-btn');
if (emergencyBtn) {
    setInterval(() => {
        emergencyBtn.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            emergencyBtn.style.animation = '';
        }, 500);
    }, 5000);
}

// Agregar animación shake al CSS dinámicamente
const shakeAnimation = document.createElement('style');
shakeAnimation.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeAnimation);

// Log de confirmación
console.log('%c🏥 Página de Servicios Cargada', 
    'color: #00b894; font-size: 16px; font-weight: bold;');

// Contador de servicios visibles
function updateServiceCount() {
    const visibleServices = document.querySelectorAll('.service-card-full:not(.hidden)').length;
    console.log(`Servicios visibles: ${visibleServices}`);
}

// Actualizar contador cuando cambia el filtro
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        setTimeout(updateServiceCount, 100);
    });
});

// Inicializar contador
updateServiceCount();