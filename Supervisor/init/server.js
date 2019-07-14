const app = require("express")();
const PORT = process.env.SUPERVISORPORT || 9999;
console.log("SERVER LISTENING ON ", PORT)

module.exports = app.listen(PORT);
