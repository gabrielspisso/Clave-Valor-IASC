const app = require('express')();
const controller = require("./controller");
const PORT = process.env.PORT || 9000;
const { route } = require("endpoint-handler")(app);
const bodyParser = require('body-parser');
const morgan = require("morgan");

app.use(morgan("dev"));  

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

route.get('/master', controller.esMaster);
app.use((req, res, next) => controller.esMaster() ? next() : res.sendStatus(400));
route.get('/mayor', controller.mayorA)
route.get('/menor', controller.menorA);
route.get('/:key', controller.obtenerValor);
route.post('/', controller.crearValor);
route.delete('/:key', controller.borrarPar);


app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

