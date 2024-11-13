$(document).ready(function() {

	// Mostramos los datos
	const dataUsuario = infoUser();

    // Definimos los elementos de la pantalla a cambiar
    const usuarioNombre = document.getElementById("usuarioNombre");
    const usuarioCuenta = document.getElementById("usuarioCuenta");
	const usuarioSaldo = document.getElementById("usuarioSaldo");

    // Cambiamos la informacion principal
    usuarioNombre.innerHTML = dataUsuario.nombre;
    usuarioCuenta.innerHTML = dataUsuario.cuenta;
	usuarioSaldo.innerHTML 	= dataUsuario.saldo.toFixed(2);

	// Consultamos los movimientos
	const movimientos = consultaMovimientos();

	let movimientosTabla = $('#movimientosLista');
	let movimientosGrafica;
	createChart([0, 0, 0]);
	
	movimientosTabla.DataTable({
		pageLength: 5,
		lengthChange: false,
		responsive: true 
	});
        
	
    $("#consultar").click(function(event) {
		event.preventDefault();
		
		// Enviamos los datos de la grafica
		var datos = [movimientos.deposito, movimientos.retiros, movimientos.servicio];
		destroyChart();
		createChart(datos);

		// Mostramos los datos de la tabla
		movimientosTabla.DataTable().destroy();
		movimientos.movimientos.forEach(function(item) {
			var nuevaFila = document.createElement("tr");
			
			var fecha = document.createElement("td");
			fecha.textContent = item.fecha;
			nuevaFila.appendChild(fecha);

			var tipo = document.createElement("td");
			tipo.textContent = item.tipo;
			nuevaFila.appendChild(tipo);

			var monto = document.createElement("td");
			monto.textContent = "$"+item.monto.toFixed(2);
			nuevaFila.appendChild(monto);

			var saldo = document.createElement("td");
			saldo.textContent = "$"+item.saldo.toFixed(2);
			nuevaFila.appendChild(saldo);

			var tbody = document.querySelector("#movimientosLista tbody");
			tbody.appendChild(nuevaFila);
		});
		movimientosTabla.DataTable({
			pageLength: 5,
			lengthChange: false,
			responsive: true 
		});
	});
	
	function createChart(datos) {
		const data = {
			labels: ['Depositos', 'Retiros', 'Pagos'],
			datasets: [{
				label: 'Distribucion',
				data: datos,
				backgroundColor: ['rgb(40, 167, 69)','rgb(255, 205, 86)','rgb(54, 162, 235)'],
				hoverOffset: 4
			}]
		};
		
		const config = {
			type: 'pie',
			data: data,
		};
		
		const ctx = document.getElementById('movimientosChart').getContext('2d');
		movimientosGrafica = new Chart(ctx, config);
	}
	
	function destroyChart() {
    	movimientosGrafica.destroy();
    	movimientosGrafica = null;
    }
	
});
