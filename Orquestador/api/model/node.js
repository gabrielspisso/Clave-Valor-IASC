const request = require("request-promise");
const retry = require('promise-retry');
const Promise = require("bluebird");

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
    return this._request({ method: "GET", resource, json: true });
  }  

  post(resource, json) {
    return this._request({ method: "POST", resource, json });
  }

  _request(options) {
    return Promise.resolve(retry(() => request({ 
        uri: `${this.domain}/${options.resource}`,
        timeout: 10000,
        ...options
    }), 3))
  }
       
}

module.exports = Node;