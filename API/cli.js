/* const mdLinksCLI = require('./index.js');
mdLinksCLI('./readme/README.md').then((resultado) => {
    console.log(resultado);
})
    .catch((error) => {
        console.log(error)
    }); */

const mdLinksCLI = require('./index.js');
mdLinksCLI('./readme/README.md', { validate: true })
    .then((links) => {
        // Hacer algo con los enlaces
    })
    .catch((error) => {
        // Manejar el error
    });