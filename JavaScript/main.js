const opciones = ['PIEDRA', 'PAPEL', 'TIJERAS', 'LAGARTO', 'SPOCK'];
let victorias = 0;
let derrotas = 0;
let empates = 0;
let partidasJugadas = 0;

Toastify({

    text: "Espero disfrutes del juego",
    
    duration: 3000
    
    }).showToast();

Toastify({

    text: "Bienvenido/a",
    
    duration: 3000
    
    }).showToast();



document.querySelectorAll('.opcion').forEach(img => {
    img.addEventListener('click', (event) => {
        const usuario = Number(event.target.dataset.eleccion);
        jugar(usuario);
    });
});

document.getElementById('reiniciar').addEventListener('click', reiniciarEstadisticas);

function aleatorio() {
    return Math.floor(Math.random() * 5);
}

function jugar(usuario) {
    const cpu = aleatorio();
    mostrarEleccion(usuario, true);
    mostrarEleccion(cpu, false);
    mostrarResultado(usuario, cpu);
    actualizarEstadisticas();
    guardarEstadisticas();
}

//Elecciones
function mostrarEleccion(eleccion, esJugador) {
    const tipo = esJugador ? 'Elegiste' : 'La CPU eligió';
    Swal.fire({
        title: tipo,
        text: opciones[eleccion],
        icon: 'info',
        confirmButtonText: 'Aceptar'
    });
}

//Resultados
function mostrarResultado(usuario, cpu) {
    let mensaje = '';
    if (usuario === cpu) {
        mensaje = 'Fue un empate';
        empates++;
    } else if (
        //0 = piedra, 1 = papel, 2 = tiejras, 3 = lagarto, 4 = spock
        (usuario === 0 && cpu === 2) || 
        (usuario === 0 && cpu === 3) ||
        (usuario === 1 && cpu === 0) ||
        (usuario === 1 && cpu === 4) ||
        (usuario === 2 && cpu === 1) ||
        (usuario === 2 && cpu === 3) ||
        (usuario === 3 && cpu === 1) ||
        (usuario === 3 && cpu === 4) ||
        (usuario === 4 && cpu === 0) ||
        (usuario === 4 && cpu === 2)
    ) {
        mensaje = '¡Felicidades! ¡Ganaste!';
        victorias++;
    } else {
        mensaje = 'Perdiste. Mejor suerte para la próxima';
        derrotas++;
    }
    partidasJugadas++;

    //SweetAlert
    Swal.fire({
        title: 'Resultado del juego',
        html: `
            <p>La CPU eligió: ${opciones[cpu]}</p>
            <p>${mensaje}</p>
        `,
        confirmButtonText: 'Aceptar'
    });
}

//Local storage
function actualizarEstadisticas() {
    document.getElementById('partidasJugadas').textContent = `Partidas jugadas: ${partidasJugadas}`;
    document.getElementById('victorias').textContent = `Victorias: ${victorias}`;
    document.getElementById('derrotas').textContent = `Derrotas: ${derrotas}`;
    document.getElementById('empates').textContent = `Empates: ${empates}`;
}

function guardarEstadisticas() {
    localStorage.setItem('partidasJugadas', partidasJugadas);
    localStorage.setItem('victorias', victorias);
    localStorage.setItem('derrotas', derrotas);
    localStorage.setItem('empates', empates);
}

function cargarEstadisticas() {
    if (localStorage.getItem('partidasJugadas')) {
        partidasJugadas = Number(localStorage.getItem('partidasJugadas'));
        victorias = Number(localStorage.getItem('victorias'));
        derrotas = Number(localStorage.getItem('derrotas'));
        empates = Number(localStorage.getItem('empates'));
        actualizarEstadisticas();
    }
}

function reiniciarEstadisticas() {
    partidasJugadas = 0;
    victorias = 0;
    derrotas = 0;
    empates = 0;
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = '';
    actualizarEstadisticas();
    guardarEstadisticas();
}

cargarEstadisticas();
actualizarEstadisticas();
