import Zone from './Zone.js';

export default class Plan {
    constructor(zones = []) {
        this.zones = zones.map(z => new Zone(z));
    }

    findZoneById(id) {
        return this.zones.find(z => z.id === id);
    }

    isAssignedEmployee(empId) {
        return this.zones.some(z => z.isFindMember(empId));
    }

    getZoneAssignedEmployee(empId) {
        return this.zones.find(z => z.isFindMember(empId));
    }

    placeEmployee(zoneId, employee) {
        const zone = this.findZoneById(zoneId);
        if (!zone) throw new Error('Zone not found');
        zone.addMember(employee);
    }

    removeEmployee(zoneId, employeeId) {
        const zone = this.findZoneById(zoneId);
        if (!zone) throw new Error('Zone not found');
        zone.removeMember(employeeId);
    }

    toJSON() {
        return this.zones.map(z => z.toJSON());
    }
}
