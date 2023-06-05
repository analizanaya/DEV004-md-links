const mdLinksCLI = require('./index.js');

const path = './readme/README.md';
const options = {
    validate: true, // Activar validación de los links
    stats: true, // Activar estadísticas de los links
};

mdLinksCLI(path, options)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });