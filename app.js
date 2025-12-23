// app.js

// Utilidad: selector seguro
const $ = (sel) => document.querySelector(sel);

// Estado slider y manejo de errores
(function initSlider() {
  try {
    const track = $('#sliderTrack');
    const prev = $('#prevBtn');
    const next = $('#nextBtn');
    if (!track || !prev || !next) throw new Error('Slider no disponible');

    const slides = track.children;
    const total = slides.length;
    let index = 0;

    const update = () => {
      const offset = -index * 100;
      track.style.transform = `translateX(${offset}%)`;
    };

    prev.addEventListener('click', () => {
      index = (index - 1 + total) % total;
      update();
    });

    next.addEventListener('click', () => {
      index = (index + 1) % total;
      update();
    });

    // Accesibilidad: teclado
    prev.addEventListener('keyup', (e) => { if (e.key === 'Enter') prev.click(); });
    next.addEventListener('keyup', (e) => { if (e.key === 'Enter') next.click(); });

    update();
  } catch (err) {
    console.warn('[Slider] Error inicializando:', err.message);
    const note = document.createElement('p');
    note.textContent = 'Galería no disponible. Intenta recargar la página.';
    note.style.color = '#ef4444';
    const container = document.querySelector('#ejemplos .container');
    if (container) container.appendChild(note);
  }
})();

// Formulario: validación, envío y manejo de errores
(function initForm() {
  const form = $('#contactForm');
  const nameInput = $('#name');
  const phoneInput = $('#phone');
  const messageInput = $('#message');

  const nameError = $('#nameError');
  const phoneError = $('#phoneError');
  const messageError = $('#messageError');
  const alertBox = $('#formAlert');

  if (!form) return;

  const showAlert = (msg, type = 'info') => {
    alertBox.textContent = msg;
    alertBox.style.background = type === 'error' ? '#fee2e2' : '#f1f5f9';
    alertBox.style.color = type === 'error' ? '#991b1b' : '#64748b';
  };

  const clearErrors = () => {
    nameError.textContent = '';
    phoneError.textContent = '';
    messageError.textContent = '';
    showAlert(''); // limpiar alert
  };

  const validate = () => {
    let ok = true;
    clearErrors();

    // Nombre
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameError.textContent = 'Ingresá tu nombre (mínimo 2 caracteres).';
      ok = false;
    }

    // Teléfono (validación simple para +598 o números)
    const phone = phoneInput.value.trim();
    const phoneRegex = /^(\+?\d{6,16})$/;
    if (!phoneRegex.test(phone)) {
      phoneError.textContent = 'Ingresá un teléfono válido (ej. +598...).';
      ok = false;
    }

    // Mensaje
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageError.textContent = 'Contame un poco más (mínimo 10 caracteres).';
      ok = false;
    }
    return ok;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      if (!validate()) {
        showAlert('Revisá los campos marcados en rojo.', 'error');
        return;
      }

      // Simulación de envío (reemplazá por tu endpoint)
      showAlert('Enviando tu consulta...', 'info');

      // Ejemplo: envío ficticio con timeout
      await new Promise((res) => setTimeout(res, 800));

      // Construir link a WhatsApp como fallback de contacto
      const name = encodeURIComponent(nameInput.value.trim());
      const phone = encodeURIComponent(phoneInput.value.trim());
      const msg = encodeURIComponent(messageInput.value.trim());
      const waText = `Hola Ethan, soy ${name} (${phone}). ${msg}`;
      const waUrl = `https://wa.me/59800000000?text=${waText}`;

      showAlert('¡Gracias! Te respondemos en breve. También podés escribir por WhatsApp.', 'info');

      // Ofrecer abrir WhatsApp automáticamente
      const open = confirm('¿Querés abrir WhatsApp para acelerar la conversación?');
      if (open) window.open(waUrl, '_blank', 'noopener');

      // Reset del formulario
      form.reset();
    } catch (err) {
      console.error('[Formulario] Error al enviar:', err);
      showAlert('Tuvimos un problema enviando tu consulta. Probá de nuevo o usá WhatsApp.', 'error');
    }
  });
})();

// Suavizar scroll para anclas
(function smoothAnchors(){
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// Protección básica: evitar errores por enlaces sociales vacíos
(function safeSocialLinks(){
  document.querySelectorAll('.social__link').forEach(a => {
    if (a.getAttribute('href') === '#') {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Pronto activaremos nuestras redes. Gracias por tu interés.');
      });
    }
  });
})();
