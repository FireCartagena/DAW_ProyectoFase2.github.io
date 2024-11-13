$(document).ready(function() {
    const dataUsuario = infoUser();

    // Definimos los elementos de la pantalla a cambiar
    const usuarioNombre = document.getElementById("usuarioNombre");
    const usuarioSaldo = document.getElementById("usuarioSaldo");

    // Cambiamos la informacion principal
    usuarioNombre.innerHTML = dataUsuario.nombre;
    usuarioSaldo.innerHTML = dataUsuario.saldo;

    const usuarioCuenta = document.getElementById("usuarioCuenta");
    const referenceNumber = document.getElementById("referenceNumber");
    const depositAmount = document.getElementById("depositAmount");
    const depositDate = document.getElementById("depositDate");
    const transaccion = ultimoDeposito();
    usuarioCuenta.innerHTML = transaccion.cuenta;
    referenceNumber.innerHTML = transaccion.numeroReferencia;
    depositAmount.innerHTML = transaccion.montoDeposito.toFixed(2);
    depositDate.innerHTML = transaccion.fecha;

    $("#descargarComprobante").click(function(event) {
        event.preventDefault();

        const { jsPDF } = window.jspdf; // Asegúrate de que jsPDF está cargado
        const doc = new jsPDF();

        // Obtener los valores del depósito
        const usuarioCuenta = document.getElementById("usuarioCuenta").textContent;
        const referenceNumber = document.getElementById("referenceNumber").textContent;
        const depositAmount = document.getElementById("depositAmount").textContent;
        const depositDate = document.getElementById("depositDate").textContent;

        // Agregar contenido al PDF
        doc.setFontSize(20);
        doc.text("Confirmación de Depósito", 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.text(`Número de Cuenta: ${usuarioCuenta}`, 20, 40);
        doc.text(`Número referencia: ${referenceNumber}`, 20, 50);
        doc.text(`Monto Depositado: $ ${depositAmount}`, 20, 60);
        doc.text(`Fecha: ${depositDate}`, 20, 70);

        // Guardar el PDF con un nombre
        doc.save("confirmacion_deposito.pdf");
    });
    
});
