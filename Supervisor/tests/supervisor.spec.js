const _ = require("lodash");
const should = require("should");
const sinon = require("sinon");
require("should-sinon");
const Supervisor = require("../model/supervisor");

describe("Supervisor: ", () => {
	let supervisor;
	let orchestrator;
	const emit = () => sinon.spy();

	beforeEach(() => {
		supervisor = new Supervisor()
		orchestrator = { id: "a", emit: emit() }
	})

	describe("on add", () => {
		it("should add orchestrator to the orchestrators list properly", () => {
			supervisor.add(orchestrator);
			supervisor.should.containEql({ orchestrators: [orchestrator] });		
		})

		it("should set master orchestrator and emit master event if it is the first orchestrator", () => {
			supervisor.add(orchestrator);
			supervisor.should.containEql({ master: "a" });
			orchestrator.emit.should.be.calledWithExactly("master");
		})

		it("should add orchestrator to the orchestrators list properly and not set master nor emit master event if it is not the first orchestrator ", () => {
			_.assign(supervisor, { orchestrators: [{ id: "b" }], master: "b" });
			supervisor.add(orchestrator);
			supervisor.should.containEql({ orchestrators: [{ id: "b" }, orchestrator], master: "b" });
			orchestrator.emit.should.not.be.called();	
		})

	})
})