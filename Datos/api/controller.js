const RepositorioDeDatos = require('./model/repositorioDeDatos');
const BodyInvalido = require('./model/exceptions/BodyInvalido');
const Promise = require("bluebird");
const _ = require("lodash");

class Controller {
    constructor() {
        this.repositorioDeDatos = new RepositorioDeDatos();
        _.bindAll(this, ["escribirValor", "obtenerValorDeClave", "obtenerValoresMayoresA", "obtenerValoresMenoresA","validarBody"])
    }

    obtenerValorDeClave({ params: { key } }, response) {
        let valor = this.repositorioDeDatos.obtenerValor(key);
        if (valor) {
            response.json({ valor });
        }
        else {
            response.sendStatus(404);
        }
    }

    escribirValor({ body }, res) {
        return Promise.method(this.validarBody)(body)
            .then(this.repositorioDeDatos.escribirValor(body))
    }

    bodyValido(par) {
        return par && par.clave && par.valor
    }

    validarBody(par) {
        if (!this.bodyValido(par)) {
            throw new BodyInvalido;
        };
    }

    obtenerValoresMayoresA({ params: { value } }, res) {
        res.json(this.repositorioDeDatos.obtenerValoresMayoresA(value));
    }

    obtenerValoresMenoresA({ params: { value } }, res) {
        res.json(this.repositorioDeDatos.obtenerValoresMenoresA(value));
    }
}

module.exports = new Controller();