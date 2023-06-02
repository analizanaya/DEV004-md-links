const path = require('path');
const fs = require('fs');
const fetch = require('cross-fetch').default;

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

            const links = matches.map((match) => {
                const linkRegex = /\[(.*)\]\(((?!#).+)\)/i;
                const [, text, url] = linkRegex.exec(match);
                const absoluteUrl = new URL(url, `file://${path}`).href; // Convertir URL relativa a absoluta
                return { text, url: absoluteUrl, file: path };
            });

            resolve(links);
        });
    });
};

const validateLinks = (url, file, text) => {
    console.log(url);
    return fetch(url)
        .then(response => {
            const finalUrl = response.url;
            if (response.ok) {
                return {
                    url: url,
                    status: response.status,
                    statusText: response.statusText,
                    file: file,
                    text: text,
                };
            } else {
                throw new Error(`Not found ${finalUrl}`)
            }
        })
        .catch((error) => {
            const failedLink = {
                url: url,
                status: 404,
                message: 'FAIL',
            };
            console.error(error);
            return failedLink;
        })
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
