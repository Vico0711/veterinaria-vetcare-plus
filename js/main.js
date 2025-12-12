// Archivo de validaciones para formularios
// Este archivo se utilizará principalmente en contacto.html

// Función para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para validar teléfono
function validarTelefono(telefono) {
    const regex = /^[\d\s\-\+\(\)]{8,}$/;
    return regex.test(telefono);
}

// Función para validar campos vacíos
function validarCampoVacio(valor) {
    return valor.trim().length > 0;
}

// Función para validar longitud mínima
function validarLongitudMinima(valor, minimo) {
    return valor.trim().length >= minimo;
}

// Función para mostrar mensaje de error
function mostrarError(input, mensaje) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        color: #ff6b6b;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        display: block;
    `;
    errorDiv.textContent = mensaje;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorDiv);
    }
    
    input.style.borderColor = '#ff6b6b';
}

// Función para limpiar mensaje de error
function limpiarError(input) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    input.style.borderColor = '';
}

// Función para validar formulario completo
function validarFormulario(formId) {
    const form = document.getElementById(formId);
    let esValido = true;
    
    // Obtener todos los campos requeridos
    const camposRequeridos = form.querySelectorAll('[required]');
    
    camposRequeridos.forEach(campo => {
        limpiarError(campo);
        
        // Validar campo vacío
        if (!validarCampoVacio(campo.value)) {
            mostrarError(campo, 'Este campo es obligatorio');
            esValido = false;
            return;
        }
        
        // Validar email
        if (campo.type === 'email' && !validarEmail(campo.value)) {
            mostrarError(campo, 'Por favor, ingresa un email válido');
            esValido = false;
            return;
        }
        
        // Validar teléfono
        if (campo.type === 'tel' && !validarTelefono(campo.value)) {
            mostrarError(campo, 'Por favor, ingresa un teléfono válido');
            esValido = false;
            return;
        }
        
        // Validar textarea
        if (campo.tagName === 'TEXTAREA' && !validarLongitudMinima(campo.value, 10)) {
            mostrarError(campo, 'El mensaje debe tener al menos 10 caracteres');
            esValido = false;
            return;
        }
    });
    
    return esValido;
}

// Función para sanitizar input (prevenir XSS básico)
function sanitizarInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Función para formatear teléfono mientras se escribe
function formatearTelefono(input) {
    let valor = input.value.replace(/\D/g, '');
    
    if (valor.length > 0) {
        if (valor.length <= 3) {
            valor = valor;
        } else if (valor.length <= 6) {
            valor = valor.slice(0, 3) + '-' + valor.slice(3);
        } else {
            valor = valor.slice(0, 3) + '-' + valor.slice(3, 6) + '-' + valor.slice(6, 10);
        }
    }
    
    input.value = valor;
}

// Función para validar en tiempo real
function agregarValidacionTiempoReal(input) {
    input.addEventListener('blur', function() {
        limpiarError(this);
        
        if (this.hasAttribute('required') && !validarCampoVacio(this.value)) {
            mostrarError(this, 'Este campo es obligatorio');
        } else if (this.type === 'email' && this.value && !validarEmail(this.value)) {
            mostrarError(this, 'Por favor, ingresa un email válido');
        } else if (this.type === 'tel' && this.value && !validarTelefono(this.value)) {
            mostrarError(this, 'Por favor, ingresa un teléfono válido');
        }
    });
    
    input.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(255, 107, 107)') {
            limpiarError(this);
        }
    });
}

// Función para mostrar notificación de éxito
function mostrarNotificacionExito(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion-exito';
    notificacion.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        display: flex;
        align-items: center;
        gap: 1rem;
    `;
    
    notificacion.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
        <span>${mensaje}</span>
    `;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 500);
    }, 4000);
}

// Función para mostrar notificación de error
function mostrarNotificacionError(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion-error';
    notificacion.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        display: flex;
        align-items: center;
        gap: 1rem;
    `;
    
    notificacion.innerHTML = `
        <i class="fas fa-exclamation-circle" style="font-size: 1.5rem;"></i>
        <span>${mensaje}</span>
    `;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 500);
    }, 4000);
}

// Agregar animaciones CSS necesarias
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);

// Exportar funciones para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validarEmail,
        validarTelefono,
        validarCampoVacio,
        validarLongitudMinima,
        validarFormulario,
        sanitizarInput,
        mostrarError,
        limpiarError,
        agregarValidacionTiempoReal,
        mostrarNotificacionExito,
        mostrarNotificacionError
    };
}

console.log('%c✅ Sistema de Validaciones Cargado', 
    'color: #00b894; font-size: 14px; font-weight: bold;');

// ===========================
// FAQ FLOTANTE - FUNCIONALIDAD
// ===========================

const faqFloatBtn = document.getElementById('faqFloatBtn');
const faqPanel = document.getElementById('faqPanel');
const faqOverlay = document.getElementById('faqOverlay');
const faqClose = document.getElementById('faqClose');
const faqSearch = document.getElementById('faqSearch');
const faqItems = document.querySelectorAll('.faq-item');

// Abrir panel FAQ
faqFloatBtn.addEventListener('click', () => {
    faqPanel.classList.add('active');
    faqOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Cerrar panel FAQ
function cerrarFAQ() {
    faqPanel.classList.remove('active');
    faqOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

faqClose.addEventListener('click', cerrarFAQ);
faqOverlay.addEventListener('click', cerrarFAQ);

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && faqPanel.classList.contains('active')) {
        cerrarFAQ();
    }
});

// Toggle de preguntas
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Cerrar otros items abiertos
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle del item actual
        item.classList.toggle('active');
    });
});

// Búsqueda en tiempo real
faqSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question span').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        const keywords = item.getAttribute('data-keywords').toLowerCase();
        
        // Buscar en pregunta, respuesta y keywords
        if (question.includes(searchTerm) || 
            answer.includes(searchTerm) || 
            keywords.includes(searchTerm) ||
            searchTerm === '') {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
            item.classList.remove('active');
        }
    });
    
    // Mensaje si no hay resultados
    const visibleItems = document.querySelectorAll('.faq-item:not(.hidden)').length;
    let noResultsMsg = document.querySelector('.no-results-msg');
    
    if (visibleItems === 0 && searchTerm !== '') {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-msg';
            noResultsMsg.style.cssText = `
                text-align: center;
                padding: 2rem;
                color: var(--text-light);
            `;
            noResultsMsg.innerHTML = `
                <i class="fas fa-search" style="font-size: 3rem; color: var(--light-color); margin-bottom: 1rem;"></i>
                <p>No se encontraron resultados para "<strong>${searchTerm}</strong>"</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Intenta con otras palabras clave</p>
            `;
            document.querySelector('.faq-items').appendChild(noResultsMsg);
        }
    } else if (noResultsMsg) {
        noResultsMsg.remove();
    }
});

// Limpiar búsqueda al cerrar panel
faqClose.addEventListener('click', () => {
    faqSearch.value = '';
    faqItems.forEach(item => {
        item.classList.remove('hidden');
        item.classList.remove('active');
    });
});

// Efecto de resaltado al buscar
faqSearch.addEventListener('focus', () => {
    faqSearch.parentElement.style.transform = 'scale(1.02)';
});

faqSearch.addEventListener('blur', () => {
    faqSearch.parentElement.style.transform = 'scale(1)';
});

console.log('%c❓ Sistema FAQ Cargado', 
    'color: #00b894; font-size: 14px; font-weight: bold;');

// ===========================
// MENÚ HAMBURGUESA
// ===========================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.querySelector('.navbar');

// Verificar que los elementos existen
if (menuToggle && navMenu) {
    
    // Toggle del menú
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevenir que el click se propague
        
        // Toggle de la clase active
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Prevenir scroll cuando el menú está abierto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        // Animación del icono hamburguesa
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Resetear animación del icono
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        });
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'rotate(0) translate(0, 0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0) translate(0, 0)';
            }
        }
    });
    
    // Cerrar menú con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });
    
} else {
    console.error('⚠️ No se encontraron los elementos del menú móvil');
}