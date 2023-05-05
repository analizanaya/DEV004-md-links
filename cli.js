const { mdLinks } = require('./index.js');
mdLinks('./readme').then(() => { })
    .catch((error) => {
        console.log(error)
    });