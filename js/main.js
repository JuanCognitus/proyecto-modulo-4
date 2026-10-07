console.log('Sistema de Gestión Bancaria - v0.1.0');

// IMPORTAR VALIDADORES, HELPERS Y FORMATEADORES
import { validarCampoObligatorio, validarMonto } from './utils/validators.js';
import { generarId } from './utils/helpers.js';
import {
  formatCurrency,
  formatDate,
  formatAccountNumber,
} from './utils/formatters.js';

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
