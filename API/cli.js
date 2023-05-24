const mdLinksCLI = require('./index.js');
mdLinksCLI('./readme').then((resultado) => {
    console.log(resultado);
})
    .catch((error) => {
        console.log(error)
    });