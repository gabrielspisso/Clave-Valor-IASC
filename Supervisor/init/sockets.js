const socketIO = require("socket.io");
const supervisor = require("../model/supervisor");

module.exports = server => {
	const io = socketIO(server);
	io.on("connection", socket => {
		supervisor.add(socket);
		socket.on("disconnect", () => {
			supervisor.remove(socket);
		});
	});
}