const RepositorioDeDatos = require('./model/repositorioDeDatos');
const BodyInvalido = require('./model/exceptions/BodyInvalido');
const NotFound = require('./model/exceptions/NotFound');

const Promise = require("bluebird");
const _ = require("lodash");

class Controller {
    constructor() {
        this.repositorioDeDatos = new RepositorioDeDatos();
        _.bindAll(this, ["escribirValor", "obtenerValorDeClave", "obtenerValoresMayoresA", "obtenerValoresMenoresA", "validarBody"])
    }

    obtenerValorDeClave({ params: { key } }) {
        return this._getOrThrow(key)
            .then((valor) => { valor });
    }

    escribirValor({ body }, res) {
        return Promise.method(this.validarBody)(body)
            .then(() => this.repositorioDeDatos.escribirValor(body))
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
        Promise.resolve(this.repositorioDeDatos.obtenerValoresMayoresA(value));
    }

    obtenerValoresMenoresA({ params: { value } }, res) {
        return Promise.resolve(this.repositorioDeDatos.obtenerValoresMenoresA(value));
    }

    borrarPar({ params: { key } }) {
        return this._getOrThrow(key)
            .then((valor) => this.repositorioDeDatos.borrarPar(key));
    }

    _getOrThrow(key) {
        return Promise.resolve(this.repositorioDeDatos.obtenerValor(key))
            .tap((valor) => { if (_.isUndefined(valor)) throw new NotFound() })
    }
}

module.exports = new Controller();