const Id = require('dht-id');
var sha1 = require('git-sha1');

class NodeSelector{
    constructor(nodes){
        this.nodes = nodes;
    }

    getNodeByKey(key){
        var idNode = this.getId(key);
        return (this.nodes[idNode].active) ? this.nodes[idNode] : this.nextNode(idNode);
    }

    getId(key){
        var hashId = new Id(this.hashKey(key)).toDec();//Siempre devuelve el mismo numero para una clave
        return this._calculateRealId(hashId);
    }

    hashKey(content) {
        return sha1(content).substring(0, 6)
    }

    nextNode(idNode){//Si el proximo nodo esta activo trae ese, sino busca uno activo
        return (idNode<this.nodes.length-1 && this.nodes[idNode+1].active) ?
                this.nodes[idNode+1] :
                this.nodes.find( (node) => node.active);
    }
        
    _calculateRealId(hashId){//Suma en un grupo ciclico
        for(;hashId>this.nodes.length;hashId-=4);
        return hashId;
    }
}
module.exports = NodeSelector;