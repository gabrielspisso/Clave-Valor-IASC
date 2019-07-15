const _ = require("lodash");
const config = require("../../config");
const TamanioInvalido = require("./exceptions/TamanioInvalido");

class RepositorioDeDatos {

    constructor() {
        this.datos = [];
    }

    obtenerValor(clave) {
        const dato = this.encontrarValor(clave)
        return _.get(dato, "valor")
    }

    escribirValor({ clave, valor }) {

        this.validarTamanioDeClave(clave);
        this.validarTamanioDeValor(valor);

        let par = this.encontrarValor(clave);
        if (par) {
            par.valor = valor;
        }
        else {
            this.datos.push({ clave, valor });
        }

    }
    validarTamanioDeValor(valor){
        if(_.size(valor) > config.tamanioMaximoDeUnValor ){
            throw new TamanioInvalido;
        }
    }
    validarTamanioDeClave(clave){    
        if(_.size(clave) > config.tamanioMaximoDeClave ){
            throw new TamanioInvalido;
        }
    }

    encontrarValor(clave) {
        return _.find(this.datos, { clave });
    }

    obtenerValoresMayoresA(unValor) {
        return this.obtenerValoresSegunCriterio(( valor ) => valor > unValor)
    }

    obtenerValoresMenoresA(unValor) {
        return this.obtenerValoresSegunCriterio(  valor => valor < unValor)
    }

    obtenerValoresSegunCriterio(criterio) {
        return this.datos.filter(({ valor }) => criterio(valor))
                .map(dato => dato.valor)
    }


}

module.exports = RepositorioDeDatos;