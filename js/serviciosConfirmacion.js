$(document).ready(function() {
    const dataUsuario = infoUser();

    // Definimos los elementos de la pantalla a cambiar
    const usuarioNombre = document.getElementById("usuarioNombre");
    const usuarioSaldo = document.getElementById("usuarioSaldo");

    // Cambiamos la informacion principal
    usuarioNombre.innerHTML = dataUsuario.nombre;
    usuarioSaldo.innerHTML = dataUsuario.saldo.toFixed(2);
    
    // Obtenemos el ultimo servicio procesado
    const transaccion       = ultimoServicio();
    const numeroCuenta      = document.getElementById("numeroCuenta");
    const nombreServicio    = document.getElementById("nombreServicio");
    const numeroReferencia  = document.getElementById("numeroReferencia");
    const numeroNpe         = document.getElementById("numeroNpe");
    const montoPagado       = document.getElementById("montoPagado");
    const pagoFecha         = document.getElementById("pagoFecha");

    // Cambiamos los datos a mostrar 
    numeroCuenta.innerHTML      = transaccion.cuenta;
    nombreServicio.innerHTML    = transaccion.servicio;
    numeroReferencia.innerHTML  = transaccion.numeroReferencia;
    numeroNpe.innerHTML         = transaccion.npe;
    montoPagado.innerHTML       = transaccion.montoServicio.toFixed(2);
    pagoFecha.innerHTML         = transaccion.fecha;
    
	
    $("#descargarComprobante").click(function(event) {
        event.preventDefault();

        const { jsPDF } = window.jspdf; // Asegúrate de que jsPDF está cargado
        const doc = new jsPDF();

        // Obtener los valores del depósito
        const numeroCuenta 		= document.getElementById("numeroCuenta").textContent;
        const nombreServicio 	= document.getElementById("nombreServicio").textContent;
        const numeroReferencia 	= document.getElementById("numeroReferencia").textContent;
        const numeroNpe 		= document.getElementById("numeroNpe").textContent;
        const montoPagado 		= document.getElementById("montoPagado").textContent;
        const pagoFecha 		= document.getElementById("pagoFecha").textContent;

        // Agregar contenido al PDF
        doc.setFontSize(20);
        doc.text("Confirmación de pago", 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.text(`Número de Cuenta: ${numeroCuenta}`, 20, 40);
        doc.text(`Servicio pagado: ${nombreServicio}`, 20, 50);
        doc.text(`Número referencia: ${numeroReferencia}`, 20, 60);
        doc.text(`NPE cancelado: ${numeroNpe}`, 20, 70);
        doc.text(`Monto cancelado: $ ${montoPagado}`, 20, 80);
        doc.text(`Fecha de pago: ${pagoFecha}`, 20, 90);

        // Guardar el PDF con un nombre
        doc.save("confirmacion_pago.pdf");
    });
    
});