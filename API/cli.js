const mdLinksCLI = require('./index.js');
const process = require('process');

const path = './readme/README.md';
const commandPath = process.argv[2];
const options = {
    validate: process.argv.includes('--validate'),
    stats: process.argv.includes('--stats'),
    statsAndValidate: process.argv.includes('--stats') && process.argv.includes('--validate')
};

mdLinksCLI(commandPath, options)
    .then((results) => {
        if (process.argv.length < 3 || commandPath === undefined) {
            console.log('Invalid path or doesn\'t exist');
            return;
        } else if (options.statsAndValidate) {
            console.log('\nStats & Validate: ');
            console.log('\nTotal: ');
            console.log('\nUnique: ');
            console.log('\nBroken: ');
        } else if (options.stats) {
            console.log('\nStats: ');
            console.log('\nTotal: ');
            console.log('\nUnique: ');
        } else if (options.validate) {
            console.log('\nLinks Validate: ');
            results.forEach((link) => {
                console.log(link);
            });
        }
    })
    .catch((error) => {
        console.error(error);
    });

mdLinksCLI(path, options)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    }); 