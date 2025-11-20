import Zone from './Zone.js';
import {ROLES} from "../utils/constants.js";

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

    removeEmployeeFromPlan(employeeId) {
        this.zones.forEach(zone => zone.removeMember(employeeId));
    }

    removeEmployee(zoneId, employeeId) {
        const zone = this.findZoneById(zoneId);
        if (!zone) throw new Error('Zone not found');
        zone.removeMember(employeeId);
    }

    signAllWorkers(employees) {
        this.zones.forEach(zone => {
            switch (zone.name) {
                case "Salle des serveurs":
                    employees.forEach(emp => {
                        if (emp.role === ROLES.IT) {
                            this.removeEmployeeFromPlan(emp.id);
                            zone.addMember(emp);
                        }
                    });
                    break;
                case "Salle de sécurité":
                    employees.forEach(emp => {
                        if (emp.role === ROLES.SECURITE) {
                            this.removeEmployeeFromPlan(emp.id);
                            zone.addMember(emp);
                        }
                    });
                    break;
                case "Salle de réception":
                    employees.forEach(emp => {
                        if (emp.role === ROLES.RECEPTIONISTE) {
                            this.removeEmployeeFromPlan(emp.id);
                            zone.addMember(emp);
                        }
                    });
                    break;
                case "Salle de conférence":
                case "Salle du personnel":
                    employees.forEach(emp => {
                        if (!this.isAssignedEmployee(emp.id)) {
                            zone.addMember(emp);
                        }
                    });
                    break;
            }
        });
    }

    toJSON() {
        return this.zones.map(z => z.toJSON());
    }
}
