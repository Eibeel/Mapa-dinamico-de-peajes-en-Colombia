class API {

    async obtenerDatos() {
        // obtener datos de la API
        const obtenerDatos = await fetch('https://sig.ani.gov.co/arcgissrv/rest/services/3_DatosAbiertos/OpenDataICDE/FeatureServer/0/query?where=1%3D1&outFields=IdPea,Nombre,CodVia,Pr,Departamento,Municipio,Longitud,Latitud&returnGeometry=false&outSR=4326&f=json');

        // retornar datos en JSON
        const datosJSON = await obtenerDatos.json();

        return {datosJSON}
    }
}

/* const url =
    "https://sig.ani.gov.co/arcgissrv/rest/services/3_DatosAbiertos/OpenDataICDE/FeatureServer/0/query?where=1%3D1&outFields=IdPea,Nombre,CodVia,Pr,Departamento,Municipio,Longitud,Latitud&returnGeometry=false&outSR=4326&f=json";

async function peajes(buscarDepartamento) {
    // consumir API
    const obtenerDatos = await fetch(url);

    // obtener datos en JSON
    const datosJSON = await obtenerDatos.json();

    // datos de la API obtenidos
    const datos = await datosJSON.features;

    datos.forEach(data => {
        // consultar datos
        const departamentos = data.attributes.Departamento;
        const nombrePeaje = data.attributes.Nombre;

        // comprobacion de busqueda
        if (departamentos === buscarDepartamento) {
            console.log(departamentos)
        } else if (buscarDepartamento === '') {
            console.log(nombrePeaje)
        }
    });
}

peajes(''); */
