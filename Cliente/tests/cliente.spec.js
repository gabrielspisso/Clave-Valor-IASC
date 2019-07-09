const nock = require("nock");
const Cliente = require("../api/model/cliente");
const should = require("should");
const _ = require("lodash");
nock.disableNetConnect();
nock.enableNetConnect('127.0.0.1');

     
describe("Cliente", () => {
  beforeEach(()=> {
     nock.cleanAll();
     setNocks();
     cliente = new Cliente()
     cliente.orquestadores = ["http://paredes.com", "http://spisso.com"];
  })


  it("Elige el master bien", () => {
    return cliente.getMaster()
    .tap(() => nock.isDone().should.be.true())
    .should.eventually.be.eql("http://paredes.com")
  })

 
});

const setNocks = () => {
  nock('http://paredes.com')
    .get('/master')
    .reply(200, { esMaster: true });
  nock('http://spisso.com')
    .get('/master')
    .reply(200, { esMaster: false });


}
