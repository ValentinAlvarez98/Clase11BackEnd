// Se importa fileURLToPath y dirname de la librería url y path respectivamente, para poder usar __dirname en el proyecto.
import {
      fileURLToPath
} from 'url';
import {
      dirname
} from 'path';

// Se crea la constante __filename y __dirname, para poder usarlas en el proyecto. Su uso es similar a como se usan en node.js. Se usa fileURLToPath para convertir la url de este archivo a una ruta de archivo, y dirname para obtener la ruta del directorio de este archivo.
const __filename = fileURLToPath(
      import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;