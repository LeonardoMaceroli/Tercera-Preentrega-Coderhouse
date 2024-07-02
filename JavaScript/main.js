const opciones = ['PIEDRA', 'PAPEL', 'TIJERAS', 'LAGARTO', 'SPOCK'];
let victorias = 0;
let derrotas = 0;
let empates = 0;
let partidasJugadas = 0;

// Mostrar mensajes de bienvenida
Toastify({
    text: "Espero disfrutes del juego",
    duration: 3000
}).showToast();

Toastify({
    text: "Bienvenido/a",
    duration: 3000
}).showToast();

// Asignar eventos de clic a las opciones de juego
document.querySelectorAll('.opcion').forEach(img => {
    img.addEventListener('click', (event) => {
        const usuario = Number(event.target.dataset.eleccion);
        jugar(usuario);
    });
});

// Asignar evento de clic al botón de reiniciar
document.getElementById('reiniciar').addEventListener('click', reiniciarEstadisticas);

// Función para obtener una elección aleatoria de la CPU
function aleatorio() {
    return Math.floor(Math.random() * 5);
}

// Función principal del juego
function jugar(usuario) {
    const cpu = aleatorio();
    mostrarEleccion(usuario, true);
    mostrarEleccion(cpu, false);
    mostrarResultado(usuario, cpu);
    actualizarEstadisticas();
    guardarEstadisticas();
}

// Mostrar la elección del jugador o de la CPU
function mostrarEleccion(eleccion, esJugador) {
    const tipo = esJugador ? 'Elegiste' : 'La CPU eligió';
    Swal.fire({
        title: tipo,
        text: opciones[eleccion],
        icon: 'info',
        confirmButtonText: 'Aceptar'
    });
}

// Mostrar el resultado del juego
function mostrarResultado(usuario, cpu) {
    let mensaje = '';
    if (usuario === cpu) {
        mensaje = 'Fue un empate';
        empates++;
    } else if (
        (usuario === 0 && (cpu === 2 || cpu === 3)) || 
        (usuario === 1 && (cpu === 0 || cpu === 4)) ||
        (usuario === 2 && (cpu === 1 || cpu === 3)) ||
        (usuario === 3 && (cpu === 1 || cpu === 4)) ||
        (usuario === 4 && (cpu === 0 || cpu === 2))
    ) {
        mensaje = '¡Felicidades! ¡Ganaste!';
        victorias++;
    } else {
        mensaje = 'Perdiste. Mejor suerte para la próxima';
        derrotas++;
    }
    partidasJugadas++;

    Swal.fire({
        title: 'Resultado del juego',
        html: `
            <p>La CPU eligió: ${opciones[cpu]}</p>
            <p>${mensaje}</p>
        `,
        confirmButtonText: 'Aceptar'
    });
}

// Actualizar estadísticas en la interfaz
function actualizarEstadisticas() {
    document.getElementById('partidasJugadas').textContent = `Partidas jugadas: ${partidasJugadas}`;
    document.getElementById('victorias').textContent = `Victorias: ${victorias}`;
    document.getElementById('derrotas').textContent = `Derrotas: ${derrotas}`;
    document.getElementById('empates').textContent = `Empates: ${empates}`;
}

// Guardar estadísticas en el Local Storage
function guardarEstadisticas() {
    const estadisticas = {
        partidasJugadas,
        victorias,
        derrotas,
        empates
    };
    localStorage.setItem('estadisticas', JSON.stringify(estadisticas));
}

// Cargar estadísticas del Local Storage
function cargarEstadisticas() {
    const estadisticas = JSON.parse(localStorage.getItem('estadisticas'));
    if (estadisticas) {
        partidasJugadas = estadisticas.partidasJugadas;
        victorias = estadisticas.victorias;
        derrotas = estadisticas.derrotas;
        empates = estadisticas.empates;
        actualizarEstadisticas();
    }
}

// Reiniciar estadísticas y actualizar la interfaz
function reiniciarEstadisticas() {
    partidasJugadas = 0;
    victorias = 0;
    derrotas = 0;
    empates = 0;
    actualizarEstadisticas();
    guardarEstadisticas();
}

// Inicializar el juego cargando las estadísticas
cargarEstadisticas();
actualizarEstadisticas();