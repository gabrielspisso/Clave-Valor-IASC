class NoDataNodesLeft {
  constructor(err) {
    this.statusCode = 500;
    this.body = {
      err,
      message: "Todos los nodos de datos estan caidos"
    };
  }
};

module.exports = NoDataNodesLeft;

NoDataNodesLeft.prototype = Object.create(Error.prototype);