const _ = require("lodash");
const should = require("should");
const sinon = require("sinon");
require("should-sinon");
const Supervisor = require("../model/supervisor");

describe("Supervisor: ", () => {
	let supervisor;
	const emit = () => sinon.spy();

	beforeEach(() => {
		supervisor = new Supervisor()
	})

	describe("on add", () => {
		let orchestrator;

		beforeEach(() => {
			orchestrator = { id: "a", emit: emit() }
		})

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

	describe("on remove", () => {
		it("should only remove orchestrator if it not remove the currentMaster", () => {
			const currentMaster = { id: "a", emit: emit() };
			const orchestrator = { id: "b" };
			_.assign(supervisor, { orchestrators: [currentMaster, orchestrator], master: "a" });
			supervisor.remove(orchestrator);
			supervisor.should.containEql({ orchestrators: [currentMaster], master: "a" });
			currentMaster.emit.should.not.be.called();
		})

		it("should set new master and emit master event to that one if remove the currentMaster", () => {
			const currentMaster = { id: "a" };
			const newMaster = { id: "b", emit: emit() };
			_.assign(supervisor, { orchestrators: [currentMaster, newMaster], master: "a" });
			supervisor.remove(currentMaster);
			supervisor.should.containEql({ master: newMaster.id });
			newMaster.emit.should.be.calledWithExactly("master");
		})
	})
})