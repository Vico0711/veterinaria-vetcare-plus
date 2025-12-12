// ===========================
// EQUIPO - FUNCIONALIDAD
// ===========================

// Variables globales
const specialtyButtons = document.querySelectorAll('.specialty-btn');
const teamCards = document.querySelectorAll('.team-card');
const teamStats = document.querySelectorAll('.team-stats .stat-number');

// ===========================
// FILTRADO POR ESPECIALIDAD
// ===========================

specialtyButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Actualizar botones activos
        specialtyButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const specialty = this.getAttribute('data-specialty');
        filterTeamMembers(specialty);
        
        // Scroll suave
        const teamSection = document.querySelector('.team-section');
        teamSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

function filterTeamMembers(specialty) {
    let visibleCount = 0;
    
    teamCards.forEach((card, index) => {
        const cardSpecialties = card.getAttribute('data-specialty');
        
        if (specialty === 'todos' || cardSpecialties.includes(specialty)) {
            card.classList.remove('hidden');
            visibleCount++;
            
            // Reanimación escalonada
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            }, index * 100);
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Log de resultados
    console.log(`Mostrando ${visibleCount} miembro(s) del equipo con especialidad: ${specialty}`);
}

// ===========================
// ANIMACIÓN DE ESTADÍSTICAS
// ===========================

const statsObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const animateStats = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalNumber = parseInt(target.getAttribute('data-target'));
            const duration = 2000;
            const increment = finalNumber / (duration / 16);
            let current = 0;

            const updateNumber = () => {
                current += increment;
                if (current < finalNumber) {
                    target.textContent = Math.floor(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    target.textContent = finalNumber;
                    // Agregar símbolo + si es necesario
                    if (finalNumber >= 10) {
                        target.textContent = finalNumber + '+';
                    }
                }
            };

            updateNumber();
            observer.unobserve(target);
        }
    });
};

const statsObserver = new IntersectionObserver(animateStats, statsObserverOptions);

teamStats.forEach(stat => {
    statsObserver.observe(stat);
});

// ===========================
// FLIP DE TARJETAS (TÁCTIL)
// ===========================

// Para dispositivos táctiles, agregar funcionalidad de tap para voltear
if ('ontouchstart' in window) {
    teamCards.forEach(card => {
        let isFlipped = false;
        
        card.addEventListener('click', function(e) {
            // Prevenir flip si se hace clic en botones o enlaces
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                return;
            }
            
            isFlipped = !isFlipped;
            
            if (isFlipped) {
                this.classList.add('flipped');
            } else {
                this.classList.remove('flipped');
            }
        });
    });
}

// ===========================
// VISTA RÁPIDA DE PERFIL
// ===========================

document.querySelectorAll('.view-profile-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const card = this.closest('.team-card');
        card.classList.add('flipped');
        
        // Forzar el flip
        const inner = card.querySelector('.team-card-inner');
        inner.style.transform = 'rotateY(180deg)';
        
        // Resetear después de un tiempo si no es dispositivo táctil
        if (!('ontouchstart' in window)) {
            setTimeout(() => {
                inner.style.transform = '';
            }, 5000);
        }
    });
});

// ===========================
// EFECTO PARALLAX EN IMÁGENES
// ===========================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const teamImages = document.querySelectorAll('.team-image img');
    
    teamImages.forEach((img, index) => {
        const rect = img.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.top > -rect.height) {
            const speed = 0.2;
            const yPos = -(scrolled * speed / (index + 3));
            img.style.transform = `translateY(${yPos}px) scale(1.1)`;
        }
    });
});

// ===========================
// INDICADOR DE FLIP
// ===========================

function addFlipIndicators() {
    teamCards.forEach(card => {
        const front = card.querySelector('.team-card-front');
        
        if (!front.querySelector('.flip-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'flip-indicator';
            indicator.innerHTML = '<i class="fas fa-sync-alt"></i>';
            indicator.title = 'Haz hover para ver más información';
            front.appendChild(indicator);
        }
    });
}

// Agregar indicadores solo en desktop
if (!('ontouchstart' in window)) {
    addFlipIndicators();
}

// ===========================
// ANIMACIÓN DE VALORES
// ===========================

const valuesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.value-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    valuesObserver.observe(card);
});

// ===========================
// BÚSQUEDA DE MIEMBROS
// ===========================

function createSearchBar() {
    const filterSection = document.querySelector('.team-filters .container');
    
    const searchHTML = `
        <div class="team-search" style="
            max-width: 500px;
            margin: 2rem auto 0;
            position: relative;
        ">
            <i class="fas fa-search" style="
                position: absolute;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
                color: var(--text-light);
            "></i>
            <input type="text" id="teamSearch" placeholder="Buscar por nombre o especialidad..." style="
                width: 100%;
                padding: 1rem 1rem 1rem 3rem;
                border: 2px solid var(--light-color);
                border-radius: 30px;
                font-size: 1rem;
                transition: var(--transition);
            ">
        </div>
    `;
    
    filterSection.insertAdjacentHTML('beforeend', searchHTML);
    
    const searchInput = document.getElementById('teamSearch');
    
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
        let visibleCount = 0;
        
        teamCards.forEach(card => {
            const name = card.querySelector('.team-name').textContent.toLowerCase();
            const role = card.querySelector('.team-role').textContent.toLowerCase();
            const specialties = card.querySelectorAll('.specialty-tag');
            let specialtiesText = '';
            
            specialties.forEach(tag => {
                specialtiesText += tag.textContent.toLowerCase() + ' ';
            });
            
            if (name.includes(searchTerm) || 
                role.includes(searchTerm) || 
                specialtiesText.includes(searchTerm) ||
                searchTerm === '') {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Mensaje si no hay resultados
        let noResultsMsg = document.querySelector('.no-team-results');
        
        if (visibleCount === 0 && searchTerm !== '') {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-team-results';
                noResultsMsg.style.cssText = `
                    text-align: center;
                    padding: 3rem;
                    color: var(--text-light);
                    grid-column: 1 / -1;
                `;
                noResultsMsg.innerHTML = `
                    <i class="fas fa-user-slash" style="font-size: 3rem; color: var(--light-color); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--dark-color); margin-bottom: 0.5rem;">No se encontraron miembros</h3>
                    <p>Intenta con otro término de búsqueda</p>
                `;
                document.querySelector('.team-grid').appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
        
        // Reset filtros si hay búsqueda
        if (searchTerm !== '') {
            specialtyButtons.forEach(btn => btn.classList.remove('active'));
            specialtyButtons[0].classList.add('active');
        }
    });
}

// Inicializar búsqueda
createSearchBar();

// ===========================
// INTERACCIÓN CON REDES SOCIALES
// ===========================

document.querySelectorAll('.team-social a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Si es un enlace de teléfono, no prevenir default
        if (href.startsWith('tel:')) {
            return;
        }
        
        e.preventDefault();
        
        // Obtener el tipo de red social
        const icon = this.querySelector('i');
        let network = 'contacto';
        
        if (icon.classList.contains('fa-linkedin')) {
            network = 'LinkedIn';
        } else if (icon.classList.contains('fa-envelope')) {
            network = 'Email';
        } else if (icon.classList.contains('fa-phone')) {
            network = 'Teléfono';
        }
        
        showNotification(`Abriendo ${network}...`, 'info');
        
        // En un sistema real, aquí iría la lógica de contacto
        setTimeout(() => {
            console.log(`Contactando vía ${network}`);
        }, 500);
    });
});

// ===========================
// TOOLTIPS INFORMATIVOS
// ===========================

function addTooltips() {
    teamCards.forEach(card => {
        const rating = card.querySelector('.team-rating');
        const ratingValue = rating.querySelector('span').textContent;
        
        rating.setAttribute('title', `Calificación promedio: ${ratingValue}`);
        
        // Tooltip para especialidades
        const specialtyTags = card.querySelectorAll('.specialty-tag');
        specialtyTags.forEach(tag => {
            tag.setAttribute('title', `Especialidad: ${tag.textContent}`);
        });
    });
}

addTooltips();

// ===========================
// CONTADOR DE MIEMBROS VISIBLES
// ===========================

function updateTeamCount() {
    const visibleTeam = document.querySelectorAll('.team-card:not(.hidden)').length;
    const totalTeam = teamCards.length;
    
    console.log(`Mostrando ${visibleTeam} de ${totalTeam} miembros del equipo`);
}

// Actualizar contador al filtrar
specialtyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        setTimeout(updateTeamCount, 100);
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
// EFECTO DE HOVER MEJORADO
// ===========================

teamCards.forEach(card => {
    const inner = card.querySelector('.team-card-inner');
    
    card.addEventListener('mouseenter', function() {
        // Efecto de elevación
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
        
        // Resetear flip en dispositivos no táctiles
        if (!('ontouchstart' in window)) {
            setTimeout(() => {
                inner.style.transform = '';
                this.classList.remove('flipped');
            }, 300);
        }
    });
});

// ===========================
// DETECCIÓN DE INACTIVIDAD EN FLIP
// ===========================

let flipTimeout;

teamCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        clearTimeout(flipTimeout);
    });
    
    card.addEventListener('mouseleave', function() {
        const inner = this.querySelector('.team-card-inner');
        
        flipTimeout = setTimeout(() => {
            inner.style.transform = '';
            this.classList.remove('flipped');
        }, 3000);
    });
});

// ===========================
// ACCESIBILIDAD
// ===========================

// Navegación por teclado en tarjetas
teamCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.classList.toggle('flipped');
            
            const inner = this.querySelector('.team-card-inner');
            if (this.classList.contains('flipped')) {
                inner.style.transform = 'rotateY(180deg)';
            } else {
                inner.style.transform = '';
            }
        }
    });
});

// ===========================
// ANIMACIÓN SECUENCIAL DE ENTRADA
// ===========================

function animateTeamCardsOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    teamCards.forEach(card => {
        observer.observe(card);
    });
}

// Ejecutar después de que todo cargue
window.addEventListener('load', animateTeamCardsOnScroll);

// ===========================
// ESTADÍSTICAS DEL EQUIPO
// ===========================

function logTeamStats() {
    const totalMembers = teamCards.length;
    const specialties = new Set();
    
    teamCards.forEach(card => {
        const tags = card.querySelectorAll('.specialty-tag');
        tags.forEach(tag => specialties.add(tag.textContent));
    });
    
    console.log('%c👥 Estadísticas del Equipo', 'color: #00b894; font-size: 16px; font-weight: bold;');
    console.log(`Total de miembros: ${totalMembers}`);
    console.log(`Especialidades disponibles: ${specialties.size}`);
    console.log(`Lista de especialidades:`, Array.from(specialties).join(', '));
}

// Ejecutar estadísticas
logTeamStats();

// ===========================
// PREVENCIÓN DE COMPORTAMIENTOS NO DESEADOS
// ===========================

// Prevenir selección de texto durante el flip
document.addEventListener('selectstart', function(e) {
    if (e.target.closest('.team-card-inner')) {
        if (e.target.closest('.team-card').matches(':hover')) {
            e.preventDefault();
        }
    }
});

// ===========================
// LAZY LOADING DE IMÁGENES
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.team-image img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// INICIALIZACIÓN
// ===========================

console.log('%c👨‍⚕️ Sistema de Equipo Cargado', 
    'color: #00b894; font-size: 16px; font-weight: bold;');

// Contador inicial
updateTeamCount();

// Mensaje de bienvenida
setTimeout(() => {
    showNotification('Conoce a nuestro equipo profesional', 'success');
}, 1000);

// ===========================
// EFECTO DE PARTICULAS EN HOVER (OPCIONAL)
// ===========================

function createParticleEffect(card) {
    const particles = 5;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 5px;
            height: 5px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
        `;
        
        card.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / particles;
        const velocity = 2;
        
        let x = 50;
        let y = 50;
        let opacity = 1;
        
        function animate() {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity;
            opacity -= 0.02;
            
            particle.style.left = x + '%';
            particle.style.top = y + '%';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        animate();
    }
}

// Activar partículas en hover (opcional - comentado por defecto)
teamCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        createParticleEffect(this);
    });
});