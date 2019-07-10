require('dotenv').config();
module.exports = {
    orquestadores: (process.env.ORQUESTADORES || "").split(",")
}