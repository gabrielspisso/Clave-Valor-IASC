const repositorioDeDatos = require('./model/repositorioDeDatos');

class Controller {

    obtenerValorDeClave({ params: { key } }, response) {
        let valor = repositorioDeDatos.obtenerValor(key);
        if (valor) {
            response.json({ valor });
        }
        else {
            response.sendStatus(404);
        }
    }
    
}

module.exports = new Controller();