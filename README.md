# MetroAssist

MetroAssist es una aplicación web diseñada para asistir en la gestión de accidentes y situaciones en las autopistas gestionadas por Metropistas. Proporciona herramientas para generar borradores de informes de accidentes, asistencia en carretera y reportes finales, incluyendo la generación de tuits para notificaciones en redes sociales.

## Estructura del Proyecto

El proyecto está compuesto por dos archivos principales:

- `index.html`: Contiene la estructura y el diseño de la página web.
- `script.js`: Contiene la lógica para manejar la interacción del usuario y la generación de borradores, asistencia y reportes.

## Características

### Pestañas de Navegación

El sitio web está dividido en tres pestañas principales:

1. **Generador de Accidente**: Formulario para recopilar y generar un borrador de un informe de accidente.
2. **Generador de Asistencia**: Formulario para documentar la asistencia proporcionada en carretera.
3. **Reporte Final**: Formulario detallado para completar un reporte final en casos de derrame, accidentes fatales, heridos graves o daños a la propiedad de Metropistas.

### Formulario de Accidente

El formulario de accidente incluye campos para:

- Información del accidente (autopista, dirección, hora, etc.)
- Detalles de los carriles ocupados y abiertos
- Agencias y policía involucrada
- Daños a la propiedad y heridos
- Situaciones específicas según los protocolos INS-052 V3

### Generador de Borradores

El generador de borradores crea un resumen estructurado del accidente que incluye:

- Descripción de la situación
- Estado de la policía y agencias involucradas
- Daños a la propiedad y reporte de heridos
- Sugerencias de asunto y cuerpo del correo electrónico para notificar a las partes relevantes

### Generador de Tweets

Permite seleccionar el tipo de incidente y genera un tweet preformateado listo para ser publicado.

### Formulario de Asistencia

Documenta la asistencia proporcionada a vehículos en carretera, incluyendo:

- Unidad de asistencia
- Detalles del vehículo asistido
- Tipo de servicio proporcionado

### Reporte Final

Para casos de accidentes más graves, se puede completar un reporte final con información detallada de los vehículos involucrados, policías en la escena, y otros detalles relevantes.

## Uso

1. Clonar el repositorio.
2. Abrir `index.html` en un navegador web.
3. Navegar entre las pestañas para ingresar la información requerida.
4. Utilizar los botones correspondientes para generar borradores, asistencia y reportes finales.