// Seleccionamos todas las imágenes de ejemplo
const images = document.querySelectorAll('.example-img');

// Seleccionamos el modal y sus elementos internos
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const closeModal = document.getElementById('closeModal');

// Abrir modal al hacer clic en una imagen
images.forEach(img => {
  img.addEventListener('click', () => {
    modal.style.display = 'flex';   // mostramos el modal
    modalImg.src = img.src;         // cargamos la imagen seleccionada
    modalImg.alt = img.alt;
  });
});

// Cerrar modal al hacer clic en la X
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Cerrar modal al hacer clic fuera de la imagen
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    modal.style.display = 'none';
  }
});
