# 🐾 VetCare Plus - Sistema Web para Veterinaria

<div align="center">

![VetCare Plus Logo](https://img.shields.io/badge/VetCare-Plus-00b894?style=for-the-badge&logo=paw&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Sistema web completo y profesional para clínicas veterinarias**

[Ver Demo](#) | [Reportar Bug](../../issues) | [Solicitar Feature](../../issues)

</div>

---

## 📋 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Características](#-características)
- [Tecnologías](#️-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Funcionalidades Destacadas](#-funcionalidades-destacadas)
- [Roadmap](#-roadmap)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## 🎯 Sobre el Proyecto

**VetCare Plus** es un sistema web moderno y completo diseñado para clínicas veterinarias. Ofrece una experiencia de usuario intuitiva tanto para clientes como para el personal administrativo, con funcionalidades que van desde la gestión de citas hasta un sistema de e-commerce para productos veterinarios.

### Características Principales

- **Página de Inicio** atractiva con información clave
- **Sistema de Servicios** con filtros y planes personalizados
- **Tienda de Productos** con carrito de compras funcional
- **Presentación del Equipo** con tarjetas interactivas 3D
- **Formularios de Contacto** con validación en tiempo real
- **FAQ Flotante** disponible en todas las páginas
- **Diseño 100% Responsive** para todos los dispositivos

---

## 📸 Capturas de Pantalla

### Página de Inicio
<img width="1920" height="876" alt="image" src="https://github.com/user-attachments/assets/f9eff10f-af67-46ec-bee6-3b78be923f73" />

> Hero section con llamado a la acción y estadísticas animadas

<img width="1717" height="866" alt="image" src="https://github.com/user-attachments/assets/fd917d37-007d-4d6e-83c1-63fb7fe34a26" />

> Sección de servicios destacados con tarjetas modernas

### Servicios
<img width="1705" height="874" alt="image" src="https://github.com/user-attachments/assets/499bfc40-9b09-482e-8486-33aa44a0c2b6" />

> Sistema completo de servicios con filtros por categoría

### Productos
<img width="1749" height="879" alt="image" src="https://github.com/user-attachments/assets/793685df-e555-430d-ae09-08983842103e" />

> Catálogo de productos con sistema de búsqueda y filtros

<img width="1716" height="865" alt="image" src="https://github.com/user-attachments/assets/57d1749a-a8d6-43a9-b122-edc11ef03d18" />

> Carrito de compras con control de cantidad y cálculo de total

### Equipo
<img width="1752" height="869" alt="image" src="https://github.com/user-attachments/assets/1d62aa4f-7d0f-4128-83f8-79db3e9fbbde" />

> Presentación del equipo veterinario con tarjetas interactivas

### Contacto
<img width="1682" height="872" alt="image" src="https://github.com/user-attachments/assets/50438557-ad88-4fd3-a505-bfbdbadfad91" />

> Formulario de contacto con validación en tiempo real

<img width="1734" height="864" alt="image" src="https://github.com/user-attachments/assets/9e054129-1f99-438f-b205-3c4427b58bbe" />

> Panel de preguntas frecuentes flotante

---

## ⚡ Características

### Diseño y UI/UX
- Interfaz moderna con gradientes y animaciones fluidas
- Paleta de colores profesional y atractiva
- Tipografía clara y legible
- Iconos de Font Awesome para mejor experiencia visual
- Efectos parallax y hover interactivos
- Transiciones suaves entre secciones

### Responsive Design
- Adaptable a dispositivos móviles, tablets y desktop
- Menú hamburguesa funcional en móviles
- Imágenes optimizadas para diferentes resoluciones
- Grid system flexible

### Funcionalidades
- **Sistema de Filtrado**: Productos, servicios y equipo
- **Búsqueda en Tiempo Real**: En múltiples secciones
- **Carrito de Compras**: Con localStorage persistente
- **Validación de Formularios**: En tiempo real con mensajes claros
- **FAQ Flotante**: Accesible desde cualquier página
- **Animaciones de Scroll**: Elementos que aparecen al hacer scroll
- **Contador Animado**: Para estadísticas y números
- **Slider de Testimonios**: Con auto-play

### Seguridad y Validación
- Validación de emails con regex
- Validación de teléfonos
- Sanitización de inputs
- Prevención de spam con limitación de envíos
- Autoguardado de formularios en localStorage

---

## Tecnologías

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con Flexbox y Grid
- **JavaScript (ES6+)**: Funcionalidad interactiva

### Librerías y Recursos
- **Font Awesome 6.4.0**: Iconografía
- **Google Fonts**: Tipografías
- **Unsplash**: Imágenes de alta calidad
- **Pravatar**: Avatares para el equipo

### Herramientas de Desarrollo
- **Git & GitHub**: Control de versiones
- **VS Code**: Editor de código
- **Chrome DevTools**: Debugging y testing

---

## 📁 Estructura del Proyecto
```
veterinaria/
│
├── index.html              # Página principal
├── servicios.html          # Catálogo de servicios
├── productos.html          # Tienda de productos
├── equipo.html             # Presentación del equipo
├── contacto.html           # Formularios de contacto
│
├── css/
│   └── styles.css          # Estilos principales (todo en uno)
│
├── js/
│   ├── main.js             # Funcionalidades globales
│   ├── validaciones.js     # Sistema de validación
│   ├── servicios.js        # Lógica de servicios
│   ├── productos.js        # Carrito y productos
│   ├── equipo.js           # Funcionalidad del equipo
│   └── contacto.js         # Gestión de formularios
│
├── assets/
│   └── img/                # Imágenes del proyecto
│
└── README.md               # Documentación
```

---

## Instalación

### Prerrequisitos

No requiere instalación de dependencias. Solo necesitas un navegador web moderno.

### Pasos de Instalación

1. **Clona el repositorio**
```bash
   git clone https://github.com/tu-usuario/vetcare-plus.git
```

2. **Navega al directorio**
```bash
   cd vetcare-plus
```

3. **Abre el proyecto**
   - Opción 1: Abre `index.html` directamente en tu navegador
   - Opción 2: Usa Live Server en VS Code
   - Opción 3: Usa un servidor local
```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js (si tienes http-server)
   npx http-server
```

4. **Visita en tu navegador**
```
   http://localhost:8000
```

---

## 💻 Uso

### Para Usuarios Finales

1. **Explorar Servicios**: Navega por los diferentes servicios ofrecidos
2. **Ver Productos**: Explora el catálogo y agrega productos al carrito
3. **Conocer el Equipo**: Haz hover sobre las tarjetas para ver más información
4. **Agendar Cita**: Completa el formulario de contacto
5. **Consultar FAQ**: Haz clic en el botón flotante de preguntas frecuentes

### Para Desarrolladores

#### Personalizar Colores
Edita las variables CSS en `styles.css`:
```css
:root {
    --primary-color: #00b894;
    --secondary-color: #00cec9;
    --accent-color: #fd79a8;
    /* Cambia estos valores según tu marca */
}
```

#### Agregar Nuevos Productos
En `productos.html`, duplica una tarjeta de producto:
```html

    

```

#### Modificar Formularios
Edita `contacto.html` y actualiza `js/contacto.js` según necesites.

---

## Funcionalidades Destacadas

### 1. Carrito de Compras con localStorage
```javascript
// El carrito persiste entre sesiones del navegador
cart = JSON.parse(localStorage.getItem('vetcare_cart')) || [];
```

### 2. Validación en Tiempo Real
```javascript
// Validación instantánea mientras el usuario escribe
input.addEventListener('blur', () => validarCampo(input));
```

### 3. Sistema de Filtrado Dinámico
```javascript
// Filtra productos por categoría sin recargar la página
filterProducts(category);
```

### 4. Tarjetas con Efecto Flip 3D
```css
.team-card:hover .team-card-inner {
    transform: rotateY(180deg);
}
```

### 5. FAQ Flotante
- Accesible desde cualquier página
- Búsqueda en tiempo real
- Animaciones suaves

---

## Roadmap

### Versión Actual (v1.0)
- [x] Diseño responsive completo
- [x] Sistema de productos con carrito
- [x] Formularios con validación
- [x] FAQ interactivo
- [x] Animaciones y transiciones

### Próximas Funcionalidades (v2.0)
- [ ] Integración con EmailJS para formularios funcionales (Puede variar)
- [ ] Backend con Node.js y MongoDB 
- [ ] Sistema de autenticación de usuarios
- [ ] Panel de administración
- [ ] Pasarela de pagos (Stripe)
- [ ] Sistema de reservas en tiempo real
- [ ] Notificaciones por email y SMS
- [ ] PWA (Progressive Web App)
- [ ] Modo oscuro

### Futuras Mejoras (v3.0)
- [ ] App móvil nativa (React Native)
- [ ] Sistema de recordatorios automáticos
- [ ] Historial médico de mascotas
- [ ] Integración con calendario de Google
- [ ] Sistema de facturación electrónica
- [ ] Multi-idioma (i18n)

---

## Contribuir

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto:

1. **Fork** el proyecto
2. Crea una **rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### Guías de Contribución

- Mantén el código limpio y comentado
- Sigue las convenciones de nomenclatura existentes
- Actualiza la documentación si es necesario
- Prueba tus cambios en diferentes navegadores

---

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
```
MIT License

Copyright (c) 2025 Adrián Coello

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## Contacto

**Adrián Coello**

- GitHub: [@Vico0711](https://github.com/Vico0711)
- Email: adriax455@gmail.com

---

## Agradecimientos

- [Font Awesome](https://fontawesome.com/) por los iconos
- [Unsplash](https://unsplash.com/) por las imágenes de alta calidad
- [Pravatar](https://pravatar.cc/) por los avatares
- Inspiración en diseños modernos de [Dribbble](https://dribbble.com/)
- 
---

## Estado del Proyecto

![Estado](https://img.shields.io/badge/Estado-Completo-success?style=for-the-badge)
![Versión](https://img.shields.io/badge/Versión-1.0.0-blue?style=for-the-badge)
![Licencia](https://img.shields.io/badge/Licencia-MIT-green?style=for-the-badge)

**Última actualización:** Diciembre 2025

---

<div align="center">

### ⭐ Si te gustó este proyecto, dale una estrella en GitHub

**Hecho con ❤️ y ☕ para la comunidad de desarrolladores**

</div>
```
