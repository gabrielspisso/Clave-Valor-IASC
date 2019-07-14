const _ = require("lodash");
const Promise = require("bluebird");
const request = require("request-promise");
const config = require("../../config");

class Orquestador{
    constructor(){
        this.datos = _.map(config.datos, function(dir){ 
            return { 
                ip: dir, 
                active: true 
            } 
        });
    }

    

}