const fs = require('fs');
const pathUser = require('path');
//const markdownLinkExtractor = require('markdown-link-extractor');
const utils = require('./utils.js');
const mdLink = require('./cli.js')


const mdLinks = (path, options) => {
  console.log({ path })
  //resolve es como "then" y reject es como "catch". Son callbacks. Promesa resuelta y rechazada.
  return new Promise((resolve, reject) => {
    //identificar si la ruta existe
    const pathValid = utils.validatePath(path);
    console.log({ pathValid })
    if (pathValid) {
      console.log('Existing path')
    } else {
      //si no existe la ruta, rechaza la promesa
      reject('Path does not exist');
    }

    const directory = utils.isDirectory(path);
    if (directory.length === 0) {
      reject('Empty directory');
    }
    if (utils.isFile(path) && utils.isMdFile(path)) {

    }
    const fileRead = utils.readFiles(path);
    if (fileRead) {
      console.log("Files are being read..." + fileRead);
    }
    // leer archivos readFile

    //const links = markdownLinkExtractor(pathValid);
    const dataFile = utils.readFiles(path);


    if (links.length === 0) {
      reject('No links found in the MD file');
    } else {
      console.log(`Found ${links.length} in the MD file`);
      console.log(links);
    }
    foundMd = true;
  })
};
// module puede exportar objetos, funciones, etc.
module.exports = mdLinks; 
