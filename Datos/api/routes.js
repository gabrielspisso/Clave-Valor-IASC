const app = require('express')();
const controller = require('./controller');

const PORT = process.env.PORT || 9001;

app.get('/:key', controller.obtenerValorDeClave);



app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
