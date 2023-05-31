const path = require('path');
const fs = require('fs');
const axios = require('axios');

// Convertir a ruta absoluta
const solveToAbsolute = (route) => (path.isAbsolute(route) ? route : path.resolve(route));

const validatePath = (route) => {
    //retrna una promesa
    return new Promise((resolve, reject) => {
        fs.stat(route, (err, stats) => {
            if (stats) {
                resolve(true)
            } else {
                reject(false)
            }
            return stats
        })
    });
};

const validateDirectory = (route) => {
    return new Promise((resolve, reject) => {
        fs.stat(route, (err, stats) => {

            if (err) {
                reject(err);
            } else {
                resolve(stats.isDirectory());
            }
        });
    })
}

// Es un archivo
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


axios.get('https://axios-http.com/docs/example')
    .then(function (response) {
        console.log({ response });
    })
    .catch(function (error) {
        console.log(error);
    })



// Obtener todos los archivos md. desde un archivo o directorio, retonando un array de rutas (path)
const getAllFiles = (route) => {
    let arrayFile = [];
    if (archive(route)) {
        arrayFile.push(route);
    } else {
        validateDirectory(route).forEach((file) => {
            // path.join -> une varios segementos de la ruta para formar una sola ruta.
            const newPath = path.join(route, file);
            const recursive = getAllFiles(newPath);
            arrayFile = arrayFile.concat(recursive);
        });
    }

    const mdPath = arrayFile.filter((routa) => markDown(routa));
    return mdPath;
};

// Se obtiene todos los enlaces de archivos md,devuelve un array de objeto
const searchLinks = (route) => {
    const arrayLink = [];
    const absolutePath = solveToAbsolute(route);
    getAllFiles(absolutePath).forEach((file) => {
        const regExp = /\[(.*)\]\(((?!#).+)\)/gi;
        // match() => para obtener todas las ocurrencias de una expresión regular dentro de una cadena.
        // split() => divide un objeto de tipo String en un array.Especifica donde realizar cada corte.
        // slice()=> extrae una array indicandole el indice incial y el final
        const links = readFiles(file).match(regExp).map((e) => e.split('](')[1].slice(0, -1));
        const text = readFiles(file).match(regExp).map((e) => e.split('](')[0].slice(1));
        links.forEach((link, i) => {
            arrayLink.push({
                href: link,
                text: text[i],
                file,
            });
        });
    });

    return arrayLink;
};

// Peticion HTTP
const validateLinks = (arrLiknsValidate) => {
    const arr = arrLiknsValidate.map((obj) => (axios.get(obj.href))
        .then((url) => {
            if (url.status === 200) {
                return {
                    ...obj,
                    status: url.status,
                    message: url.statusText,
                };
            }
        })
        .catch(() => ({
            ...obj,
            status: 404,
            message: 'FAIL',
        })));
    return Promise.all(arr);
};


module.exports = {
    validatePath,
    isFile,
    isMdFile,
    readFiles,
    solveToAbsolute,
    validateDirectory,
    getAllFiles,
    searchLinks,
    validateLinks
};
