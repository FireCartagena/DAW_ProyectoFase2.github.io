$(document).ready(function () {

	 // Creamos la definicion de la validacion
	const constraints = {
		code: {
			presence: true, // El campo debe estar presente
			format: {
				 pattern: "\\d{4}", // Aceptar solo números (4 dígitos)
				 message: "debe ser un número de 4 dígitos"
			},
			length: {
				is: 4, // Debe tener exactamente 4 caracteres
				message: "debe tener exactamente 4 dígitos"
			}
		}
	};
	
	// Ejecutamos la validacion al hacer submit
	document.getElementById("loginPin").addEventListener("submit", function(event) {
		
		// Capturamos los valores del formulario
		var codeForm = $("#codePin").val(); // Obtenemos el valor del codigo
		
		// Preparamos la sentencia de validacion
		const validacionPin = validarPin(codeForm);
		
		// Preparamos los datos a validar
		var formValues = {code: codeForm};
		
		var errors = validate(formValues, constraints);
		
		// Verificamos si hay errores
		if (errors) {
			event.preventDefault();
			// Mostramos el error
            console.error(errors);
            Swal.fire(errors.code[0]);
			
			return 0;
		}
		
		// Validamos que el pin sea el correcto
		if(!validacionPin){
			event.preventDefault();
			Swal.fire("El pin es incorrecto intente de nuevo");
			return 0;
		}
	});
	 

});


        
        
        