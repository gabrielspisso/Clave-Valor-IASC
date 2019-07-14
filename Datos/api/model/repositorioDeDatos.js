const _ = require("lodash");
class RepositorioDeDatos {

    constructor() {
        this.datos = [];
    }

    obtenerValor(clave) {
        const dato = _.find(this.datos, { clave })
        return _.get(dato, "valor")
    }



}

module.exports = new RepositorioDeDatos();