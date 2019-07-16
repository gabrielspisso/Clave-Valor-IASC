const _ = require("lodash");
const Promise = require("bluebird");
const config = require("../../config");
const Node = require("./node")
const NotFound = require("./exceptions/notFound");
const NoDataNodesLeft = require("./exceptions/noDataNodesLeft");

class Orquestador {

  constructor() {
    this.readNodes = config.nodes.map(it => new Node(it));
    this.writeNodes = config.nodes.map(it => new Node(it));
    this.isMaster = false;
  }

  getValue(key) {
    return this._mapSafely(it => it.getByKey(key).reflect())
      .get(0) 
      .tap((it) => this._throwIfUndefined(it, NotFound))
      .then(({ valor }) => ({ key, value: valor }));
  }

  assignKeyAndValue(pair) {
    return this._findCorrectNodeIfExists(pair)
      .then(node => node || this._pickNodeRoundRobin())
      .tap(node => this._throwIfUndefined(node, NoDataNodesLeft))
      .then(node => node.write(pair))
      .catch(err => this._handleWriteError(err)) // TODO: catchear exception del retry
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

  _handleWriteError({ statusCode, node }) {
    console.log("EEE", statusCode)
    if(statusCode == 409)
      _.remove(this.writeNodes, { domain: node.domain })
    else
    {
      _.remove(this.writeNodes, { domain: node.domain })
      _.remove(this.readNodes, { domain: node.domain })
    }
    this.assignKeyAndValue(pair);
  }

  _findCorrectNodeIfExists({ clave }) {
    return Promise.filter(this.readNodes, it => it.getByKey(clave).thenReturn(true).catchReturn(false))
      .get(0)

  }

  _pickNodeRoundRobin() {
    const node = this.writeNodes.shift();
    this.writeNodes.push(node);
    return node;
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
    return Promise.map(this.readNodes, request)
      .filter(it => it.isFulfilled())
      .map(it => it.value())
  }

}

module.exports = new Orquestador();