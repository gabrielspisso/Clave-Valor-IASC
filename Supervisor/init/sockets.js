const socketIO = require("socket.io");
const Supervisor = require("../model/supervisor");
const supervisor = new Supervisor();

module.exports = server => {
	const io = socketIO(server);
	io.on("connection", socket => {
		supervisor.add(socket);
		console.log("CONEXION")
		socket.on("disconnect", () => {
			supervisor.remove(socket);
		});
	});
}