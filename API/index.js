const utils = require('./utils.js');

const mdLinks = (path, options) => {
  console.log(path);

  return new Promise((resolve, reject) => {
    utils.validatePath(path)
      .then((isValid) => {
        console.log(isValid);

        if (!isValid) {
          reject('Path does not exist');
          return;
        }

        utils.validateDirectory(path)
          .then((directoryExist) => {
            console.log(directoryExist);

            if (!directoryExist) {
              reject('Directory does not exist');
              return;
            }

            const directory = utils.readDir(path);

            if (directory.length === 0) {
              reject('Empty directory');
              return;
            }

            if (utils.isFile(path) && utils.isMdFile(path)) {
              utils.readFiles(path)
                .then((fileContent) => {
                  console.log("File content:", fileContent);

                  resolve();
                })
                .catch((error) => {
                  reject(error);
                });
            } else {
              reject('Invalid file path or file extension');
            }
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = mdLinks;