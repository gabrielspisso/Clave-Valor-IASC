const app = require('express')();
const controller = require("./controller");
const PORT = process.env.PORT || 9001;
const { route } = require("endpoint-handler")(app);

route.get('/:key', controller.obtenerValor);
route.get('/mayor', controller.mayorA)
route.get('/menor', controller.menorA);
route.post('/', controller.crearValor);


app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

