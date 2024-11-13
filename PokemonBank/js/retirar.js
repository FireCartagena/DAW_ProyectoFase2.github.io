$(document).ready(function() {
	 
	const dataUsuario = infoUser();

    // Definimos los elementos de la pantalla a cambiar
    const usuarioNombre = document.getElementById("usuarioNombre");
    const usuarioCuenta = document.getElementById("usuarioCuenta");
	const usuarioMonto = document.getElementById("usuarioMonto");

    // Cambiamos la informacion principal
    usuarioNombre.innerHTML = dataUsuario.nombre;
    usuarioCuenta.innerHTML = dataUsuario.cuenta;
	usuarioMonto.innerHTML = dataUsuario.saldo.toFixed(2);

	 $("#retiroFormulario").submit(function(event) {
		 event.preventDefault();
		 var retiroMonto = parseFloat($("#retiroMonto").val());

		 if(dataUsuario.saldo >= retiroMonto){
			Swal.fire({
				title: '¿Desea realizar esta transferencia?',
				text: "Desea realizar el retiro de $"+$("#retiroMonto").val(),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Confirmar',
				cancelButtonText: 'Cancelar'
		   }).then((result) => {
			   if (result.isConfirmed) {
				   // El usuario confirma la transaccion
				   nuevoRetiro(retiroMonto);
				   this.submit();
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