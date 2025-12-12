// ===========================
// CONTACTO - FUNCIONALIDAD
// ===========================

// Variables globales
const formTabs = document.querySelectorAll('.form-tab');
const contactForms = document.querySelectorAll('.contact-form');
const appointmentForm = document.getElementById('appointmentForm');
const consultationForm = document.getElementById('consultationForm');
const emergencyForm = document.getElementById('emergencyForm');

// ===========================
// SISTEMA DE TABS
// ===========================

formTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // Remover active de todos los tabs
        formTabs.forEach(t => t.classList.remove('active'));
        
        // Agregar active al tab clickeado
        this.classList.add('active');
        
        // Obtener el formulario correspondiente
        const formType = this.getAttribute('data-tab');
        
        // Ocultar todos los formularios
        contactForms.forEach(form => form.classList.remove('active'));
        
        // Mostrar el formulario correspondiente
        let activeForm;
        if (formType === 'cita') {
            activeForm = appointmentForm;
        } else if (formType === 'consulta') {
            activeForm = consultationForm;
        } else if (formType === 'emergencia') {
            activeForm = emergencyForm;
        }
        
        if (activeForm) {
            activeForm.classList.add('active');
        }
        
        // Resetear el formulario anterior
        contactForms.forEach(form => {
            if (!form.classList.contains('active')) {
                form.reset();
                limpiarErrores(form);
            }
        });
    });
});

// ===========================
// VALIDACIÓN EN TIEMPO REAL
// ===========================

// Aplicar validación a todos los inputs
document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea').forEach(input => {
    // Validación al perder el foco
    input.addEventListener('blur', function() {
        validarCampo(this);
    });
    
    // Limpiar error al escribir
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            limpiarError(this);
        }
    });
});

// Función para validar un campo individual
function validarCampo(campo) {
    const valor = campo.value.trim();
    const tipo = campo.type;
    const nombre = campo.name;
    let esValido = true;
    let mensaje = '';
    
    // Validar campo requerido
    if (campo.hasAttribute('required') && valor === '') {
        esValido = false;
        mensaje = 'Este campo es obligatorio';
    }
    
    // Validar email
    if (tipo === 'email' && valor !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(valor)) {
            esValido = false;
            mensaje = 'Por favor, ingresa un email válido';
        }
    }
    
    // Validar teléfono
    if (tipo === 'tel' && valor !== '') {
        const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
        if (!phoneRegex.test(valor)) {
            esValido = false;
            mensaje = 'Por favor, ingresa un teléfono válido';
        }
    }
    
    // Validar fecha
    if (tipo === 'date' && valor !== '') {
        const fechaSeleccionada = new Date(valor);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        if (fechaSeleccionada < hoy) {
            esValido = false;
            mensaje = 'La fecha no puede ser anterior a hoy';
        }
    }
    
    // Validar textarea
    if (campo.tagName === 'TEXTAREA' && valor !== '' && valor.length < 10) {
        esValido = false;
        mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    // Mostrar u ocultar error
    if (!esValido) {
        mostrarError(campo, mensaje);
    } else {
        limpiarError(campo);
        if (valor !== '') {
            campo.classList.add('success');
        }
    }
    
    return esValido;
}

// Función para mostrar error
function mostrarError(campo, mensaje) {
    const formGroup = campo.parentElement;
    
    // Remover mensaje de error previo
    const errorPrevio = formGroup.querySelector('.error-message');
    if (errorPrevio) {
        errorPrevio.remove();
    }
    
    // Agregar clase de error
    campo.classList.add('error');
    campo.classList.remove('success');
    
    // Crear mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${mensaje}`;
    
    formGroup.appendChild(errorDiv);
}

// Función para limpiar error
function limpiarError(campo) {
    const formGroup = campo.parentElement;
    const errorMsg = formGroup.querySelector('.error-message');
    
    if (errorMsg) {
        errorMsg.remove();
    }
    
    campo.classList.remove('error');
}

// Función para limpiar todos los errores de un formulario
function limpiarErrores(form) {
    form.querySelectorAll('.error-message').forEach(msg => msg.remove());
    form.querySelectorAll('.error').forEach(campo => campo.classList.remove('error'));
    form.querySelectorAll('.success').forEach(campo => campo.classList.remove('success'));
}

// ===========================
// ENVÍO DE FORMULARIOS
// ===========================

// Formulario de Cita
appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validarFormulario(this)) {
        enviarFormulario(this, 'cita');
    }
});

// Formulario de Consulta
consultationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validarFormulario(this)) {
        enviarFormulario(this, 'consulta');
    }
});

// Formulario de Emergencia
emergencyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validarFormulario(this)) {
        enviarFormulario(this, 'emergencia');
    }
});

// Función para validar formulario completo
function validarFormulario(form) {
    let esValido = true;
    
    // Validar todos los campos requeridos
    form.querySelectorAll('[required]').forEach(campo => {
        if (!validarCampo(campo)) {
            esValido = false;
        }
    });
    
    // Scroll al primer error
    if (!esValido) {
        const primerError = form.querySelector('.error');
        if (primerError) {
            primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            primerError.focus();
        }
    }
    
    return esValido;
}

// Función para enviar formulario
function enviarFormulario(form, tipo) {
    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.innerHTML;
    
    // Estado de carga
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Recopilar datos del formulario
    const formData = new FormData(form);
    const datos = {};
    formData.forEach((value, key) => {
        datos[key] = value;
    });
    
    // Simular envío (en producción, aquí iría la llamada a la API)
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = btnText;
        submitBtn.disabled = false;
        
        // Mostrar modal de éxito
        mostrarModalExito(tipo);
        
        // Resetear formulario
        form.reset();
        limpiarErrores(form);
        
        // Log de datos (en producción, esto se enviaría al servidor)
        console.log('Datos del formulario enviados:', datos);
        
    }, 2000);
}

// ===========================
// MODAL DE ÉXITO
// ===========================

function mostrarModalExito(tipo) {
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    
    let titulo = '';
    let mensaje = '';
    
    switch(tipo) {
        case 'cita':
            titulo = '¡Cita Agendada!';
            mensaje = 'Tu solicitud de cita ha sido recibida. Nos pondremos en contacto contigo pronto para confirmar la fecha y hora.';
            break;
        case 'consulta':
            titulo = '¡Consulta Enviada!';
            mensaje = 'Hemos recibido tu consulta. Te responderemos en un plazo máximo de 24 horas.';
            break;
        case 'emergencia':
            titulo = '¡Formulario Enviado!';
            mensaje = 'Hemos recibido tu reporte de emergencia. Si necesitas atención inmediata, por favor llama al +593 99 123 4567.';
            break;
    }
    
    modal.innerHTML = `
        <div class="success-modal-content">
            <div class="success-icon">
                <i class="fas fa-check"></i>
            </div>
            <h3>${titulo}</h3>
            <p>${mensaje}</p>
            <button class="btn btn-primary close-modal">Entendido</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Mostrar modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 100);
    
    // Cerrar modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });
}

// ===========================
// FORMATEO AUTOMÁTICO
// ===========================

// Formatear teléfono
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function() {
        let valor = this.value.replace(/\D/g, '');
        
        if (valor.length > 0) {
            if (valor.length <= 3) {
                valor = valor;
            } else if (valor.length <= 6) {
                valor = valor.slice(0, 3) + ' ' + valor.slice(3);
            } else {
                valor = valor.slice(0, 3) + ' ' + valor.slice(3, 6) + ' ' + valor.slice(6, 10);
            }
        }
        
        this.value = valor;
    });
});

// Capitalizar nombres
document.querySelectorAll('input[name="ownerName"], input[name="petName"], input[name="consultName"], input[name="emergencyName"]').forEach(input => {
    input.addEventListener('blur', function() {
        this.value = this.value
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    });
});

// ===========================
// FECHA MÍNIMA (HOY)
// ===========================

const dateInputs = document.querySelectorAll('input[type="date"]');
const today = new Date().toISOString().split('T')[0];

dateInputs.forEach(input => {
    input.setAttribute('min', today);
});

// ===========================
// CONTADOR DE CARACTERES
// ===========================

document.querySelectorAll('textarea').forEach(textarea => {
    const maxLength = textarea.getAttribute('maxlength') || 1000;
    
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.style.cssText = `
        text-align: right;
        color: var(--text-light);
        font-size: 0.85rem;
        margin-top: 0.5rem;
    `;
    
    textarea.parentElement.appendChild(counter);
    
    function updateCounter() {
        const remaining = maxLength - textarea.value.length;
        counter.textContent = `${textarea.value.length} / ${maxLength} caracteres`;
        
        if (remaining < 50) {
            counter.style.color = '#ff6b6b';
        } else {
            counter.style.color = 'var(--text-light)';
        }
    }
    
    textarea.addEventListener('input', updateCounter);
    updateCounter();
});

// ===========================
// AUTOGUARDADO (OPCIONAL)
// ===========================

let autoSaveTimeout;

function autoGuardarFormulario(form) {
    clearTimeout(autoSaveTimeout);
    
    autoSaveTimeout = setTimeout(() => {
        const formData = new FormData(form);
        const datos = {};
        formData.forEach((value, key) => {
            if (value) {
                datos[key] = value;
            }
        });
        
        if (Object.keys(datos).length > 0) {
            localStorage.setItem(`form_draft_${form.id}`, JSON.stringify(datos));
            console.log('Borrador guardado automáticamente');
        }
    }, 2000);
}

// Aplicar autoguardado
contactForms.forEach(form => {
    form.addEventListener('input', () => {
        autoGuardarFormulario(form);
    });
});

// Cargar borrador al cargar la página
window.addEventListener('load', () => {
    contactForms.forEach(form => {
        const draft = localStorage.getItem(`form_draft_${form.id}`);
        
        if (draft) {
            const datos = JSON.parse(draft);
            
            // Preguntar si quiere recuperar el borrador
            if (confirm('Tienes un borrador guardado. ¿Deseas recuperarlo?')) {
                Object.keys(datos).forEach(key => {
                    const campo = form.querySelector(`[name="${key}"]`);
                    if (campo) {
                        campo.value = datos[key];
                    }
                });
            } else {
                localStorage.removeItem(`form_draft_${form.id}`);
            }
        }
    });
});

// Limpiar borradores al enviar
contactForms.forEach(form => {
    form.addEventListener('submit', () => {
        localStorage.removeItem(`form_draft_${form.id}`);
    });
});

// ===========================
// SUGERENCIAS DE HORARIO
// ===========================

const appointmentDate = document.getElementById('appointmentDate');
const appointmentTime = document.getElementById('appointmentTime');

if (appointmentDate && appointmentTime) {
    appointmentDate.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const dayOfWeek = selectedDate.getDay();
        
        // Si es fin de semana, mostrar sugerencia
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            showNotification('Los fines de semana tenemos horarios especiales. Disponibilidad sujeta a confirmación.', 'info');
        }
    });
}

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
    }, 4000);
}

// ===========================
// ACCESIBILIDAD
// ===========================

// Navegación por teclado en tabs
formTabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
    
    tab.addEventListener('keydown', (e) => {
        let newIndex = index;
        
        if (e.key === 'ArrowRight') {
            newIndex = (index + 1) % formTabs.length;
        } else if (e.key === 'ArrowLeft') {
            newIndex = (index - 1 + formTabs.length) % formTabs.length;
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            tab.click();
            return;
        } else {
            return;
        }
        
        formTabs[newIndex].focus();
        formTabs[newIndex].click();
    });
});

// ===========================
// ANIMACIONES DE ENTRADA
// ===========================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.quick-contact-card, .contact-form-section, .contact-info-section > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===========================
// INTERACCIÓN CON REDES SOCIALES
// ===========================

document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const network = this.classList[1];
        let networkName = network.charAt(0).toUpperCase() + network.slice(1);
        
        showNotification(`Abriendo ${networkName}...`, 'info');
        
        // Aquí iría la lógica para abrir la red social
        setTimeout(() => {
            console.log(`Redirigiendo a ${networkName}`);
        }, 500);
    });
});

// ===========================
// ESTADÍSTICAS Y LOGS
// ===========================

function logContactStats() {
    console.log('%c📞 Sistema de Contacto Cargado', 'color: #00b894; font-size: 16px; font-weight: bold;');
    console.log('Formularios disponibles:', contactForms.length);
    console.log('Campos totales:', document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea').length);
}

logContactStats();

// ===========================
// PREVENCIÓN DE SPAM
// ===========================

let submitAttempts = 0;
const maxAttempts = 5;
const resetTime = 300000; // 5 minutos

contactForms.forEach(form => {
    const originalSubmit = form.onsubmit;
    
    form.addEventListener('submit', function(e) {
        submitAttempts++;
        
        if (submitAttempts > maxAttempts) {
            e.preventDefault();
            showNotification('Has excedido el límite de envíos. Por favor, espera unos minutos.', 'warning');
            return false;
        }
        
        // Resetear contador después de 5 minutos
        setTimeout(() => {
            submitAttempts = 0;
        }, resetTime);
    });
});

// ===========================
// ANIMACIÓN DEL MAPA
// ===========================

const mapContainer = document.querySelector('.map-container');

if (mapContainer) {
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                mapContainer.style.opacity = '1';
                mapContainer.style.transform = 'scale(1)';
                mapObserver.unobserve(mapContainer);
            }
        });
    }, { threshold: 0.3 });
    
    mapContainer.style.opacity = '0';
    mapContainer.style.transform = 'scale(0.95)';
    mapContainer.style.transition = 'all 0.8s ease';
    
    mapObserver.observe(mapContainer);
}

// ===========================
// INICIALIZACIÓN FINAL
// ===========================

console.log('%c✅ Sistema de Contacto Completamente Funcional', 
    'color: #00b894; font-size: 14px; font-weight: bold;');

// Mensaje de bienvenida
setTimeout(() => {
    showNotification('¡Estamos aquí para ayudarte! Completa el formulario y te contactaremos pronto.', 'success');
}, 1500);

// Verificar si hay parámetros en la URL (por ejemplo, desde un enlace directo)
const urlParams = new URLSearchParams(window.location.search);
const formType = urlParams.get('form');

if (formType) {
    const targetTab = document.querySelector(`[data-tab="${formType}"]`);
    if (targetTab) {
        targetTab.click();
        setTimeout(() => {
            targetTab.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    }
}