const request = require("request-promise");

class Node {
  
  constructor(domain) {
    this.domain = domain;
  }

  getLesserThan(value) {
    return this.get(`menor/${value}`);
  }

  getHigherThan(value) {
    return this.get(`mayor/${value}`);
  }

  getByKey(key) {
    return this.get(key);
  }

  write(pair) {
    return this.post("", pair);
  }

  get(resource) {
    return this._request({ method: "GET", resource });
  }  

  post(resource, json) {
    return this._request({ method: "POST", resource, json });
  }

  _request(options) {
    return request({ 
        uri: `${this.domain}/${options.resource}`,
        timeout: 10000,
        ...options
    })
  }
       
}

module.exports = Orquestador;