const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.mostrarPeajes()
})

// recibiendo datos del input
const buscador = document.querySelector('#buscar input');

buscador.addEventListener('input', () => {
    if (buscador.value.length > 2) {
        // resultados de la busqueda
        ui.obtenerResultados(buscador.value);
    } else if (buscador.value.length === 0) {
        // mostrar peajes
        ui.mostrarPeajes();
    }
});