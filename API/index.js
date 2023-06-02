const utils = require('./utils.js');
const getUniqueLinks = require('./utils.js');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    utils.validatePath(path)
      .then((isValid) => {
        const absolutePath = utils.solveToAbsolute(path);

        if (utils.isFile(absolutePath) && utils.isMdFile(absolutePath)) {
          utils.readFiles(absolutePath)
            .then((links) => {
              if (options.validate && options.stats) {
                const results = {
                  Total: totalLinks(links),
                  Unique: getUniqueLinks(links),
                  Broken: totalBrokenLinks(links),
                }
                resolve(results);
              }
              else if (options.stats) {
                const results = {
                  Total: totalLinks(links),
                  Unique: getUniqueLinks(links),
                }
                resolve(results);
              }
              else if (options.validate) {
                const arrPromises = links.map((link) => {
                  return utils.validateLinks(link.url, link.file, link.text);
                });
              }
              else {
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

const getStats = (links) => {
  const stats = {
    total: links.length,
    unique: utils.getUniqueLinks(links).length,
  };
  return stats;
};

module.exports = mdLinks;