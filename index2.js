const fs = require('fs');
const path = require('path');
const markdownLinkExtractor = require('markdown-link-extractor');

const mdLinks = (pathName, options) => {
  return new Promise((resolve, reject) => {
    const result = [];

    // verificar si la ruta existe
    if (!fs.existsSync(pathName)) {
      reject(new Error('La ruta no existe'));
    }

    // convertir a ruta absoluta
    pathName = path.resolve(pathName);

    fs.readdir(pathName, (err, files) => {
      if (err) {
        reject(err);
      }

      if (files.length === 0) {
        reject(new Error('El directorio está vacío'));
      }

      let pending = files.length;
      if (pending === 0) {
        resolve(result);
      }

      files.forEach((file) => {
        const filePath = path.join(pathName, file);

        // verificar si es un archivo
        fs.stat(filePath, (err, stats) => {
          if (err) {
            reject(err);
          }

          if (stats.isFile()) {
            const ext = path.extname(filePath);

            // verificar si es un archivo markdown
            if (ext === '.md') {
              fs.readFile(filePath, 'utf-8', (err, content) => {
                if (err) {
                  reject(err);
                }

                // encontrar los links en el archivo markdown
                const links = markdownLinkExtractor(content);

                // agregar los links al resultado
                links.forEach((link) => {
                  result.push({
                    href: link.href,
                    text: link.text,
                    file: filePath,
                  });
                });

                // si no hay más archivos pendientes, resolver la promesa
                if (--pending === 0) {
                  resolve(result);
                }
              });
            } else {
              // si no es un archivo markdown, reducir el contador de archivos pendientes
              if (--pending === 0) {
                resolve(result);
              }
            }
          } else if (stats.isDirectory()) {
            // si es un directorio, analizar los archivos dentro del directorio recursivamente
            mdLinks(filePath, options)
              .then((subResult) => {
                // agregar los resultados del subdirectorio al resultado
                subResult.forEach((link) => {
                  result.push(link);
                });

                // si no hay más archivos pendientes, resolver la promesa
                if (--pending === 0) {
                  resolve(result);
                }
              })
              .catch((err) => {
                reject(err);
              });
          }
        });
      });
    });
  });
};

module.exports = {
  mdLinks,
};