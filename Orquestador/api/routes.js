const app = require('express')();
const controller = require("./controller");
const PORT = process.env.PORT || 9000;
const { route } = require("endpoint-handler")(app);

route.get('/:key', controller.obtenerValor);
route.get('/mayor', controller.mayorA)
route.get('/menor', controller.menorA);
route.post('/crearValor', controller.crearValor);
route.get('/esMaster', controller.esMaster);


app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

