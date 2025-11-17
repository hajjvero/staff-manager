import EmployeeCard from "./EmployeeCard.js";

export default class ZoneCard {
    constructor(zone, employees, { onAddMemberModal = () => {}, onRemoveMember = () => {}, onClickMember = () => {}, onDragMember = () => {} } = {}) {
        this.zone = zone;
        this.employees = employees;
        this.onAddMemberModal = onAddMemberModal;
        this.onRemoveMember = onRemoveMember;
        this.onClickMember = onClickMember;
        this.onDragMember = onDragMember;
        this.element = this.render();
    }

    render() {
        const article = document.createElement('article');
        article.className = 'col';
        
        // Compter le nombre de membres dans la zone
        const memberCount = this.zone.members.length;
        const hasMembers = memberCount > 0;
        
        article.innerHTML = `
            <div class="zone ${this.zone.required && memberCount === 0 ? 'bg-danger-subtle' : ''}">
                <div class="d-flex justify-content-between align-items-center p-2 p-md-3 border-bottom">
                    <div>
                        <span class="fw-semibold small">${this.zone.name}</span>
                        <span class="badge bg-secondary ms-2">${memberCount} / ${this.zone.capacity}</span>
                    </div>
                    <button class="btn btn-primary btn-sm rounded-circle p-1 btn-add-member" data-bs-toggle="modal" ${memberCount === this.zone.capacity ? 'disabled' : ''}
                        data-bs-target="#modalStaffAssignToZone"
                            style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;" 
                            title="Ajouter un membre">
                        +
                    </button>
                </div>
                 <ul class="members-cotainer p-1" style="min-height: 120px;">
                    
                 </ul>             
            </div>
        `;

        const membersContainer = article.querySelector(".members-cotainer");

        if (hasMembers) {
            this.zone.members.forEach((memberId) => {
                const employee = this.employees.find(emp => emp.id === memberId);
                const employeeCard = new EmployeeCard(employee, {
                    onClick: (emp) => this.onClickMember(emp),
                    onRemoveMember: (empId) => this.onRemoveMember(empId)
                });
                membersContainer.appendChild(employeeCard.element);
            });
        } else {
            membersContainer.innerHTML = `<p class="text-center text-muted small mb-0">Aucun employe affecté</p>`;
        }
        
        // Ajout de l'événement sur le bouton d'ajout
        article.querySelector(".btn-add-member").addEventListener('click', (e) => {
            e.stopPropagation();
            this.onAddMemberModal();
        });

        // Event draggable
        membersContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        //  Event drag enter
        membersContainer.addEventListener('dragenter', (e) => {
            e.preventDefault();
            membersContainer.classList.add('border', 'border-primary', 'border-2', 'rounded-2');
        });

        //  Event drag leave
        membersContainer.addEventListener('dragleave', (e) => {
            e.preventDefault();
            membersContainer.classList.remove('border', 'border-primary', 'border-2', 'rounded-2');
        });

        // Event drop
        membersContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            membersContainer.classList.remove('border', 'border-2', 'rounded-2');
            membersContainer.classList.remove('border-primary');

            const empId = e.dataTransfer.getData('text/plain');
            this.onDragMember(empId);
        });
        
        return article;
    }
}