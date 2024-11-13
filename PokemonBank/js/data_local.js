$(function() {
    //console.log(JSON.parse(localStorage.getItem("Pokebank_MovimientosRegistro")));

    validarInformacion();
    validarIngreso();
});

function validarInformacion(){
    if (localStorage.getItem("Pokebank_User") == null) {
    
        // Vaciamos completamente el local storage
        localStorage.clear();
    
        const usuario = { 
                            nombre: "Ash Ketchum", 
                            pin: "1234",
                            cuenta: '0987654321',
                            saldo: 500.00,
                            ingreso: false,
                        };
        const movimientos_ing = {}
        const movimientos_sal = {}
        const movimientos_pago = {};
        const movimientos_registro = {
            retiros: 0,
            deposito:0,
            servicio: 0,
            movimientos:{}
        };
        localStorage.setItem("Pokebank_User", JSON.stringify(usuario));
        localStorage.setItem("Pokebank_MovimientosIng", JSON.stringify(movimientos_ing));
        localStorage.setItem("Pokebank_MovimientosSal", JSON.stringify(movimientos_sal));
        localStorage.setItem("Pokebank_MovimientosPago", JSON.stringify(movimientos_pago));
        localStorage.setItem("Pokebank_MovimientosRegistro", JSON.stringify(movimientos_registro));
    }
}

/**
 * Validamos si ya tiene iniciada una sesion
 * @returns 
 */
function validarIngreso(){
    
    const usuario = JSON.parse(localStorage.getItem("Pokebank_User"));

    if(usuario.ingreso){
        return true;
    }else{
        // Verifica si la URL actual incluye "index.html"
        if (!window.location.href.includes("index.html")) {
            // Redirecciona solo si no esta en index.html
            window.location.href = "index.html";
        }
        return false;
    }
}

/**
 * Validamos el pin enviado
 * @param {*} pin 
 */
function validarPin(pin){
    let usuario = JSON.parse(localStorage.getItem("Pokebank_User"));
    if(usuario.pin === pin){
        usuario.ingreso = true;
        localStorage.setItem("Pokebank_User", JSON.stringify(usuario));
        return true;
    }else{
        return false;
    }
}

/**
 * Funcion que develve la informacion del usuario
 */
function infoUser(){
    let usuario = JSON.parse(localStorage.getItem("Pokebank_User"));

    return usuario;
}

function salir(){
    //localStorage.clear();
    if (!window.location.href.includes("index.html")) {
        // Redirecciona solo si no esta en index.html
        window.location.href = "index.html";
    }
}

/**
 * Funcion para generar un nuevo monto 
 * @param {*} monto 
 */
function nuevoDeposito(monto){
    let usuario             = JSON.parse(localStorage.getItem("Pokebank_User"));
    let movimientos_ingreso = JSON.parse(localStorage.getItem("Pokebank_MovimientosIng"));

    let montoDeposito = parseFloat(monto);
    let saldo = usuario.saldo;
    let nuevoSaldo = saldo + montoDeposito;

    const fechaActual = new Date();

    // Generamos los datos del deposito
    let depositoData = {
        cuenta: usuario.cuenta,
        numeroReferencia: Math.floor(100000 + Math.random() * 900000),
        montoDeposito: montoDeposito,
        fecha: fechaActual
    }

    // Actualizo el monto en los datos del usuario
    usuario.saldo = nuevoSaldo;
    localStorage.setItem("Pokebank_User", JSON.stringify(usuario));

    // Guardamos los datos de la transaccion
    if (!Array.isArray(movimientos_ingreso)) {
        movimientos_ingreso = [];  // Si no es un array, inicialízalo como un array vacío
    }

    // Agregar el nuevo movimiento al array de movimientos
    movimientos_ingreso.push(depositoData);
    localStorage.setItem("Pokebank_MovimientosIng", JSON.stringify(movimientos_ingreso));

    // registramos el movimiento
    registrarMovimiento('deposito', montoDeposito, nuevoSaldo);
}

/**
 * Devolvemos el ultimo deposito
 */
function ultimoDeposito(){
    let movimientos_ingreso = JSON.parse(localStorage.getItem("Pokebank_MovimientosIng"));
    let ultimoMovimiento = movimientos_ingreso[movimientos_ingreso.length - 1];
    return ultimoMovimiento;
}

/**
 * Guardamos un nuevo retiro
 * @param {*} monto 
 */
function nuevoRetiro(monto){
    let usuario             = JSON.parse(localStorage.getItem("Pokebank_User"));
    let movimientos_salida = JSON.parse(localStorage.getItem("Pokebank_MovimientosSal"));

    let montoRetiro = parseFloat(monto);
    let saldo = usuario.saldo;
    let nuevoSaldo = saldo - montoRetiro;

    const fechaActual = new Date();

    // Generamos los datos del retiro
    let retiroData = {
        cuenta: usuario.cuenta,
        numeroReferencia: Math.floor(100000 + Math.random() * 900000),
        montoRetiro: monto,
        saldoActual: nuevoSaldo,
        fecha: fechaActual
    }

    // Actualizo el monto en los datos del usuario
    usuario.saldo = nuevoSaldo;
    localStorage.setItem("Pokebank_User", JSON.stringify(usuario));

    // Guardamos los datos de la transaccion
    if (!Array.isArray(movimientos_salida)) {
        movimientos_salida = [];  // Si no es un array, inicialízalo como un array vacío
    }

    // Agregar el nuevo movimiento al array de movimientos
    movimientos_salida.push(retiroData);
    localStorage.setItem("Pokebank_MovimientosSal", JSON.stringify(movimientos_salida));

    // registramos el movimiento
    registrarMovimiento('retiro', montoRetiro, nuevoSaldo);
}

/**
 * Devolvemos el ultimo retiro
 */
function ultimoRetiro(){
    let movimientos_salida = JSON.parse(localStorage.getItem("Pokebank_MovimientosSal"));
    let ultimoMovimiento = movimientos_salida[movimientos_salida.length - 1];
    return ultimoMovimiento;
}

/**
 * Guardamos un nuevo cobro de servicio
 */
function nuevoServicio(servicio, npe, fechaVencimiento, monto) {
    let usuario          = JSON.parse(localStorage.getItem("Pokebank_User"));
    let movimientos_pago = JSON.parse(localStorage.getItem("Pokebank_MovimientosPago"));

    let montoServicio = parseFloat(monto);
    let saldo = usuario.saldo;
    let nuevoSaldo = saldo - montoServicio;

    const fechaActual = new Date();

    // Generamos los datos del servicio
    let servicioData = {
        cuenta              : usuario.cuenta,
        numeroReferencia    : Math.floor(100000 + Math.random() * 900000),
        servicio            : servicio,
        npe                 : npe,
        montoServicio       : monto,
        fechaVencimiento    : fechaVencimiento,
        fecha               : fechaActual
    }

    // Actualizo el monto en los datos del usuario
    usuario.saldo = nuevoSaldo;
    localStorage.setItem("Pokebank_User", JSON.stringify(usuario));

    // Guardamos los datos de la transaccion
    if (!Array.isArray(movimientos_pago)) {
        movimientos_pago = [];  // Si no es un array, inicialízalo como un array vacío
    }

    // Agregar el nuevo movimiento al array de movimientos
    movimientos_pago.push(servicioData);
    localStorage.setItem("Pokebank_MovimientosPago", JSON.stringify(movimientos_pago));

    // registramos el movimiento
    registrarMovimiento('servicio', montoServicio, nuevoSaldo);
}

/**
 * Devolvemos la ultima transaccion realizada
 * @returns 
 */
function ultimoServicio() {
    let movimientos_pago = JSON.parse(localStorage.getItem("Pokebank_MovimientosPago"));
    let ultimoMovimiento = movimientos_pago[movimientos_pago.length - 1];
    return ultimoMovimiento;
}

/**
 * Registramos el movimiento realizado
 * @param {*} tipo 
 * @param {*} monto 
 * @param {*} saldo 
 */
function registrarMovimiento(tipo, monto, saldo){
    let movimientos_registro = JSON.parse(localStorage.getItem("Pokebank_MovimientosRegistro"));

    let retiros     = movimientos_registro.retiros;
    let deposito    = movimientos_registro.deposito;
    let servicio    = movimientos_registro.servicio;
    let movimientos = movimientos_registro.movimientos;

    let fecha = new Date();
    let fechaform = fecha.toISOString().split('T')[0];

    switch(tipo){
        case 'retiro':
            retiros = retiros + 1;
            break;
        case 'deposito':
            deposito = deposito + 1;
            break;
        case 'servicio':
            servicio = servicio +1;
            break;
    }

    let nuevoMovimiento = {
        fecha: fechaform,
        tipo: tipo,
        monto: monto,
        saldo: saldo
    }
    if (!Array.isArray(movimientos)) {
        movimientos = [];  // Si no es un array, inicialízalo como un array vacío
    }

    // Agregar el nuevo movimiento al array de movimientos
    movimientos.push(nuevoMovimiento);

    // Actualizamos los datos y lo guardamos
    movimientos_registro.retiros = retiros;
    movimientos_registro.deposito = deposito;
    movimientos_registro.servicio = servicio;
    movimientos_registro.movimientos = movimientos;
    
    localStorage.setItem("Pokebank_MovimientosRegistro", JSON.stringify(movimientos_registro));
}

/**
 * Obtenemos los movimientos
 */

function consultaMovimientos(){
    let moovimientos = JSON.parse(localStorage.getItem("Pokebank_MovimientosRegistro"));
    
    return moovimientos;
}