var map = L.map('map').setView([4.628004720962233, -74.0659032806953], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([4.628004720962233, -74.0659032806953]).addTo(map);

// Abrir el archivo Geojson 
// Java se ejecuta de tal manera que si una linea de codigo se demora se pasa a la siguiente sin esperar
//esto puede generar problemas cuando se requiere secuencialidad 

async function  cargarPuntos(){

 var miArchivo= await fetch("microondas.geojson");

  //convertir el contenido a json: objeto js 

  var datos= await miArchivo.json();

 //obtener el arreglo de la llave features que es un conjunto de objetos tipo feature

  let listaFeatures= datos["features"]; 
  for(let i=0; i<=9; i++){

      let misCoordenadas= listaFeatures[i]["geometry"]["coordinates"];
      var miMarcador= L.marker(misCoordenadas);
      miMarcador.addTo(map);


console.log(i);  

       }

};
cargarPuntos();

var marker = L.marker([4.6187767453621245, -74.08614486825977],
  {alt: 'Kyiv'}).addTo(map) 
  .bindPopup( 
       {
 "precioDescuento":259.900,
   "precio": 449.900,
  "alto": "26.2 cm",
   "ancho": "45.2  cm",
 "profundidad":"34 cm",
   "capacidad": "0.7  Pies Cubicos",
   "modelo": "ACROS",
 "potencia": "700",
   "voltaje": "110 V"});