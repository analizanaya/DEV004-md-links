const path = require('path');
const fs = require('fs');
const axios = require('axios');

//Validar si la ruta existe
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

// Convertir a ruta absoluta
const solveToAbsolute = (route) => (path.isAbsolute(route) ? route : path.resolve(route)); //operador ternario

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

// Leer el archivo
const readFiles = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const regex = /\[(.*)\]\(((?!#).+)\)/gi;
            const matches = data.match(regex);
            resolve(matches || []);
        });
    });
};

const validateLinks = (arrLinksValidate) => {
    const arr = arrLinksValidate.map((obj) =>
        axios
            .get(obj.href)
            .then((response) => {
                return {
                    ...obj,
                    status: response.status,
                    message: response.statusText,
                };
            })
            .catch(() => ({
                ...obj,
                status: 404,
                message: 'FAIL',
            }))
    );
    return Promise.all(arr);
};


const getStats = (links) => {
    const stats = {
        total: links.length,
        unique: getUniqueLinks(links).length,
    };
    return stats;
};

const getUniqueLinks = (links) => {
    const uniqueLinks = [];
    const visitedLinks = new Set();

    links.forEach((link) => {
        if (!visitedLinks.has(link.href)) {
            uniqueLinks.push(link);
            visitedLinks.add(link.href);
        }
    });

    return uniqueLinks;
};


module.exports = {
    validatePath,
    isFile,
    isMdFile,
    readFiles,
    solveToAbsolute,
    validateDirectory,
    validateLinks,
    getStats,
    getUniqueLinks
};