const nock = require("nock");
const Cliente = require("../api/model/cliente");
nock.disableNetConnect();
nock.enableNetConnect('127.0.0.1');

describe("Cliente", () => {
  beforeEach(()=> {
     nock.cleanAll();
  })


  it("elige el master como los dioses egipcios", () => {

  })

 
});

// const fetchAvailableFiltersEpicTest = (filterNames, result) => {
//  nock('http://soy.producteca.com')
//     .get('/products/availableFilters')
//     .query(() => true)
//     .reply(200, filterNames);
//   return epics.fetchAvailableFiltersEpic(ACTION("fetchAvailableFilters"), store)
//   .toArray()
//   .toPromise(Promise)
//   .then((emmitedActions) => emmitedActions.should.eql(result))
// }
