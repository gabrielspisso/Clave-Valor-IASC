const _ = require("lodash");

class Supervisor {
	constructor() {
		this.orchestrators = [];
	}

	add(orchestrator) {
		this.orchestrators = this.orchestrators.concat(orchestrator);
	}

	remove(orchestrator) {
		_.remove(this.orchestrators, { id: orchestrator.id });
	}
}

module.exports = new Supervisor();