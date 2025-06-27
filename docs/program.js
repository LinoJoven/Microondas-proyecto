var map = L.map('map').setView([4.628004720962233, -74.0659032806953], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Eliminar este marcador si ya no lo necesitas, ya que los puntos del GeoJSON se añadirán.
// var marker = L.marker([4.628004720962233, -74.0659032806953]).addTo(map);

async function cargarPuntos(){
    var miArchivo = await fetch("microondas.geojson");
    var datos = await miArchivo.json();

    let listaFeatures = datos["features"]; 
    for(let i = 0; i < listaFeatures.length; i++){ // Itera sobre todos los elementos de la lista
        let feature = listaFeatures[i];
        let misCoordenadas = feature["geometry"]["coordinates"];
        let propiedades = feature["properties"];

        // Crear el contenido del popup con las especificaciones
        let popupContent = `
            <b>Modelo:</b> ${propiedades.modelo}<br>
            <b>Precio Descuento:</b> ${propiedades.precioDescuento}<br>
            <b>Precio:</b> ${propiedades.precio}<br>
            <b>Alto:</b> ${propiedades.alto}<br>
            <b>Ancho:</b> ${propiedades.ancho}<br>
            <b>Profundidad:</b> ${propiedades.profundidad}<br>
            <b>Capacidad:</b> ${propiedades.capacidad}<br>
            <b>Potencia:</b> ${propiedades.potencia}<br>
            <b>Voltaje:</b> ${propiedades.voltaje}
        `;

        var miMarcador = L.marker(misCoordenadas);
        miMarcador.addTo(map).bindPopup(popupContent); // Adjuntar el popup al marcador

        console.log(i);  
    }
}

cargarPuntos();

