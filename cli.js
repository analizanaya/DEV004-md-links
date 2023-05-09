const mdLinks = require('./index.js');
mdLinks('./readme').then((resultado) => {
    console.log(resultado);
})
    .catch((error) => {
        console.log(error)
    });