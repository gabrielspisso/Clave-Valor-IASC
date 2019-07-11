const nock = require("nock");
const Cliente = require("../api/model/cliente");
const should = require("should");
const _ = require("lodash");
const config = require("../config")
nock.disableNetConnect();
nock.enableNetConnect('127.0.0.1');

describe("Cliente", () => {
  beforeEach(()=> {
     nock.cleanAll();
     setNocks();
     cliente = new Cliente()
  })


  it("Elige el master bien", () => {
    const orquestadorMaster = config.orquestadores[0];
 
    return cliente.getMaster()
      .tap(() => nock.isDone().should.be.true())
      .should.eventually.be.eql(orquestadorMaster)
  })

 
});

const setNocks = () => {
  const orquestadorMaster = config.orquestadores[0];
  const orquestadorNoMaster = config.orquestadores[1]; 

  nock(orquestadorMaster)
    .get('/master')
    .reply(200, { esMaster: true });
  nock(orquestadorNoMaster)
    .get('/master')
    .reply(200, { esMaster: false });


}
