const path = require('path');
const fs = require('fs');
const pathUser = require('path');


// normalizar/estandarizar la forma en que se representa una ruta de archivo.
const normalizePath = (route) => path.normalize(route);
// Convertir a ruta absoluta
// const solveToAbsolute = (route) => (path.isAbsolute(route) ? route : path.resolve(route));

const validatePath = (route) => {
    const pathNormalize = utilsMd.normalizePath(route);
    // condición ? valor si verdadero : valor si falso
    // pathUser.resolve convierte la ruta en absoluta
    const existingpath = utilsMd.pathExists(pathNormalize) ? pathUser.resolve(pathNormalize) : false;
    return existingpath;
};

// Es un archivo
// SÍNCRONO const isFile = (route) => fs.lstatSync(route).isFile();
// ASÍNCRONO
const isFile = (route) => {
    return fs.promises.lstat(route)
        .then((stats) => {
            return stats.isFile();
        })
        .catch((error) => {
            console.error(error);
            return false;
        });
};
// Es un archivo .md
const isMdFile = (route) => (path.extname(route) === '.md');

// Leer archivo
// Ruta al archivo que deseas leer
const filePath = './README.md'
//'/ruta/al/archivo.txt';

// Expresión regular para buscar coincidencias
const regex = /https:\/\/[^\s]+/g;

// Leer el archivo
const readFiles = () => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // Buscar coincidencias en el contenido del archivo
        const matches = data.match(regex);

        // Hacer algo con las coincidencias encontradas
        if (matches) {
            console.log('Matches found:');
            console.log(matches);
        } else {
            console.log('No matches found.');
        }
    })
}



// Es un directorio
const isDirectory = (route) => fs.statSync(route).isDirectory();
// Path/ruta existe
const pathExists = (route) => fs.existsSync(route);
// Leer el contenido del directorio 
const readDir = (route) => fs.readdirSync(route);

module.exports = {
    validatePath,
    normalizePath,
    isFile,
    isMdFile,
    readFiles,
    isDirectory,
    pathExists,
    readDir
};
