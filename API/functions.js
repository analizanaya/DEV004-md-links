const pathUser = require('path');
const utilsMd = require('./utils.js');

// Validar ruta
const validatePath = (path) => {
    const pathNormalize = utilsMd.normalizePath(path);
    // condición ? valor si verdadero : valor si falso
    // pathUser.resolve convierte la ruta en absoluta
    const existingpath = utilsMd.pathExists(pathNormalize) ? pathUser.resolve(pathNormalize) : false;
    return existingpath;
};

module.exports = {
    validatePath
}