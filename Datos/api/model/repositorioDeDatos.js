const _ = require("lodash");
class RepositorioDeDatos {

    constructor() {
        this.datos = [];
    }

    obtenerValor(clave) {
        const dato = this.encontrarValor(clave )
        return _.get(dato, "valor")
    }

    escribirValor({clave,valor}){
        let par = this.encontrarValor(clave);
        if(par){
            par.valor = valor;
        }
        else{
            this.datos.push({clave,valor});
        }

//        this.datos.push({clave,valor});
    }
    encontrarValor(clave){
        return _.find(this.datos, { clave });
    }

}

module.exports = RepositorioDeDatos;