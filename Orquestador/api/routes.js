const app = require('express')();
const controller = require("./controller");
const PORT = process.env.PORT || 9001;

app.get('/:key', controller.obtenerValor);
app.get('/mayor', controller.mayorA)
app.get('/menor', controller.menorA);
app.post('/', controller.crearValor);


app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

