const app = require('express')();
const controller = require('./controller');
const bodyParser = require('body-parser');
const { route } = require("endpoint-handler")(app);
const PORT = process.env.DATAPORT || 9001;

const logRequestStart = (req, res, next) => {
    console.info(`${req.method} ${req.originalUrl}`)
    return next()
}

app.use(logRequestStart)

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

route.get('/:key', controller.obtenerValorDeClave);
route.post('/', controller.escribirValor);
route.get('/mayor/:value', controller.obtenerValoresMayoresA);
route.get('/menor/:value', controller.obtenerValoresMenoresA);



app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
