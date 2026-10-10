// IMPORTAMOS EL SERVICIO DE AUTENTYICACION

import { authService } from '../services/AuthService.js';

// MOSTRAR USUARIO
function mostrarUsuario() {
  //MOSTRAR USUARIO
  const usuario = authService.getCurrentUser();

  // VALIDAR USUARIO
  if (!usuario) {
    return;
  }

  //OBTENER ELEMENTO DEL DOM
  const nombreUsuario = document.querySelector('#nombreUsuario');

  // MOSTRAR NOMBRE
  if (nombreUsuario) {
    nombreUsuario.textContent = `Sesión iniciada como ${usuario.nombre}`;
  }
}

// INICIALIZAR LOGOUT
function inicializarLogout() {
  // OBTENER BOTON
  const logoutBtn = document.querySelector('#logoutBtn');

  // VALIDAMOS EL BOTON
  if (!logoutBtn) {
    return;
  }

  // EVENTO CLICK
  logoutBtn.addEventListener('click', () => {
    // CONFIRMAMOS SALIDA
    Swal.fire({
      icon: 'question',
      title: 'Cerrar sesión',
      text: '¿Seguro que deseas salir?',
      showCancelButton: true,
      confirmButtonText: 'Si, salir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      // CANCELAR
      if (!result.isConfirmed) {
        return;
      }

      // CERRAR SESIÓN
      authService.logout();

      // VOLVER AL LOGIN
      window.location.href = 'index.html';
    });
  });
}

// INICIALIZAR EL DASHBOARD
function init() {
  // PROTEGER RUTA
  const accesoPermitido = authService.protegerRuta();

  console.log('¿Acceso permitido?', accesoPermitido);
  // DETENER SIN ACCESO
  if (!accesoPermitido) {
    return;
  }

  // MOSTRAR USUARIO4
  mostrarUsuario();

  // ACTIVAR LOGOUT
  inicializarLogout();
}

init();
