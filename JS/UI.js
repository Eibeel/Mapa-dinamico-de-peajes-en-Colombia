class UI {
    constructor() {

        // Instanciar la API
        this.api = new API()

        // crear markers con layerGroup
        this.markers = new L.LayerGroup()

        // Iniciar el mapa
        this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
        // Inicializar y obtener la propiedad del mapa
        const map = L.map('mapa', { center: [4.645345, -74.3390061], zoom: 6 });

        const enlaceMapa = '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

        L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
            foo: 'bar',
            attribution: '&copy;' + enlaceMapa + ' contributors',
            maxZoom: 18,
        }).addTo(map)

        return map;
    }

    // Mostrar Establecimientos de la api
    mostrarPeajes() {
        this.api.obtenerDatos()
            .then(datos => {

                let arregloDepartamentos = []

                const resultados = datos.datosJSON.features;

                // recorremos arreglo de objetos
                resultados.map(item => {
                    // push de objetos
                    arregloDepartamentos.push(item.attributes)
                })

                // pasamos resultados a los pines
                this.mostrarPins(arregloDepartamentos)
            })
    }

    // pines por filtro
    mostrarPins(datos) {

        this.markers.clearLayers()

        datos.forEach(data => {
            // consulta de datos
            const departamentos = data.Departamento;
            const nombrePeaje = data.Nombre;
            const precio = data.Pr;
            const latitud = data.Latitud;
            const longitud = data.Longitud;

            const opcionesPopUp = L.popup()
                .setContent(
                    `
                    <p><b>Departamento:</b> ${departamentos}</p>
                    <p><b>Municipio:</b> ${nombrePeaje}</p>
                    <p><b>Precio estimado:</b> $${precio}</p>
                    `)

            // marker mediante long. & lat.
            const marker = new L.marker([
                parseFloat(latitud),
                parseFloat(longitud)
            ]).bindPopup(opcionesPopUp)

            this.markers.addLayer(marker);

        })
        this.markers.addTo(this.mapa)
    }

    // obtener datos para la busqueda
    obtenerResultados(busqueda) {
        this.api.obtenerDatos()
            .then(datos => {
                // Obtener los resultados
                const resultados = datos.datosJSON;

                let arregloDepartamentos = []

                resultados.features.map(item => {
                    arregloDepartamentos.push(item.attributes)
                })

                this.filtrarDatos(arregloDepartamentos, busqueda);
            })
    }

    // filtro de datos
    filtrarDatos(arregloDepartamentos, busqueda) {
        const filtro = arregloDepartamentos.filter(filtro => filtro.Departamento.indexOf(busqueda) !== -1);

        // Mostrar pines del Filtro
        this.mostrarPins(filtro);
    }
}
