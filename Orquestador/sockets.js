const io = require('socket.io-client');
const { supervisorDomain } = require("./config");
const orquestador = require("./model/orquestador");
const socket = io(supervisorDomain);

setUpSupervisorConnection = () => 
  socket.on("master", () => orquestador.setIsMaster(true));

module.exports = setUpSupervisorConnection;