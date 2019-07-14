const io = require('socket.io-client');
const { supervisorDomain } = require("./config");

module.exports = io(supervisorDomain);