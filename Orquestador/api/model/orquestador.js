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
    return this._safeGet(it => it.getByKey(key).reflect())
      .get(0)
      .tap((it) => this._throwIfUndefined(it, NotFound))
      .then(({ valor }) => ({ key, value: valor }));
  }

  assignKeyAndValue(pair) {
    let nodes = _.clone(this.nodes);
    return this.write(pair, nodes);
  }

  write(pair, nodes) {
    const node = nodes.shift();
    this._throwIfUndefined(node, NoDataNodesLeft);
    return node.write(pair)
      .tap(() => _.remove(this.nodes, node))
      .tap(() => this.nodes.push(node))
      .catch((error) => {
        if (error.statusCode == 500) {
          _.remove(this.nodes, node);
        }
        return this.write(pair, nodes)
      })

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

  _throwIfUndefined(value, Err) {
    if (_.isUndefined(value))
      throw new Err()
  }

  _getRangeBy(getter) {
    return this._safeGet(getter)
      .then(_.flatten)
      .then(it => ({ values: it }));
  }

  _safeGet(getter) {
    return Promise.map(this.nodes, getter)
      .filter(it => it.isFulfilled())
      .map(it => it.value())
  }

}

module.exports = new Orquestador();