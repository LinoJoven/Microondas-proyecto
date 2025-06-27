document.addEventListener('DOMContentLoaded', function() {
    async function cargarModelos() {
        try {
            const response = await fetch("microondas.geojson");
            if (!response.ok) {
                // Si el GeoJSON no se carga, lanza un error claro
                throw new Error(`Error HTTP al cargar microondas.geojson! Estado: ${response.status}`);
            }
            const data = await response.json();
            const listaFeatures = data.features;
            const modelosContainer = document.getElementById('modelos-container');
            const productGrid = document.createElement('div');
            productGrid.className = 'product-grid';

            // Array para mapear el índice al nombre de archivo de la imagen y su extensión
            // ¡Asegúrate de que este ORDEN y los NOMBRES/EXTENSIONES sean EXACTOS
            // a los de tus archivos de imagen en la carpeta 'imagenes'!
            const imageFiles = [
                '1.webp', '2.jpg', '3.webp', '4.jpeg', '5.jpeg',
                '6.jpeg', '7.jpeg', '8.jpeg', '9.webp', '10.png'
            ];
            
            // La carpeta donde están tus imágenes. Asume que 'imagenes' está al mismo nivel que modelos.html
            const imageFolderPath = 'imagenes/';

            listaFeatures.forEach((feature, index) => { // Añadimos 'index' para usarlo con las imágenes
                const propiedades = feature.properties;

                let imageHtml = '';
                // Solo intenta añadir la imagen si hay un nombre de archivo para este índice
                if (imageFiles[index]) {
                    const imagePath = imageFolderPath + imageFiles[index];
                    
                    // *** ESTA LÍNEA ES CLAVE PARA LA DEPURACIÓN ***
                    // Abre tu consola del navegador (F12) y verás la ruta que intenta cargar
                    console.log(`Intentando cargar imagen: ${imagePath}`); 

                    imageHtml = `<img src="${imagePath}" alt="Microondas ${propiedades.modelo}" class="product-image">`;
                }

                const productCard = `
                    <div class="product-card">
                        ${imageHtml} <h3>Microondas Modelo ${propiedades.modelo}</h3>
                        <p><strong>Precio:</strong> $${propiedades.precioDescuento.toLocaleString('es-CO')} / <del>$${propiedades.precio.toLocaleString('es-CO')}</del></p>
                        <ul>
                            <li><strong>Alto:</strong> ${propiedades.alto}</li>
                            <li><strong>Ancho:</b> ${propiedades.ancho}</li>
                            <li><strong>Profundidad:</strong> ${propiedades.profundidad}</li>
                            <li><strong>Capacidad:</strong> ${propiedades.capacidad}</li>
                            <li><strong>Potencia:</strong> ${propiedades.potencia} W</li>
                            <li><strong>Voltaje:</strong> ${propiedades.voltaje}</li>
                        </ul>
                        <button>Ver Detalles</button>
                    </div>
                `;
                productGrid.innerHTML += productCard;
            });
            modelosContainer.appendChild(productGrid);
        } catch (error) {
            console.error("Error general al cargar los modelos o imágenes:", error);
            const modelosContainer = document.getElementById('modelos-container');
            modelosContainer.innerHTML = '<p>Lo sentimos, hubo un problema al cargar los modelos de microondas. Por favor, revisa la consola del navegador para más detalles.</p>';
        }
    }

    cargarModelos();
});