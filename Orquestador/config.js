module.exports = {
    nodes: (process.env.NODES || "").split(","),
    supervisorDomain: process.env.SUPERVISORDOMAIN || "http://localhost:9999"
}