const app = require('express')();
const controller = require("./controller");
const PORT = process.env.PORT || 9000;
const { route } = require("endpoint-handler")(app);


route.get('/esMaster', controller.esMaster);
app.use((req, res, next) => controller.esMaster() ? next() : res.sendStatus(400));
route.get('/:key', controller.obtenerValor);
route.get('/mayor', controller.mayorA)
route.get('/menor', controller.menorA);
route.post('/crearValor', controller.crearValor);


app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

