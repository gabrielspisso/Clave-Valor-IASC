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
        var hashId = new Id(key).toDec();//Siempre devuelve el mismo numero para una clave
        return _calculateRealId(hashId);
    }

    nextNode(idNode){//Si el proximo nodo esta activo trae ese, sino busca uno activo
        return (idNode<this.nodes.length-1 && this.nodes[idNode+1].active) ?
                this.nodes[idNode+1] :
                this.nodes.find( (node) => node.active);
    }

    _calculateRealId(hashId){//Suma en un grupo ciclico
        var resto = hashId % this.nodes.length;
        var cociente = Math.floor(hashId / this.nodes.length);
        if(resto == 0) 
            return (cociente>this.nodes.size) ? _calculateRealId(cociente) : cociente-1
        else 
            return resto -1
    }

    assignKeyAndValue(){
        //nada aun
    }
    
}

module.exports = Orquestador;