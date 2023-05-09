const { mdLinks } = require('../index.js');


describe('mdLinks', () => {

  it('Debe rechazar cuando el path no existe', () => {
    return mdLinks('/noexiste.md').catch((error) => {
      expect(error).toBe('La ruta no existe');
    })
  })
});
