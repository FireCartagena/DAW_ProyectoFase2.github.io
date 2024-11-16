 $(document).ready(function() {

	// Mandamos a llamar la informacion del usuario para mostrar en pantalla
	const dataUsuario = infoUser();

    // Definimos los elementos de la pantalla a cambiar
    const usuarioNombre = document.getElementById("usuarioNombre");
    const usuarioCuenta = document.getElementById("usuarioCuenta");

    // Cambiamos la informacion principal
    usuarioNombre.innerHTML = dataUsuario.nombre;
    usuarioCuenta.innerHTML = dataUsuario.cuenta;

	/**
	 * Interceptamos el submit del deposito
	 */
	$("#depositoFormulario").submit(function(event) {
		event.preventDefault();
		var depositoMonto = $("#depositoMonto").val();

		// Mostramos mensaje para confirmar o cancelar la transaccion
		Swal.fire({
			title: '¿Desea realizar esta transferencia?',
			text: "Desea realizar el deposito de $"+$("#depositoMonto").val(),
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Confirmar',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
            	// El usuario confirma la transaccion
				nuevoDeposito(depositoMonto);
				this.submit();
			} else {
				// El usuario rechaza la transaccion
				Swal.fire('Cancelado','La transaccion no se ha realizado.','error');
			}
		});
	});

});