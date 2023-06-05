const { logPlugin } = require('@babel/preset-env/lib/debug.js');
const utils = require('./utils.js');

const mdLinks = (path, options) => {
  console.log(options)
  return new Promise((resolve, reject) => {
    utils.validatePath(path)
      .then((isValid) => {
        const absolutePath = utils.solveToAbsolute(path);
        console.log("0")
        if (utils.isFile(absolutePath) && utils.isMdFile(absolutePath)) {
          utils.readFiles(absolutePath)
            .then((fileContent) => {
              const links = fileContent.map((match) => {
                const regex = /\[(.*)\]\(((?!#).+)\)/i;
                const [, text, href] = match.match(regex);
                return {
                  href,
                  text,
                  file: absolutePath,
                };
              });

              if (options.validate && options.stats) {
                validateAndStats(links, resolve, reject);
                console.log("1")
                //validateAndStats(links)
                // .then((res) => resolve(res))
              } else if (options.validate) {
                console.log("2")
                validate(links, resolve, reject);
              } else if (options.stats) {
                console.log("3")
                getStats(links, resolve, reject);
              } else {
                console.log("4")
                resolve({ links });
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

const validateAndStats = (links, resolve, reject) => {
  //return new Promise
  //cuando ya tengo todo resolve
  utils.validateLinks(links)
    .then((result) => {
      const stats = getStats(result);
      const brokenLinks = result.filter(link => link.status !== 200);
      resolve({ links: result, stats, broken: brokenLinks.length });
    })
    .catch((error) => {
      reject(error);
    });
};

const validate = (links, resolve, reject) => {
  utils.validateLinks(links)
    .then((result) => {
      resolve({ links: result });
    })
    .catch((error) => {
      reject(error);
    });
};

const getStats = (links, resolve, reject) => {
  const stats = {
    total: links.length,
    unique: utils.getUniqueLinks(links).length,
  };
  resolve(stats);
};

module.exports = mdLinks;