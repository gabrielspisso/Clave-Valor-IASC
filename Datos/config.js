module.exports = {
    tamanioMaximoDeClave: (process.env.MAX_SIZE_Of_KEY || 10),
    tamanioMaximoDeUnValor: (process.env.MAX_SIZE_OF_VALUE || 10),
    capacidadMaxima: (process.env.MAX_SIZE_OF_NODE || 5)
}