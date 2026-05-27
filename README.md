
# [Noticias App]

## Descripción Breve

Esta aplicación es un visualizador de noticias que consume la API de [NewsAPI](https://newsapi.org/) para ofrecer una experiencia de lectura personalizada y sin distracciones. Su objetivo es permitir a los usuarios no solo leer los titulares, sino también gestionar su consumo de información a través de potentes filtros, organización personal y modos de visualización adaptables.

## Funcionalidades Principales

*   **Búsqueda Avanzada:** Encuentra artículos por titular, categoría (negocios, tecnología, deportes, etc.), fuente, idioma, país y rango de fechas.
*   **Explorador de Fuentes:** Descubre y filtra medios de comunicación.
*   **Favoritos sin Conexión:** Guarda artículos en el navegador para leerlos sin internet y descargarlos como archivos.
*   **Personalización:** ajuste de fuente, idioma por defecto y gestión de permisos (geolocalización).
*   **Navegación Intuitiva:** Barra inferior para acceder rápidamente a inicio, búsqueda, guardados y configuración.

## Tecnologías Utilizadas

*   **Frontend:** Expo implementando React Native
*   **APIs:** NewsAPI

## Instalación y Ejecución

### Prerrequisitos

**Para su ejecución**

Tecnologías necesarias:

- Node.js.
- Expo.
- npm.

NewsAPI:

- Necesita tener una cuenta registrada en https://newsapi.org/ y una API key vigente.

**Para su visualización**

- Contar con un emulador de dispositivos moviles o en su defecto un dispositivo movile con acceso a internet.

- Tener instalada la aplicación Expo Go en el dispositivo o emulador mencionado.

## Dependencies

| Package | Version |
|--------|---------|
| @react-native-async-storage/async-storage | 2.2.0 |
| @react-native-community/checkbox | ^0.5.20 |
| @react-native-community/datetimepicker | 8.6.0 |
| @react-native-masked-view/masked-view | 0.3.2 |
| @react-native-picker/picker | 2.11.4 |
| @react-navigation/stack | ^7.8.5 |
| axios | ^1.13.6 |
| expo | ~55.0.6 |
| expo-font | ~55.0.4 |
| expo-image | ~55.0.6 |
| expo-localization | ^56.0.6 |
| expo-location | ~55.1.10 |
| expo-secure-store | ~55.0.14 |
| expo-status-bar | ~55.0.4 |
| react | 19.2.0 |
| react-native | 0.83.2 |
| react-native-gesture-handler | ~2.30.0 |

### Pasos

1. Clona este repositorio:

    `git clone https://github.com/JuanL250403/NoticiasApp-ProyectoDPS.git`

2. Instala las dependencias que la aplicación necesita:

    `npm install`

3. Variables de entorno:

- Crear un archivo .env.local.
- Colocar una variable de entorno EXPO_PUBLIC_API_KEY que contenga la API key brindado por NewsAPI.

4. Inica la aplicación:

    `npx expo start`

5. Visualización de la aplicación:

 Al ejecutarse la aplicación te proporcionara un QR, además de un enlace, que te permitira visualizar la aplicación desde un dispositivo movil o un emulador a través de expo GO.

## Integrantes del Equipo

- **Rene Osmin Aparicio Ruiz** - `AR240329`
- **Justin Alfredo Rodriguez Sanchez** - `RS240130`
- **Valeria del Rosario Montano González** - `MG250290`
- **Xenia Carolina Sánchez Mancia** - `SM232984`
- **Juan Manuel Leiva Montes** - `LM250403`
