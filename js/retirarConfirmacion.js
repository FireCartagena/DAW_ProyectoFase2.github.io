$(document).ready(function() {
    const dataUsuario = infoUser();

    // Definimos los elementos de la pantalla a cambiar
    const usuarioNombre = document.getElementById("usuarioNombre");
    const usuarioSaldo = document.getElementById("usuarioSaldo");

    // Cambiamos la informacion principal
    usuarioNombre.innerHTML = dataUsuario.nombre;
    usuarioSaldo.innerHTML = dataUsuario.saldo.toFixed(2);

    // Obtenemos el detalle del ultimo retiro y mostramos su informacion en pantalla
    const transaccion = ultimoRetiro();
    const usuarioCuenta = document.getElementById("numeroCuenta");
    const referenceNumber = document.getElementById("numeroReferencia");
    const montoRetiro = document.getElementById("montoRetiro");
    const montoSaldo = document.getElementById("montoSaldo");
    const fechaRetiro = document.getElementById("fechaRetiro");

    usuarioCuenta.innerHTML = transaccion.cuenta;
    referenceNumber.innerHTML = transaccion.numeroReferencia;
    montoRetiro.innerHTML = transaccion.montoRetiro.toFixed(2);
    montoSaldo.innerHTML = transaccion.saldoActual.toFixed(2);
    fechaRetiro.innerHTML = transaccion.fecha;
	
    /**
     * Generamos el pdf con JSPDF y lo descargamos a peticion del usuario
     */
    $("#descargarComprobante").click(function(event) {
        event.preventDefault();

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Obtener los valores del depósito
        const numeroCuenta 	= document.getElementById("numeroCuenta").textContent;
        const numeroReferencia = document.getElementById("numeroReferencia").textContent;
        const montoRetiro 	= document.getElementById("montoRetiro").textContent;
        const montoSaldo 	= document.getElementById("montoSaldo").textContent;
        const fechaRetiro 	= document.getElementById("fechaRetiro").textContent;

        // Agregar contenido al PDF
        doc.setFontSize(20);
        doc.text("Confirmación de Retiro", 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.text(`Número de Cuenta: ${numeroCuenta}`, 20, 40);
        doc.text(`Número referencia: ${numeroReferencia}`, 20, 50);
        doc.text(`Monto Retirado:$ ${montoRetiro}`, 20, 60);
        doc.text(`Saldo actual: $ ${montoSaldo}`, 20, 70);
        doc.text(`Fecha: ${fechaRetiro}`, 20, 80);

        // Guardar el PDF con un nombre
        doc.save("confirmacion_retiro.pdf");
    });
    
});
