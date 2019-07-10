const _ = require("lodash");

class Supervisor {
	constructor() {
		this.orchestrators = [];
		this.master = null;
	}

	add(orchestrator) {
		this.orchestrators = this.orchestrators.concat(orchestrator);
		this.master || this._setMaster(orchestrator);
	}

	remove({ id }) {
		_.remove(this.orchestrators, { id });
		this._setMasterIfNeeded(id)
	}

	_setMasterIfNeeded(id) {
		this.master == id && this._setMaster(this.orchestrators[0])
	}

	_setMaster(orchestrator = {}) {
		this.master = orchestrator.id;
		this.master && orchestrator.emit("master");
	}
}

module.exports = new Supervisor();