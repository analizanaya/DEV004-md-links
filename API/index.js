const utils = require('./utils.js');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    console.log(path);
    utils.validatePath(path)
      .then((isValid) => {
        console.log(isValid);
        const absolutePath = utils.solveToAbsolute(path);
        console.log('absolutePath: ', absolutePath);

        if (utils.isFile(absolutePath) && utils.isMdFile(absolutePath)) {
          utils.readFiles(absolutePath)
            .then((fileContent) => {
              console.log('File content:', fileContent);

              const links = fileContent.map((match) => {
                const regex = /\[(.*)\]\(((?!#).+)\)/i;
                const [, text, href] = match.match(regex);
                return {
                  href,
                  text,
                  file: absolutePath,
                };
              });

              if (options.validate) {
                utils.validateLinks(links)
                  .then((result) => {
                    console.log(result);
                  })

              } else {
                resolve(links);
              }
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
  });
};

module.exports = mdLinks;

//cambiar console.log por resolve o reject