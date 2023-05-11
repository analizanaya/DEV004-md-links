const path = require('path');
const fs = require('fs');


// normalizar/estandarizar la forma en que se representa una ruta de archivo.
const normalizePath = (route) => path.normalize(route);
// Convertir a ruta absoluta
// const solveToAbsolute = (route) => (path.isAbsolute(route) ? route : path.resolve(route));

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
// Es un directorio
const isDirectory = (route) => fs.statSync(route).isDirectory();
// Path/ruta existe
const pathExists = (route) => fs.existsSync(route);
// Leer el contenido del directorio 
const readDir = (route) => fs.readdirSync(route);

module.exports = {
    normalizePath,
    isFile,
    isMdFile,
    isDirectory,
    pathExists,
    readDir
};
