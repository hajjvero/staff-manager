import {generateUUID} from "../utils/helpers.js";

export default class Experience {
    constructor(id, company, role, from, to, ) {
        this.id = id || generateUUID("exp_");
        this.company = company;
        this.role = role;
        this.from = from;
        this.to = to;
    }

    update(data = {}) {
        Object.assign(this, data);
    }

    toJSON() {
        return {
            id: this.id,
            company: this.company,
            role: this.role,
            from: this.from,
            to: this.to
        };
    }
}