class NoHayMaster extends Error {
  constructor(err) {
    super()
    this.statusCode = 500;
    this.body = {
      err,
      message: "No hay master"
    };
  }
};

module.exports = NoHayMaster;