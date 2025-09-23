Descripción General del Diseño
El diseño es un tema oscuro y minimalista centrado en la usabilidad y la limpieza visual. Utiliza una paleta de colores dominada por tonos oscuros de azul y morado (#1A1A2E y #2D2D44 aproximadamente) con toques de naranja para el logo y algunos íconos. La tipografía es sans-serif, moderna y fácil de leer, lo que contribuye a la sensación de limpieza. La página está estructurada en un diseño de cuadrícula simple y bien organizado.

Instrucciones Detalladas para el Diseño
1. Encabezado (Header)
Logo: En la esquina superior izquierda, hay un logo llamado "Weather Now" en texto blanco, junto a un ícono de sol y nube de color naranja.

Menú de Unidades: En la esquina superior derecha, hay un botón con un ícono de engranaje y el texto "Units". Al hacer clic, se despliega un menú que permite cambiar las unidades de temperatura (Celsius/Fahrenheit), velocidad del viento (km/h/mph) y precipitación (mm/in). El menú tiene esquinas redondeadas y un estilo oscuro.

2. Contenido Principal
Barra de Búsqueda de Ciudad: Centrada en la parte superior, hay una barra de búsqueda larga y horizontal. Es de color gris oscuro (#2D2D44 aproximadamente) con un texto de marcador de posición (placeholder) que dice "Search for a city, e.g., New York" y un ícono de lupa a la derecha. Al escribir, la barra puede mostrar un menú desplegable con sugerencias de ciudades.

Tarjetas de Información (Widgets): El contenido se divide en varias "tarjetas" o paneles con esquinas redondeadas y un fondo ligeramente más claro que el del cuerpo de la página.

Tarjeta de Clima Actual (Izquierda): Esta es la tarjeta más grande. En la parte superior, muestra la temperatura actual con un número grande y prominente (ej. 72°). Debajo, tiene la descripción del clima ("Partly Cloudy") y la ubicación con la fecha. En la parte inferior, esta misma tarjeta tiene una sección con cuatro métricas clave: "Feels like", "Humidity", "Wind" y "Precipitation", cada una con su valor correspondiente.

Pronóstico Diario (Parte Inferior): Una fila horizontal de tarjetas más pequeñas muestra el pronóstico para los próximos días. Cada tarjeta incluye el día de la semana, un ícono pequeño del clima y las temperaturas máxima y mínima. El diseño es compacto y fácil de escanear.

Pronóstico Horario (Derecha): Un panel vertical muestra el pronóstico hora por hora. Cada entrada tiene la hora, un ícono del clima y la temperatura. En la parte superior, tiene botones para seleccionar entre el día actual y el día siguiente.

Estados Adicionales (para una mejor experiencia de usuario)
Estado de Carga (Loading State): Cuando se cargan los datos, las tarjetas principales se reemplazan por "esqueletos" de contenido (bloques de color gris oscuro) y un indicador de carga animado de tres puntos que dice "Loading...". Esto le da al usuario retroalimentación visual de que la página está funcionando.

Estado de Error (Error State): En caso de un fallo en la API, la pantalla principal debe mostrar un ícono de advertencia y un mensaje claro como "Something went wrong", junto con una descripción del problema ("We couldn't connect to the server...") y un botón para "Retry".

