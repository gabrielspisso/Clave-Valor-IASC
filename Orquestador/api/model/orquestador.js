const _ = require("lodash");
const Promise = require("bluebird");
const config = require("../../config");
const Node = require("./node")

class Orquestador {

  constructor() {
    this.nodes = config.nodes.map(it => new Node(it));
    this.isMaster = false;
  }
  
  getValue(key) {
    return Promise.map(this.nodes, it => it.getByKey(key).reflect())
      .filter(it => it.isFulfilled())
      .get(0) 
      .then(it => it.value())
      .then(({ valor }) => ({ key, value: valor }));
  }

  assignKeyAndValue(pair) {
    const node = this.nodes.shift();
    if(_.isUndefined(node))
      return Promise.reject("Se murieron todos los nodos");
    return node.write(pair)
      .tap(() => this.nodes.push(node))
      .catch(() => this.assignKeyAndValue(pair)) // TODO: catchear exception del retry
  }

  getHighThan(value) {
    return this._getRangeBy(it => it.getHigherThan(value));
  }

  getLessThan(value) {
    return this._getRangeBy(it => it.getLesserThan(value));
  }

  setIsMaster(value) {
    console.log("soy el maestro", value)
    this.isMaster = value;
  }

  _getRangeBy(getter) {
    return Promise.map(this.nodes, getter)
      .then(_.flatten)
      .then(it => ({ values: it }));
  }
  
}

module.exports = new Orquestador();