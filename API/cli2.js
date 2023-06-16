#!/usr/bin/env node
const mdLinksCLI = require('./index.js');
const process = require('process');

const commandPath = process.argv[2];
const options = {
    help: process.argv.includes('--help'),
    validate: process.argv.includes('--validate'),
    stats: process.argv.includes('--stats'),
    validateAndStats: process.argv.includes('--stats') && process.argv.includes('--validate'),
};

if (process.argv.length < 3 || commandPath === undefined) {
    console.log('Invalid path or does not exist');
    return;
} else {
    mdLinksCLI(commandPath, options)
        .then((result) => {
            console.log({ result })
            if (options.help) {
                console.log('\nHelp: ');
                console.log('\n--Validate: Sirve para...');
                console.log('\n--Stats: Sirve para...');
                console.log('\n--Validate --Stats: Sirve para...');
            } else if (options.validateAndStats) {
                console.log('\nStats & Validate: ');
                console.log('\nTotal: ', result.stats.total);
                console.log('\nUnique: ', result.stats.unique);
                console.log('\nBroken: ', result.broken);
            } else if (options.stats) {
                --
                console.log('\nStats: ');
                console.log('\nTotal: ', (result.total));
                console.log('\nUnique: ', (result.unique));
            } else {
                console.log('\nLinks Validate: ');
                result.links.forEach((link) => {
                    console.log(link);
                });
            }
        })
        .catch((error) => {
            console.error(error);
        });
}