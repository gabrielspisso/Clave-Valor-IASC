const RepositorioDeDatos = require("../api/model/repositorioDeDatos");
const should = require("should");
const config = require("../config");
const TamanioInvalido = require("../api/model/exceptions/TamanioInvalido");

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

        describe("Escrituras invalidas debido a su tamaño", () => {

            it("Una clave no puede exceder el tamaño maximo por configuracion.", () => {
                const claveLarga  = "x".repeat(config.tamanioMaximoDeClave + 1);
                const escribirUnaClaveMuyLarga = () => repositorioDeDatos.escribirValor({ clave: claveLarga, valor: '11111' });
                return escribirUnaClaveMuyLarga.should.throw(TamanioInvalido);
            })
            
            it("Un valor no puede exceder el tamaño maximo por configuracion.", () => {
                const valorLargo  = "x".repeat(config.tamanioMaximoDeUnValor + 1);
                const escribirUnaClaveMuyLarga = () => repositorioDeDatos.escribirValor({ clave: '1', valor: valorLargo });
                return escribirUnaClaveMuyLarga.should.throw(TamanioInvalido);
            })

            
        })
        describe("Pedidos sobre una escritura", () => {
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

    describe("Obtener valor menor a otro valor", () => {
        it("Puede devolver una lista vacia", () => {
            repositorioDeDatos.escribirValor({ clave: 'x', valor: 'y' });
            return repositorioDeDatos.obtenerValoresMenoresA('a').should.be.empty()
        })

        it("Teniendo un valor mayor, se devuelve una lista con el valor mayor", () => {
            repositorioDeDatos.escribirValor({ clave: 'x', valor: 'y' });
            return repositorioDeDatos.obtenerValoresMenoresA('z').should.be.containEql('y')
        })
    })

});

