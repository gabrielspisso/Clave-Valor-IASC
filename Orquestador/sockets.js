const io = require('socket.io-client');
const { supervisorDomain } = require("./config");
const orquestador = require("./api/model/orquestador");
const socket = io(supervisorDomain);

setUpSupervisorConnection = () => {
  socket.on("connect", () => orquestador.setIsMaster(false));
  socket.on("master", () => orquestador.setIsMaster(true));
}

module.exports = setUpSupervisorConnection;