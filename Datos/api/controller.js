const RepositorioDeDatos = require('./model/repositorioDeDatos');
const _ = require("lodash");
class Controller {
    constructor(){
        this.repositorioDeDatos = new RepositorioDeDatos();
        _.bindAll(this,["escribirValor","obtenerValorDeClave"])
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
        if(this.bodyValido(body)){
            this.repositorioDeDatos.escribirValor(body);
            res.sendStatus(200);         
        }
        else{
            res.sendStatus(400);
        }
    }

    bodyValido(par){
        return par && par.clave && par.valor;
    }

}

module.exports = new Controller();