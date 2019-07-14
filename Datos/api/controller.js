const RepositorioDeDatos = require('./model/repositorioDeDatos');
const _ = require("lodash");
class Controller {
    constructor() {
        this.repositorioDeDatos = new RepositorioDeDatos();
        _.bindAll(this, ["escribirValor", "obtenerValorDeClave", "obtenerValoresMayoresA", "obtenerValoresMenoresA"])
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
        console.log(body);
        if (this.bodyValido(body)) {
            this.repositorioDeDatos.escribirValor(body);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(400);
        }
    }

    bodyValido(par) {
        return par && par.clave && par.valor;
    }

    obtenerValoresMayoresA({ params: { value } }, res) {
        res.json(this.repositorioDeDatos.obtenerValoresMayoresA(value));
    }

    obtenerValoresMenoresA({ params: { value } }, res) {
        res.json(this.repositorioDeDatos.obtenerValoresMenoresA(value));
    }
}

module.exports = new Controller();