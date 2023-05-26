const utils = require('./utils.js');

const mdLinks = (path, options) => {
  console.log(path);

  return new Promise((resolve, reject) => {
    utils.validatePath(path)
      .then((isValid) => {
        console.log(isValid);

        const rutaAbsoluta = utils.solveToAbsolute(path);
        console.log("rutaAbsoluta: ", rutaAbsoluta)


        /* utils.validateDirectory(rutaAbsoluta)
          .then((directoryExist) => {
            console.log(directoryExist); */

        if (utils.isFile(rutaAbsoluta) && utils.isMdFile(rutaAbsoluta)) {
          utils.readFiles(rutaAbsoluta)
            .then((fileContent) => {
              console.log("File content:", fileContent);

              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        } /* else if (!directoryExist) {
          reject('Directory does not exist');

        } */
        else {
          reject('Invalid file path or file extension');
        }

        const directory = utils.readDir(path);

        if (directory.length === 0) {
          reject('Empty directory');

        }
        //poner en else linea 22


      })
      .catch((error) => {
        reject(error);
      });
  })
  /*  .catch((error) => {
     reject(error);
   }); */
};


module.exports = mdLinks;

//cambiar console.log por resolve o reject