const _ = require("lodash");
const Promise = require("bluebird");
const config = require("../../config");

class Orquestador {

    constructor() {
        this.nodes = config.nodes.map(it => new Node(it));
        this.isMaster = false;
    }
    
    getValue(key) {
        return Promise.any(this.nodes, it => it.getByKey(key))
            .then(({ valor }) => { key, value: valor });
    }
    
}

module.exports = Orquestador;