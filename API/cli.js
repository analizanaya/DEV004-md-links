const mdLinksCLI = require('./index.js');
mdLinksCLI('./readme/README.md').then((resultado) => {
    console.log(resultado);
})
    .catch((error) => {
        console.log(error)
    });