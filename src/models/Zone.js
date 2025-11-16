import {generateUUID} from "../utils/helpers.js";
import {ROLES} from "../utils/constants.js";

export default class Zone {
    constructor({ id, name, allowedRoles = [], capacity = 0, required = false } = {}) {
        this.id = id || generateUUID("zone_");
        this.name = name;
        this.allowedRoles = allowedRoles; // ex: ['Receptionist']
        this.capacity = capacity;
        this.required = required; // true si doit contenir au moins 1 membre
        this.members = []; // array of employee ids
    }

    canAccept(employee) {
        // Manager can be everywhere (example)
        if (!this.allowedRoles || this.allowedRoles.length === 0) return true;
        if (employee.role === ROLES.MANAGER) return true;
        return this.allowedRoles.includes(employee.role);
    }

    addMember(employee) {
        if (this.members.length >= this.capacity) throw new Error('Zone is full');
        if (!this.canAccept(employee)) throw new Error('Role not allowed in this zone');
        this.members.push(employee.id);
    }

    removeMember(employeeId) {
        this.members = this.members.filter(id => id !== employeeId);
    }

    isEmpty() {
        return this.members.length === 0;
    }

    isFindMember(employeeId) {
        return this.members.includes(employeeId);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            allowedRoles: this.allowedRoles,
            capacity: this.capacity,
            required: this.required,
            members: this.members
        };
    }
}
