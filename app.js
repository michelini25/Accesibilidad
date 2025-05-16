// Obtener elementos del DOM
const estado = document.getElementById('estado');
const modal = document.getElementById('modalAlerta');
const modalMensaje = document.getElementById('modalMensaje');
const btnCerrarModal = document.getElementById('btnCerrarModal');

// Comandos reconocidos para navegar entre secciones
const comandosNavegacion = {
  'inicio': 'inicio',
  'acerca de': 'acerca',
  'contacto': 'contacto'
};

// Comandos reconocidos para interactuar con botones
const comandosBotones = {
  'saludar': () => mostrarModal('¡Hola, usuario por voz!'),
  'mostrar información': () => mostrarModal('Esta es una app con control por voz.'),
  'enviar': () => mostrarModal('Mensaje enviado correctamente.')
};

// Función para mostrar la ventana emergente
function mostrarModal(mensaje) {
  modalMensaje.textContent = mensaje;
  modal.classList.add('show'); // Mostrar modal
}

// Función para cerrar la ventana emergente
function cerrarModal() {
  modal.classList.remove('show'); // Ocultar modal
}

// Evento sobre el boton btnCerrarmodal
btnCerrarModal.onclick = cerrarModal;

// Comprobamos si Annyang está disponible
if (annyang) {
  // Establecer los comandos con annyang
  annyang.addCommands({
    // Navegación por voz
    'ir a *seccion': (seccion) => {
      seccion = seccion.toLowerCase();
      if (comandosNavegacion[seccion]) {
        const id = comandosNavegacion[seccion];
        const seccionElement = document.getElementById(id);
        if (seccionElement) {
          seccionElement.scrollIntoView({ behavior: 'smooth' });
          estado.textContent = `Navegando a: ${seccion}`;
        }
      }
    },
    
    // Comandos de los botones
    'saludar': () => comandosBotones['saludar'](),
    'mostrar información': () => comandosBotones['mostrar información'](),
    'enviar mensaje': () => comandosBotones['enviar'](),

    // Cerrar el modal
    'aceptar': () => {
      cerrarModal();
      estado.textContent = 'Modal cerrado';
    },
    
    // Detener la escucha
    'detener escucha': () => {
      annyang.abort();
      estado.textContent = 'Escucha detenida';
    }
  });

  // Configuración del idioma y activación de Annyang
  annyang.setLanguage('es-ES');
  annyang.start();
  estado.textContent = '🎧 Escuchando comandos...';
} else {
  estado.textContent = 'Annyang no está disponible en este navegador.';
}
