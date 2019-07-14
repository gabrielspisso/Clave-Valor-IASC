const _ = require("lodash");
const Promise = require("bluebird");
const request = require("request-promise");
const config = require("../../config");
const Id = require('dht-id');

class Orquestador{
    constructor(){
        this.nodes = _.map(config.nodes, function(dir){ 
            return { 
                ip: dir, 
                active: true 
            } 
        });
    }

    getNodeByKey(key){
        var idNode = this.getId(key);
        return (this.nodes[idNode].active) ? this.nodes[idNode] : this.nextNode(idNode);
    }

    getId(key){
        var hashId = new Id(key).toDec();
        var resto = hashId % this.nodes.length;
        var cociente = Math.floor(hashId / this.nodes.length);
        return (resto == 0) ? cociente -1 : resto -1;
    }

    nextNode(idNode){//Si el proximo nodo esta activo trae ese, sino busca uno activo
        return (idNode<this.nodes.length-1 && this.nodes[idNode+1].active) ?
                this.nodes[idNode+1] :
                this.nodes.find( (node) => node.active);
    }
    
}