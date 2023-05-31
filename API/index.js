const utils = require('./utils.js');

const mdLinks = (path, options) => {
  console.log(path);

  return new Promise((resolve, reject) => {
    utils.validatePath(path)
      .then((isValid) => {
        console.log(isValid);

        const absolutePath = utils.solveToAbsolute(path);
        console.log("absolutePath: ", absolutePath)


        utils.validateDirectory(absolutePath)
          .then((directoryContent) => {
            console.log("Directory content:", directoryContent);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });


        if (utils.isFile(absolutePath) && utils.isMdFile(absolutePath)) {
          utils.readFiles(absolutePath)
            .then((fileContent) => {
              console.log("File content:", fileContent);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        }
        else {
          reject('Invalid file path or file extension');
        }
      })
      .catch((error) => {
        reject(error);
      });
  })

};




module.exports = mdLinks;

//cambiar console.log por resolve o reject