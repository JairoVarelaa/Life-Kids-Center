document.addEventListener('DOMContentLoaded', () => {

    const loader = document.getElementById('loading-overlay'); // Referencia al loader
    const submitBtn = document.querySelector('.btn-submit'); // Referencia al botón

    // 1. Reveal al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 2. Lógica del carrusel
    const track = document.getElementById('track');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (track && nextBtn && prevBtn) {
        nextBtn.onclick = () => {
            const width = track.querySelector('.carousel-item').offsetWidth + 20;
            track.scrollLeft += width;
        };
        prevBtn.onclick = () => {
            const width = track.querySelector('.carousel-item').offsetWidth + 20;
            track.scrollLeft -= width;
        };
    }

    // 3. Formulario
    const form = document.getElementById('contact-form');
    // Dentro de tu evento 'submit', antes de enviar:
    
    if (form) {
        
        form.addEventListener('submit', async function(e) {
            
            e.preventDefault();

            // 1. ACTIVAR MODO "CARGANDO" INMEDIATAMENTE
            loader.classList.add('active'); // Muestra la pantalla borrosa
            submitBtn.disabled = true; // Bloquea el botón
            submitBtn.textContent = "Enviando..."; // Cambia el texto del botón

            // Recopilar datos
            const formData = new FormData(form);
            const nombre = limpiarInput(document.getElementById('nombre').value);
            const correo = document.getElementById('correo').value;
            const mensaje = limpiarInput(document.getElementById('mensaje').value);

            // URL de Formspree
            const formspreeURL = "https://formspree.io/f/mjgylzav";

            try {
                const response = await fetch(formspreeURL, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // --- ÉXITO ---
                    
                    // Prepara WhatsApp
                    const telefonoJardin = "573187465390"; // TU NÚMERO
                    const textoWhatsApp = `Hola Life Kids Center, soy *${nombre}*.%0A%0AMe interesa el jardín para mi hijo/a.%0A*Correo:* ${correo}%0A*Mensaje:* ${mensaje}`;

                    // Pequeña pausa de 1 segundo para que el usuario vea que "se completó"
                    // y no sea un parpadeo demasiado rápido
                    setTimeout(() => {
                        window.open(`https://wa.me/${telefonoJardin}?text=${textoWhatsApp}`, '_blank');
                        window.location.href = "gracias.html";
                    }, 1000);

                } else {
                    // --- ERROR DE FORMSPREE ---
                    throw new Error('Error en el envío');
                }

            } catch (error) {
                console.error("Error:", error);
                
                // SI FALLA: DEBEMOS "DESBLOQUEAR" LA PANTALLA PARA QUE INTENTEN DE NUEVO
                loader.classList.remove('active'); // Quita el blur
                submitBtn.disabled = false; // Reactiva el botón
                submitBtn.textContent = "Quiero conocer el jardín"; // Texto original
                alert("Hubo un error de conexión. Por favor revisa tu internet e intenta nuevamente.");
            }
        });
    }
    // Función para limpiar texto de caracteres extraños
    function limpiarInput(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }
    // Lógica del Botón "Volver arriba"
    const btnTop = document.getElementById('btn-top');
    
    if (btnTop) {
        window.addEventListener('scroll', () => {
            // Si el usuario baja más de 300 pixeles, mostramos el botón
            if (window.scrollY > 300) {
                btnTop.classList.add('show');
            } else {
                btnTop.classList.remove('show');
            }
        });
    }
});