const fs = require('fs');
const pathUser = require('path');
const markdownLinkExtractor = require('markdown-link-extractor');

const mdLinks = (path, options) => {
  //resolve es como "then" y reject es como "catch". Son callbacks. Promesa resuelta y rechazada.
  return new Promise((resolve, reject) => {
    //identificar si la ruta existe
    if (fs.existsSync(path)) {
      //leer y convertir a ruta absoluta
      if (!pathUser.isAbsolute(path)) {
        path = pathUser.resolve(path)
      }
    } else {
      //si no existe la ruta, rechaza la promesa
      reject('La ruta no existe');
    }

    let foundMd = false;
    const directory = fs.readdirSync(path);

    if (directory.length === 0) {
      reject('El directorio está vacío');
    } else {
      foundMd = false;
      for (let file of directory) {
        const filePath = pathUser.join(path, file);
        // El método fs.statSync() se utiliza para devolver información sobre la ruta del archivo dada de forma síncrona.
        const fileStat = fs.statSync(filePath);
        // ¿Es un archivo?
        if (fileStat.isFile()) {
          const ext = pathUser.extname(filePath);
          // ¿Es un archivo .md?
          if (ext === '.md') {
            console.log('Es un archivo .md');
            console.log(`Archivo encontrado: ${filePath}`);
            // Encontrar links en los archivos .md
            const content = fs.readFileSync(filePath, 'utf-8');
            const links = markdownLinkExtractor(content);

            if (links.length === 0) {
              reject('No se encontraron links en el archivo MD');
            } else {
              console.log(`Se encontraron ${links.length} links en el archivo MD`);
              console.log(links);
            }
            foundMd = true;
          }
          //¿Es un directorio?
        } else if (fileStat.isDirectory()) {
          console.log('Es un directorio');
          //console.log(`Directorio encontrado: ${filePath}`);

          // Volver a ingresar al subdirectorio y buscar archivos
          mdLinks(filePath, options)
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }

    if (!foundMd) {
      reject('No se encontraron archivos MD');
    }
  })
}
// module puede exportar objetos, funciones, etc.
module.exports = {
  mdLinks
}; 
