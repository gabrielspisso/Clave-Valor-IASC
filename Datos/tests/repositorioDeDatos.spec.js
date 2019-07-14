const RepositorioDeDatos = require("../api/model/repositorioDeDatos");
const should = require("should");

describe("repositorioDeDatos", () => {
    beforeEach(() => {
        repositorioDeDatos = new RepositorioDeDatos()
    })

    describe("Obtener Datos", () => {

        it("Pedir el valor de una clave inexistente devuelve undefined", () => {
            return should(repositorioDeDatos.obtenerValor('x')).be.undefined()
        })

    })

    describe("Escribir datos", () => {
        beforeEach(() => {
            repositorioDeDatos.escribirValor({ clave: 'x', valor: 'y' });
        })
        it("Despues de escribir un valor dos veces, al pedir por la clave se obtiene el segundo valor", () => {
            repositorioDeDatos.escribirValor({ clave: 'x', valor: 'y2' });
            return repositorioDeDatos.obtenerValor('x').should.be.eql('y2')
        })
        it("Despues de escribir un valor, al pedir por la clave se obtiene el valor correcto", () => {
            return repositorioDeDatos.obtenerValor('x').should.be.eql('y')
        })
    });

    describe("Obtener valor mayor a otro valor", () => {
        it("Puede devolver una lista vacia", () => {
            repositorioDeDatos.escribirValor({ clave: 'x', valor: 'y' });
            return repositorioDeDatos.obtenerValoresMayoresA('z').should.be.empty()
        })

        it("Teniendo un valor mayor, se devuelve una lista con el valor mayor", () => {
            repositorioDeDatos.escribirValor({ clave: 'x', valor: 'y' });
            return repositorioDeDatos.obtenerValoresMayoresA('a').should.be.containEql('y')
        })
    })

});

