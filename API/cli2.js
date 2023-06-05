#!/usr/bin/env node
const mdLinksCLI = require('./index.js');
const process = require('process');

const commandPath = process.argv[2];
const options = {
    validate: process.argv.includes('--validate'),
    stats: process.argv.includes('--stats'),
    validateAndStats: process.argv.includes('--stats') && process.argv.includes('--validate'),
};
// console.log({ options });

if (process.argv.length < 3 || commandPath === undefined) {
    console.log('Invalid path or does not exist');
    return;
} else {
    mdLinksCLI(commandPath, options)
        .then((result) => {
            console.log({ result })
            if (options.validateAndStats) {
                console.log('\nStats & Validate: ');
                console.log('\nTotal: ');
                console.log('\nUnique: ');
                console.log('\nBroken: ');
            } else if (options.stats) {
                console.log('\nStats: ');
                console.log('\nTotal: ');
                console.log('\nUnique: ');
            } else {
                console.log('\nLinks Validate: ');
                //console.log(result);
                result.links.forEach((link) => {
                    console.log(link);
                });
            }
        })
        .catch((error) => {
            console.error(error);
        });
}