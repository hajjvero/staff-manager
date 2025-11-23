import Employee from '../models/Employee.js';
import Plan from '../models/Plan.js';
import StorageService from '../services/StorageService.js';
import EmployeeCard from '../components/EmployeeCard.js';
import ValidationService from "../services/ValidationService.js";
import ExperienceCard from "../components/ExperienceCard.js";
import {isEmpty} from "../utils/helpers.js";
import Experience from "../models/Experience.js";
import ZoneCard from "../components/ZoneCard.js";

export default class AppController {
    constructor(data) {
        this.employees = (data.employees || []).map(e => new Employee(e));
        this.plan = new Plan(data.zones || []);
        this.valodatore = new ValidationService(this);
        this.temporaryExperience = [];
    }

    init() {
        this.bindUI();

        this.renderUnassignedList();

        this.renderZonesList();
    }

    // =================== Render ===================

    renderUnassignedList() {
        const search = this.searchInput.value.toLowerCase().trim();
        let filteredEmployees = this.employees.filter(e => !this.isAssigned(e.id));
        if (!isEmpty(search)) {
            filteredEmployees = filteredEmployees.filter(emp => emp.name.toLowerCase().includes(search) || emp.role.toLowerCase().includes(search) || emp.email.toLowerCase().includes(search));
        }

        this.containerUnassignedList.innerHTML = '';

        if (filteredEmployees.length > 0) {
            filteredEmployees
                .forEach(emp => {
                    const card = new EmployeeCard(emp, {
                        onClick: () => this.openEmployeeProfile(emp),
                        onRemove: () => this.removeEmployeeFromUnassigned(emp.id),
                        onEdit: () => this.editEmployee(emp)
                    });
                    this.containerUnassignedList.appendChild(card.element);
                });
        } else {
            this.containerUnassignedList.innerHTML = '<li class="list-group-item"><p class="text-center small text-muted">Aucun employé n\'est disponible.</p></li>';
        }

        // save changes
        this.saveState();
    }

    renderZonesList() {
        const container = document.getElementById('zonesList');
        container.innerHTML = '';

        this.plan.zones.forEach(zone => {
            const card = new ZoneCard(zone, this.employees,{
                onAddMemberModal: () => this.onAddMemberModal(zone),
                onRemoveMember: (empId) => this.removeEmployeeFromZone(zone.id, empId),
                onClickMember: (emp) => this.openEmployeeProfile(emp),
                onDragMember: (empId) => this.assignEmployeeByDrag(zone, empId),
            });
            container.appendChild(card.element);
        });
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
        // Search input
        this.searchInput = document.getElementById('searchInput');
        this.clearSearch = document.getElementById('clearSearch');

        this.workerForm = document.getElementById('workerForm');
        this.btnAddWorker = document.getElementById('btn-add-worker');
        this.modalFormWorkerLabel = document.getElementById('modalFormWorkerLabel');
        this.btnCancelWorkerForm = document.getElementById('btn-cancel-worker-form');

        // Worker inputs
        this.inputWorkerId = document.getElementById('workerId');
        this.inputWorkerName = document.getElementById('workerName');
        this.inputWorkerRole = document.getElementById('workerRole');

        // handle photo
        this.inputWorkerPhoto = document.getElementById('workerPhoto');
        this.inputWorkerPhotoFile = document.getElementById('photo-file');
        this.photoPreview = document.getElementById('photo-preview');

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
                if(!isEmpty(this.inputExperienceTo.value) && !(new Date(this.inputExperienceFrom.value) < new Date(this.inputExperienceTo.value))) {
                    this.valodatore.displayError(this.inputExperienceTo, "La date de fin doit être supérieure à la date de début.");
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
                    photo: this.photoPreview.src && !this.photoPreview.src.trim().includes('public/default-avatar.svg') ? this.photoPreview.src : null,
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
        });

        // Event of hande photo
        // 1 - from url
        this.inputWorkerPhoto.addEventListener('input', () => {
            if (!isEmpty(this.inputWorkerPhoto.value.trim())) {
                this.photoPreview.src = this.inputWorkerPhoto.value.trim();
            } else {
                this.photoPreview.src = '../../public/default-avatar.svg';
            }
        });
        // 2 - from file
        this.inputWorkerPhotoFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                if (!file.type.match('image/*')) {
                    alert('Le fichier n\'est pas une image.');
                }
                else if (file.size > 1024 * 1024 * 3) {
                    alert('La taille du fichier est trop grande, veuillez choisir une image de moins de 3Mo.');
                } else {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.inputWorkerPhoto.value = '';
                        this.photoPreview.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }

                // Clear file input so that selecting the same file again will trigger the change event
                e.target.value = '';
            }
        });

        // search logic
        this.searchInput.addEventListener('input', (e) => {
            this.renderUnassignedList();
        });

        this.clearSearch.addEventListener('click', (e) => {
            this.searchInput.value = '';
            this.renderUnassignedList();
        });

        // unassigned List drag events
        this.containerUnassignedList = document.getElementById('unassignedList');
        this.containerUnassignedList.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        this.containerUnassignedList.addEventListener('drop', (e) => {
            const employeeId = e.dataTransfer.getData('text/plain');
            if (this.isAssigned(employeeId)) {
                this.plan.removeEmployeeFromPlan(employeeId); // remove employee from plan
                this.renderUnassignedList(); // render unassigned list
                this.renderZonesList(); // render zones list
            }
        });

        // sign all workers
        this.signAllWorkers = document.getElementById('signAllWorkers');
        this.signAllWorkers.addEventListener('click', (e) => {
            this.plan.signAllWorkers(this.employees);

            this.renderUnassignedList();
            this.renderZonesList();
            this.saveState();
        });
    }

    // =================== Zone ===================

    onAddMemberModal(zone) {
        // get container of members in modal
        const container = document.getElementById('membersZoneContainer');
        container.innerHTML = '';

        const employees = this.employees.filter(emp => zone.canAccept(emp) && !this.plan.isAssignedEmployee(emp.id));
        if (employees.length > 0) {
                employees.forEach(emp => {
                    const card = new EmployeeCard(emp, {
                        onClick: () => this.assignEmployee(zone, emp),
                        onEdit: () => this.editEmployee(emp),
                        onRemove: () => this.removeEmployeeFromUnassigned(emp.id)
                    });

                    container.appendChild(card.element);
                });
        } else {
            container.innerHTML = '<li class="list-group-item"><p class="text-center text-muted small">Aucun employé disponible</p></li>';
        }

    }

    assignEmployee(zone, emp) {
        this.plan.placeEmployee(zone.id, emp);
        this.renderZonesList(); // update zones spaces
        this.renderUnassignedList(); // update unassigned list
        this.onAddMemberModal(zone); // update members list in modal
        this.saveState();
    }

    assignEmployeeByDrag(zone, empId) {
        const emp = this.employees.find(emp => emp.id === empId);
        if (zone.canAccept(emp)) {
            this.plan.removeEmployeeFromPlan(empId);
            this.assignEmployee(zone, emp);
        } else {
            alert("Cet employé ne peut pas être assigné à cette zone.");
        }
    }

    removeEmployeeFromZone(zoneId, empId) {
        this.plan.removeEmployee(zoneId, empId);
        this.renderZonesList(); // update zones spaces
        this.renderUnassignedList(); //  update unassigned list
        this.saveState();
    }

    // ==================== Employee ===================
    openEmployeeProfile(employer) {
        const modalBody = document.getElementById('modalProfileWorkerBody');
        const zoneLocation = this.plan.getZoneAssignedEmployee(employer.id);
        modalBody.innerHTML = `
            <!-- Employer Photo -->
            <div class="text-center mb-4">
                <img src="${employer.photo ?? '../../public/default-avatar.svg'}" alt="${employer.name}" class="rounded-circle img-thumbnail" style="width: 120px; height: 120px; object-fit: cover;">
            </div>
        
            <!-- Personal Information -->
            <div class="mb-4">
                <h5 class="border-bottom pb-2 mb-3">Personal Information</h5>
                <div class="row row-cols-1 row-cols-md-2">
                    <div class="col mb-3">
                        <strong class="d-block text-muted small">Name</strong>
                        <span>${employer.name}</span>
                    </div>
                    <div class="col mb-3">
                        <strong class="d-block text-muted small">Role</strong>
                        <span>${employer.role}</span>
                    </div>
                    <div class="col mb-3">
                        <strong class="d-block text-muted small">Email</strong>
                        <a href="mailto:${employer.email}">${employer.email}</a>
                    </div>
                    <div class="col mb-3">
                        <strong class="d-block text-muted small">Phone</strong>
                        <a href="tel:${employer.phone}">${employer.phone}</a>
                    </div>
                    ${!zoneLocation ? '' : `
                        <div class="col mb-3">
                            <strong class="d-block text-muted small">Current Location</strong>
                            <span>${zoneLocation.name}</span>
                        </div>
                    `}
                </div>
            </div>
        
            <!-- Experience Section -->
            <div>
                <h5 class="border-bottom pb-2 mb-3">Les experiences</h5>
                ${employer.experiences.length > 0 ? `
                    <div class="list-group">
                        ${employer.experiences.map(exp => `
                            <div class="list-group-item">
                                <div class="d-flex w-100 justify-content-between align-items-start">
                                    <h6 class="mb-1">${exp.role}</h6>
                                    <small class="text-muted">${exp.from} - ${exp.to || 'Present'}</small>
                                </div>
                                <p class="mb-0 text-muted">${exp.company}</p>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <p class="text-muted">No experience added yet.</p>
                `}
            </div>
        `;

        bootstrap.Modal.getOrCreateInstance(document.getElementById('modalDetailsWorker')).show();
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

        // display photo
        if (!employee.photo.startsWith("data:")) {
            this.inputWorkerPhoto.value = employee.photo;
        }
        this.photoPreview.src = employee.photo;

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
        this.photoPreview.src = '../../public/default-avatar.svg';
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
