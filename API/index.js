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
    utils.validatePath(path) //retorna promesa
      .then(
        (isValid) => {
          console.log(isValid)
          if (isValid) {
            console.log('Existing path')
          } else {
            //si no existe la ruta, rechaza la promesa
            reject('Path does not exist');
            return;
          }
        }
      );

    utils.validateDirectory(path)
      .then(
        (directoryExist) => {
          console.log(directoryExist)
          if (directoryExist) {
            console.log('Existing directory')
          } else {
            reject('directory does not exist');
            return;
          }
        }
      );


    /*
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
        foundMd = true;*/
  })

};
// module puede exportar objetos, funciones, etc.
module.exports = mdLinks; 
