class NoDataNodesLeft extends Error {
  constructor(err) {
    super()
    this.statusCode = 500;
    this.body = {
      err,
      message: "Todos los nodos de datos estan caidos"
    };
  }
};

module.exports = NoDataNodesLeft;