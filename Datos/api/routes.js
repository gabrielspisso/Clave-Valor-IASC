const app = require('express')();
const controller = require('./controller');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 9001;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/:key', controller.obtenerValorDeClave);
app.post('/', controller.escribirValor);
app.get('/mayor/:value', controller.obtenerValoresMayoresA);


app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
