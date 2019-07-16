const _ = require("lodash");
const Promise = require("bluebird");
const config = require("../../config");
const Node = require("./node")
const NotFound = require("./exceptions/notFound");
const NoDataNodesLeft = require("./exceptions/noDataNodesLeft");

class Orquestador {

  constructor() {
    this.nodes = config.nodes.map(it => new Node(it));
    this.isMaster = false;
  }

  getValue(key) {
    return this._mapSafely(it => it.getByKey(key).reflect())
      .get(0) 
      .tap((it) => this._throwIfUndefined(it, NotFound))
      .then(({ valor }) => ({ key, value: valor }));
  }

  getHighThan(value) {
    return this._getRangeBy(it => it.getHigherThan(value).reflect());
  }

  getLessThan(value) {
    return this._getRangeBy(it => it.getLesserThan(value).reflect());
  }

  setIsMaster(value) {
    console.log("soy el maestro", value)
    this.isMaster = value;
  }

  removePair(key) {
    return this._mapSafely(it => it.removePair(key).reflect())
  }

  _throwIfUndefined(value, Err) {
    if (_.isUndefined(value))
      throw new Err()
  }

  _getRangeBy(getter) {
    return this._mapSafely(getter)
      .then(_.flatten)
      .then(it => ({ values: it }));
  }

  _mapSafely(request) {
    return Promise.map(this.nodes, request)
      .filter(it => it.isFulfilled())
      .map(it => it.value())
  }

}

module.exports = new Orquestador();