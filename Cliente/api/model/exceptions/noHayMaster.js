class NoHayMaster {
  constructor(err) {
    this.statusCode = 500;
    this.body = {
      err,
      message: "No hay master"
    };
  }
};

module.exports = NoHayMaster;
NoHayMaster.prototype = Object.create(Error.prototype);
