const app = require('express')();
const controller = require("./controller");
const PORT = process.env.CLIENTPORT || 9998;
const bodyParser = require('body-parser');
const { route } = require("endpoint-handler")(app);
const morgan = require("morgan");

app.use(morgan("dev"));  

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

route.get('/mayor', controller.mayorA)
route.get('/menor', controller.menorA);
route.get('/:key', controller.obtenerValor);
route.post('/', controller.crearValor);
route.delete('/:key', controller.borrarPar);


app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

