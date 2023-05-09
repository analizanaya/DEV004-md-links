const pathUser = require('path');

const readFileApi = (path = './hola.md') => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

}

const getAbsolutePath = (path) => {
    if (!pathUser.isAbsolute(path)) {
        return pathUser.resolve(path);
    } else {
        return path;
    }

}


module.exports = {
    readFileApi,
    getAbsolutePath,
}