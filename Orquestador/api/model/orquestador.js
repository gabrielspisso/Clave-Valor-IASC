const _ = require("lodash");
const Promise = require("bluebird");
const request = require("request-promise");
const config = require("../../config");
const NodeSelector = require("./nodeSelector");

class Orquestador{
    constructor(){
        this.nodes = _.map(config.nodes, function(dir){ 
            return { 
                ip: dir, 
                active: true 
            } 
        });
        this.isMaster=false;
        this.ns = new NodeSelector(this.nodes);
    }
    
    _requestNode(node, options) {
        return request({ 
            uri: `${node.ip}/${options.resource}`,
            timeout: 10000,
            ...options
        })
        .catch(function (err) {
            node.active=false;
            return err;
        });
    }
    
    getValue(key){
        var node = ns.getNodeByKey(key);
        return this._requestNode(node,{
            method: "GET",
            resource: key
          });
    }

    assignKeyAndValue(body){
        var node = ns.getNodeByKey(body.key);
        return this._requestNode(node,{
            method: "GET",
            resource: "",
            json: body
          });
    }

    getValuesByCondition(condition,value){
        return Promise.map(this.nodes, function(node){ 
            this._requestNode(node, {
                method: "GET",
                resource: condition+"/"+value
            });
        })
        .then(_.flatten);
    }

    getHighThan(value){
        return getValuesByCondition("mayor",value);
    }

    getLessThan(value){
        return getValuesByCondition("menor",value);
    }
    
}

module.exports = Orquestador;