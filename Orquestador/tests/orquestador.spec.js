const nock = require("nock");
const Cliente = require("../api/model/cliente");
const should = require("should");
const _ = require("lodash");
const { orquestadores } = require("../config")
const NoHayMaster = require("../api/model/exceptions/noHayMaster");
nock.disableNetConnect();
nock.enableNetConnect('127.0.0.1');

describe("Cliente", () => {
  beforeEach(()=> {
     nock.cleanAll();
     cliente = new Cliente()
  })


  it("Elige el master bien", () => {
    const orquestadoresNock = setOrquestadoresReply(orquestadores, [ true, false ]);
    const { orquestador: orquestadorMaster } = _.find(orquestadoresNock, { esMaster: true });
    
    setNocks(orquestadoresNock)
 
    return cliente.getMaster()
      .tap(() => nock.isDone().should.be.true())
      .should.eventually.be.eql(orquestadorMaster)
  })

  it("Tira error si no hay master", () => {
    const orquestadoresNock = setOrquestadoresReply(orquestadores, [ false, false ])
    setNocks(orquestadoresNock)
          
    return cliente.getMaster().should.be.rejectedWith(NoHayMaster)
  })

 
});

const setOrquestadoresReply = (orquestadores, respuestas) =>
  _.zipWith(orquestadores, respuestas, (orquestador, esMaster) => ({ orquestador, esMaster }));

const setNocks = (orquestadores) => {
  orquestadores.forEach(({ orquestador, esMaster }) => {
    nock(orquestador)
      .get('/master')
      .reply(200, { esMaster });
  })

}
