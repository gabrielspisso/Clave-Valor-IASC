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

    getHighThan(value) {
        return this._getRangeBy(it => it.getHigherThan(value));
    }

    getLessThan(value) {
        return this._getRangeBy(it => it.getLesserThan(value));
    }

    _getRangeBy(getter) {
        return Promise.map(this.nodes, getter)
            .then(_.flatten);
    }
    
}

module.exports = Orquestador;