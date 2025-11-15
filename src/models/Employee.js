import {generateUUID} from "../utils/helpers.js";

export default class Employee {
    constructor({ id = null, name = '', role = '', photo = '', email = '', phone = '', experiences = [] } = {}) {
        this.id = id || generateUUID("emp_");
        this.name = name;
        this.role = role;
        this.photo = photo;
        this.email = email;
        this.phone = phone;
        this.experiences = experiences; // array
    }

    update(data = {}) {
        Object.assign(this, data);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            role: this.role,
            photo: this.photo,
            email: this.email,
            phone: this.phone,
            experiences: this.experiences.map(exp => exp.toJSON())
        };
    }
}
