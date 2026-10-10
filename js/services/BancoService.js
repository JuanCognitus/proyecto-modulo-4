// IMPORTAMOS MODELOS DEL DOMINIO Y LOCALSTORAGE
import { Banco } from '../models/Banco.js';
import { Usuario } from '../models/Usuario.js';
import { Cuenta } from '../models/Cuenta.js';
import { Movimiento } from '../models/Movimiento.js';
import { STORAGE_KEYS, storageService } from './StorageService.js';

// SERVICIO BANCARIO
class BancoService {
  constructor() {
    this._banco = null;
  }

  // CARGAMOS EL BANCO
  cargarBanco() {
    // Recuperar los usuarios almacenados
    const usuariosGuardados = storageService.obtener(STORAGE_KEYS.USUARIOS, []);

    // Recuperamos las cuentas
    const cuentasGuardadas = storageService.obtener(STORAGE_KEYS.CUENTAS, []);

    // Recuperamos los movimientos almacenados
    const movimientosGuardados = storageService.obtener(
      STORAGE_KEYS.MOVIMIENTOS,
      [],
    );

    // Convertir cada objeto plano e una instancia Usuario
    const usuarios = usuariosGuardados.map((usuario) => new Usuario(usuario));

    // Recontruir cada cuenta para recuperar sus metodos
    const cuentas = cuentasGuardadas.map((cuenta) => new Cuenta(cuenta));

    //Reconstruir los movimientos utiliando Movimiento
    const movimientos = movimientosGuardados.map(
      (movimiento) => new Movimiento(movimiento),
    );

    this._banco = new Banco({
      usuarios,
      cuentas,
      movimientos,
    });

    return this._banco;
  }

  // OBTENER INSTANCIA DEL BANCO
  obtenerInstanciaBanco() {
    // Comprobar si _banco es null. Reconstruir desde LoscalStorage
    if (!this._banco) {
      return this.cargarBanco();
    }

    // Si ya existe, reutiliza la instancia
    return this._banco;
  }

  // RECARGAR BANCO: Obliga al servicio a reconstruir el banco utilizando la información guardada
  recargarBanco() {
    // Elimina la referencia a la instancia actual
    this._banco = null;

    return this.cargarBanco();
  }

  // GUARDAR BANCO EN LOCAL STORAGE
  guardarBanco() {
    // Obtenemos la instancia actual
    const banco = this.obtenerInstanciaBanco();

    // Guardamos los usuarios
    storageService.guardar(STORAGE_KEYS.USUARIOS, banco.usuarios);

    // Guardamos las curntas
    storageService.guardar(STORAGE_KEYS.CUENTAS, banco.cuentas);

    // Guardamos los movimientos
    storageService.guardar(STORAGE_KEYS.MOVIMIENTOS, banco.movimientos);

    return true;
  }

  // OBTENER EL USUARIO: Obtenemos la infomacion del usuario determinado
  obtenerDatosUsuario(usuarioId) {
    // Obtener la instancia actual del banco
    const banco = this.obtenerInstanciaBanco();

    //Buscar usuario utilizando una regla que ya existe
    const usuario = banco.buscarUsusarioPorId(usuarioId);

    //Validación si el usuario no existe
    if (!usuario) {
      throw new Error('El usuario no existe');
    }

    // Obtenemos unicamente las cuentas del usuario
    const cuentas = banco.obtenerCuentasDeUsuario(usuarioId);

    // Recorrer todsas las cuentas del usuario y obteneos sus movimientos
    const movimientosSinFiltrar = cuentas.flatMap((cuenta) =>
      banco.obtenerMovimientosDeCuenta(cuenta.id),
    );

    // Eliminar movimientos duplicados utilizando filter
    const movimientos = movimientosSinFiltrar.filter(
      (movimiento, index, array) =>
        index === array.findIndex((item) => item.id === movimiento.id),
    );

    // Agrupamos la información
    return {
      usuario,
      cuentas,
      movimientos,
    };
  }

  // Obtener resumen del usuario
  obtenerResumenUsuario(usuarioId) {
    // Destructurin: extraemos directamente las propiedades necesarias
    const { usuario, cuentas, movimientos } =
      this.obtenerDatosUsuario(usuarioId);

    // Suma del saldo de todas las cuentas
    const saldoTotal = cuentas.reduce(
      (acumulado, cuenta) => acumulado + Number(cuenta.saldo),
      0,
    );

    return {
      usuario,
      cuentas,
      movimientos,
      saldoTotal,
      totalCuentas: cuentas.length,
      totalMovimientos: movimientos.length,
    };
  }
}

// Creamos y exportamos una unica instancia reutilizable
export const bancoService = new BancoService();
