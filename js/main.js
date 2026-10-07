console.log('Sistema de Gestión Bancaria - v0.1.0');

// IMPORTAR VALIDADORES, HELPERS Y FORMATEADORES
import { validarCampoObligatorio, validarMonto } from './utils/validators.js';
import { generarId } from './utils/helpers.js';
import {
  formatCurrency,
  formatDate,
  formatAccountNumber,
} from './utils/formatters.js';

// IMPORTAR MODELOS
import { Usuario } from './models/Usuario.js';
import { Cuenta } from './models/Cuenta.js';
import { Movimiento } from './models/Movimiento.js';

// mOSTRAMOS NUESTROS IMPORTS
console.log('Sistema de gstion bancaria -v0.2.0');

// MOSTRAMOS VALIDACIONES DEBEN MOSTRAR TRU
console.log('Campo obligatorio : ', validarCampoObligatorio('Banco digital'));

// Validacion del monto debe regresar true
console.log('Monto valido: ', validarMonto(1000));

// mostramos generador dinamico de id
console.log('ID generado: ', generarId());

// Convertir 1500 a formato monetario MXN
console.log('Monto formateado: ', formatCurrency(1500));

// Formateamosla fecha actual
console.log('Fecha formateada: ', formatDate(new Date()));

// Separar los digitos de la cuenta
console.log('Numero de cuenta: ', formatAccountNumber('123456789012'));

// INSTANCIAS
console.log('sistema de Gestión bancaria - v0.3.0');
// USUARIO: usuario demo
const usuarioDemo = new Usuario({
  nombre: 'Juan suarez',
  email: 'juan@correo.com',
  telefono: '5512345678',
  password: '123456',
});
console.log('Usuario: ', usuarioDemo);

// CUENTA: cuenta demo
const cuentaDemo = new Cuenta({
  numeroCuenta: '123456789012',
  usuarioId: usuarioDemo.id,
});
console.log('Cuenta: ', cuentaDemo);

// PROBAR METODOS
// DEPOSITO DEMOSTRACION
cuentaDemo.depositar(1000);
console.log('Saldo despuest del deposito: ', formatCurrency(cuentaDemo.saldo));

// MOVIMIENTO
const movimientoDemo = new Movimiento({
  tipo: 'DEPOSITO',
  monto: 1000,
  descripcion: 'Deposito inicial',
  // Asociamos el depsito con la cuenta
  cuentaOrigen: cuentaDemo.id,
  saldoResultante: cuentaDemo.saldo,
});
console.log('Movimiento: ', movimientoDemo);

console.log(usuarioDemo.id === cuentaDemo.usuarioId);
console.log(usuarioDemo.id === cuentaDemo.usuarioId);
