const request = require("request-promise");

class Orquestador {

  constructor(dominio) {
    this.dominio = dominio;
  }

  esMaster() {
    const options = {
      method: "GET",
      uri:`${this.dominio}/master`,
      json: true
    }
    return Promise.resolve(request(options))
      .get("esMaster")
  }


}

export default Orquestador;