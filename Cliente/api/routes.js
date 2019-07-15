const app = require('express')();
const controller = require("./controller");
const PORT = process.env.CLIENTPORT || 9998;
const bodyParser = require('body-parser');
const { route } = require("endpoint-handler")(app);

const logRequestStart = (req, res, next) => {
    console.info(`${req.method} ${req.originalUrl}`)
    return next()
}

app.use(logRequestStart)

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

route.get('/:key', controller.obtenerValor);
route.get('/mayor', controller.mayorA)
route.get('/menor', controller.menorA);
route.post('/', controller.crearValor);


app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

