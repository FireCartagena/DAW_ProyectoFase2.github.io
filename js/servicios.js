$(document).ready(function() {
	$("#espacioInfoNpe").hide();

	const dataUsuario = infoUser();

    // Definimos los elementos de la pantalla a cambiar
    const usuarioNombre = document.getElementById("usuarioNombre");
    const usuarioCuenta = document.getElementById("usuarioCuenta");
	const usuarioMonto = document.getElementById("usuarioMonto");

    // Cambiamos la informacion principal
    usuarioNombre.innerHTML = dataUsuario.nombre;
    usuarioCuenta.innerHTML = dataUsuario.cuenta;
	usuarioMonto.innerHTML = dataUsuario.saldo.toFixed(2);
	
	$("#btnConsultarInfo").click(function(event) {
		event.preventDefault();
		
		var servicio 	= $("#servicio").val();
		var npe			= $("#npe").val();
		
		if((servicio != "") && (npe != "")){
			$("#espacioInfoNpe").show();
			$("#espacioConsultar").hide();
			
			$('#servicio').prop('disabled', true);
			$('#npe').prop('disabled', true);

		}else{
			Swal.fire('Falta informacion','Por favor rellene todos los campos.','error');
		}
		
		console.log(servicio);
	});
	
	$("#servicioFormulario").submit(function(event) {
		 event.preventDefault();
		 
		 var textServicio 	= $('#servicio option:selected').text();
		 var npe 			= $('#npe').val();
		 var fechaVencimiento = $("#fechaVencimiento").val();
		 var monto 			= parseFloat($("#monto").val());
		 
		 if(dataUsuario.saldo >= monto){
			Swal.fire({
				title: '¿Desea realizar esta transferencia?',
				text: "Desea realizar el pago de "+textServicio+" con monto $"+monto,
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Confirmar',
				cancelButtonText: 'Cancelar'
		   }).then((result) => {
			   if (result.isConfirmed) {
				   // El usuario confirma la transaccion
				   this.submit();
				   nuevoServicio(textServicio, npe, fechaVencimiento, monto);
			   } else {
				   // El usuario rechaza la transaccion
				   Swal.fire('Cancelado','La transaccion no se ha realizado.','error');
			   }
		   });
		 }else{
			Swal.fire({
				title: 'El monto no se puede retirar',
				text: "El monto sobrepasa su saldo actual de $"+dataUsuario.saldo.toFixed(2),
				icon: 'warning',
				showCancelButton: true,
				cancelButtonColor: '#d33',
				cancelButtonText: 'Cancelar'
		   })
		 }

		 
	});
});