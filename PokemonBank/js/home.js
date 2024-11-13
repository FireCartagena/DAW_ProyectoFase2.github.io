$(document).ready(function() {

    const dataUsuario = infoUser();

    // Definimos los elementos de la pantalla a cambiar
    const usuarioNombre = document.getElementById("usuarioNombre");
    const usuarioCuenta = document.getElementById("usuarioCuenta");
    const usuarioSaldo = document.getElementById("usuarioSaldo");

    // Cambiamos la informacion principal
    usuarioNombre.innerHTML = dataUsuario.nombre;
    usuarioCuenta.innerHTML = dataUsuario.cuenta;
    usuarioSaldo.innerHTML = dataUsuario.saldo;

    /**
     * Funcion para interceptar la accion del boton
     */
    document.getElementById("btnSalir").addEventListener("click", function() {
        salir();
    });
});
