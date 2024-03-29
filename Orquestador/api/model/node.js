const request = require("request-promise");
const retry = require('promise-retry');
const Promise = require("bluebird");
const ExternalError = require("./exceptions/externalError");

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
    return this.get(key)
  }

  write(pair) {
    return this.post("", pair);
  }

  removePair(key) {
    return this.delete(key);
  }

  get(resource) {
    return this._request({ method: "GET", resource, json: true });
  }  

  post(resource, json) {
    return this._request({ method: "POST", resource, json });
  }

  delete(resource) {
    return this._request({ method: "DELETE", resource, json: true });
  }

  _request(options) {
    return Promise.resolve(retry(() => request({ 
        uri: `${this.domain}/${options.resource}`,
        ...options
    }), 3))
    .catch(({ statusCode }) => { throw new ExternalError({ statusCode, node: this })})
  }
       
}

module.exports = Node;