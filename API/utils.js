const path = require('path');
const fs = require('fs');
const pathUser = require('path');


// normalizar/estandarizar la forma en que se representa una ruta de archivo.
const normalizePath = (route) => path.normalize(route);
// Convertir a ruta absoluta
// const solveToAbsolute = (route) => (path.isAbsolute(route) ? route : path.resolve(route));

const validatePath = (route) => {

    //retrna una promesa
    return new Promise((resolve, reject) => {
        fs.stat(route, (err, stats) => {
            if (stats) {
                resolve(true)
            } else {
                //no existe
                //reject
                resolve(false)
            }

            return stats
        })
    });

    // condición ? valor si verdadero : valor si falso
    // pathUser.resolve convierte la ruta en absoluta


    /* ? pathUser.resolve(route) : false;
    return existingpath; */
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
const readFiles = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            const matches = data.match(regex);
            resolve(matches || []);
        });
    });
};

// Es un directorio
const validateDirectory = (route) => {
    return new Promise((resolve, reject) => {
        fs.stat(route, (err, stats) => {

            if (err) {
                // Error al obtener información del archivo o directorio
                reject(err);
            } else {
                resolve(stats.isDirectory());
            }
        });
    })
}


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
    validateDirectory,
    pathExists,
    readDir
};
