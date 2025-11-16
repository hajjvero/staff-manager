import Employee from '../models/Employee.js';
import Plan from '../models/Plan.js';
import StorageService from '../services/StorageService.js';
import EmployeeCard from '../components/EmployeeCard.js';
import ValidationService from "../services/ValidationService.js";
import ExperienceCard from "../components/ExperienceCard.js";
import {isEmpty} from "../utils/helpers.js";
import Experience from "../models/Experience.js";

export default class AppController {
    constructor(data) {
        this.employees = (data.employees || []).map(e => new Employee(e));
        this.plan = new Plan(data.zones || []);
        this.valodatore = new ValidationService(this);
        this.temporaryExperience = [];
    }

    init() {
        this.renderUnassignedList();

        this.bindUI();
    }

    // =================== Render ===================

    renderUnassignedList() {
        const container = document.getElementById('unassignedList');
        container.innerHTML = '';

        if (this.employees.length > 0) {
            this.employees.filter(e => !this.isAssigned(e.id))
                .forEach(emp => {
                    const card = new EmployeeCard(emp, {
                        onClick: () => this.openEmployeeProfile(emp),
                        onRemove: () => this.removeEmployeeFromUnassigned(emp.id),
                        onEdit: () => this.editEmployee(emp)
                    });
                    container.appendChild(card.element);
                });
        } else {
            container.innerHTML = '<p class="text-center small text-muted">Aucun employé n\'est disponible.</p>';
        }

        // save changes
        this.saveState();
    }

    renderExperienceList() {
        const container = document.getElementById('experiencesList');
        container.innerHTML = '';

        if (this.temporaryExperience.length > 0) {
            this.temporaryExperience.forEach((ex) => {
                const card = new ExperienceCard(ex, {
                    onEdit: () => this.editExperience(ex),
                    onRemove: () => this.removeExperience(ex)
                });

                container.appendChild(card.element);
            })
        } else {
            container.innerHTML = '<p class="text-center small text-muted">Aucune expérience n\'est disponible.</p>';
        }
    }

    // =================== Bind ===================
    bindUI() {
        this.workerForm = document.getElementById('workerForm');
        this.btnAddWorker = document.getElementById('btn-add-worker');
        this.modalFormWorkerLabel = document.getElementById('modalFormWorkerLabel');
        this.btnCancelWorkerForm = document.getElementById('btn-cancel-worker-form');

        // Worker inputs
        this.inputWorkerId = document.getElementById('workerId');
        this.inputWorkerName = document.getElementById('workerName');
        this.inputWorkerRole = document.getElementById('workerRole');
        this.inputWorkerPhoto = document.getElementById('workerPhoto');
        this.inputWorkerEmail = document.getElementById('workerEmail');
        this.inputWorkerPhone = document.getElementById('workerPhone');

        // Experience inputs
        this.inputExperienceId = document.getElementById('experienceId');
        this.inputExperienceCompany = document.getElementById('experienceCompany');
        this.inputExperienceRole = document.getElementById('experienceRole');
        this.inputExperienceFrom = document.getElementById('experienceFrom');
        this.inputExperienceTo = document.getElementById('experienceTo');

        this.btnSaveExperience = document.getElementById('btn-sve-experience');

        // Event click on add worker
        this.btnAddWorker.addEventListener('click', () => {
            this.modalFormWorkerLabel.innerHTML = 'Ajouter un nouvel employé';
            this.clearForm();
        });

        // Event click on cancel form worker
        this.btnCancelWorkerForm.addEventListener('click', () => {
            this.clearForm();
        });

        // Event click on save experience
        this.btnSaveExperience.addEventListener('click', () => {
            // validate inputs
            const clearErrors = () => {
                this.valodatore.removeError(this.inputExperienceCompany);
                this.valodatore.removeError(this.inputExperienceRole);
                this.valodatore.removeError(this.inputExperienceFrom);
                this.valodatore.removeError(this.inputExperienceTo);
            };

            const isValidateForm = () => {
                clearErrors();
                let isValid = true;

                if(isEmpty(this.inputExperienceCompany.value)) {
                    this.valodatore.displayError(this.inputExperienceCompany, "Ce champ est requis.");
                    isValid = false;
                }
                if(isEmpty(this.inputExperienceRole.value)) {
                    this.valodatore.displayError(this.inputExperienceRole, "Ce champ est requis.");
                    isValid = false;
                }
                if(isEmpty(this.inputExperienceFrom.value)) {
                    this.valodatore.displayError(this.inputExperienceFrom, "Ce champ est requis.");
                    isValid = false;
                }

                return isValid;
            };

            if (isValidateForm()) {
                const experienceId = this.inputExperienceId.value.trim() || null;
                const experience = new Experience({
                    id: experienceId,
                    company: this.inputExperienceCompany.value,
                    role: this.inputExperienceRole.value,
                    from: this.inputExperienceFrom.value,
                    to: this.inputExperienceTo.value
                });

                // edit
                if (experienceId) {
                    this.temporaryExperience[this.temporaryExperience.findIndex((exp) => exp.id === experienceId)] = experience;
                }
                // add
                else {
                    this.temporaryExperience.push(experience);
                }

                this.clearFormExperience();
                this.renderExperienceList();
            }

        })

        // Event click on save form worker
        this.workerForm.addEventListener('submit', (e) => {
            // stop submit
            e.preventDefault();
            if (this.valodatore.isValide()) {
                const id = this.inputWorkerId.value.trim() || null
                const employee = new Employee({
                    id,
                    name: this.inputWorkerName.value,
                    role: this.inputWorkerRole.value,
                    photo: this.inputWorkerPhoto.value,
                    email: this.inputWorkerEmail.value,
                    phone: this.inputWorkerPhone.value,
                    experiences: this.temporaryExperience
                });

                if (id) {
                    this.employees[this.employees.findIndex(e => e.id === id)] = employee;
                } else {
                    this.employees.push(employee);
                }

                // close modal
                bootstrap.Modal.getInstance(document.getElementById('modalFormWorker')).hide();
                this.clearForm();

                this.renderUnassignedList();
            }
        })
    }

    openEmployeeProfile(emp) {
        console.log("profile");
        // TODO: profile
    }

    editEmployee(emp) {
        this.modalFormWorkerLabel.innerHTML = 'Modifier un employe';
        this.fillForm(emp);
    }

    removeEmployeeFromUnassigned(empId) {
        this.employees.splice(this.employees.findIndex(e => e.id === empId), 1)
        this.renderUnassignedList();
    }

    // =================== Experience ===================
    editExperience(exp) {
        this.fillFormExperience(exp);
    }

    removeExperience(exp) {
        this.temporaryExperience.splice(this.temporaryExperience.findIndex(e => e.id === exp.id), 1);
        this.renderExperienceList();
    }

    // ============== Form ===================

    fillForm(employee) {
        this.inputWorkerId.value = employee.id;
        this.inputWorkerName.value = employee.name;
        this.inputWorkerRole.value = employee.role;
        this.inputWorkerPhoto.value = employee.photo;
        this.inputWorkerEmail.value = employee.email;
        this.inputWorkerPhone.value = employee.phone;

        this.temporaryExperience = employee.experiences.map(exp => new Experience(exp));

        this.renderExperienceList();
    }

    fillFormExperience(experience) {
        this.inputExperienceId.value = experience.id;
        this.inputExperienceCompany.value = experience.company;
        this.inputExperienceRole.value  = experience.role;
        this.inputExperienceFrom.value = experience.from;
        this.inputExperienceTo.value = experience.to;
    }

    clearForm() {
        this.inputWorkerName.value = '';
        this.inputWorkerRole.value = '';
        this.inputWorkerPhoto.value = '';
        this.inputWorkerEmail.value = '';
        this.inputWorkerPhone.value = '';

        this.clearFormExperience();

        this.temporaryExperience = [];

        this.renderExperienceList();
    }

    clearFormExperience() {
        this.inputExperienceId.value = '';
        this.inputExperienceCompany.value = '';
        this.inputExperienceRole.value = '';
        this.inputExperienceFrom.value = '';
        this.inputExperienceTo.value = '';
    }

    // =================== Utils ===================
    isAssigned(empId) {
        return this.plan.isAssignedEmployee(empId);
    }

    saveState() {
        const payload = {
            employees: this.employees.map(e => e.toJSON()),
            zones: this.plan.toJSON()
        };
        StorageService.save(payload);
    }
}
