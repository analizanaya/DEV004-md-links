const mdLinks = require('./index.js');
mdLinks('./README.md').then((resultado) => {
    console.log(resultado);
})
    .catch((error) => {
        console.log(error)
    });