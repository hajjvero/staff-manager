// EmployeeCard.js
export default class EmployeeCard {
    constructor(employee, { onClick = () => {}, onRemove = () => {} , onEdit = () => {}, onRemoveMember = null} = {}) {
        this.employee = employee;
        this.onClick = onClick;
        this.onEdit = onEdit;
        this.onRemove = onRemove;
        this.onRemoveMember = onRemoveMember;
        this.element = this.render();
    }

    render() {
        const li = document.createElement('li');
        li.setAttribute('class', 'list-group-item p-2 p-md-3 my-2 border rounded shadow-sm bg-secondary-subtle');
        li.setAttribute("style", "cursor: pointer;");
        li.setAttribute('draggable', 'true');

        li.innerHTML = `
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                <div class="d-flex align-items-center flex-grow-1 min-w-0">
                    <img class="staff-photo me-2 me-md-3 p-1" src="${this.employee.photo || '../../public/default-avatar.svg'}" alt="${this.employee.name}">
                    <div class="min-w-0">
                        <div class="fw-semibold text-truncate">${this.employee.name}</div>
                        <small class="text-muted">${this.employee.role}</small>
                    </div>
                </div>
                <div class="d-flex gap-1 gap-md-2 flex-shrink-0">
                    ${ 
                        this.onRemoveMember ? 
                        `
                            <button class="btn btn-sm btn-outline-danger rounded-circle p-1 flex-shrink-0 btn-delete-member"
                                        style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;"
                                        title="Delete member">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                                         viewBox="0 0 24 24">
                                        <g fill="none">
                                            <path stroke="currentColor" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="2"
                                                  d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4"/>
                                        </g>
                                    </svg>
                                </button>
                        ` :
                        `
                            <button class="btn btn-sm btn-outline-warning btn-edit-employee" title="Edit" data-bs-toggle="modal"
                                data-bs-target="#modalFormWorker">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                     viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"/>
                                </svg>
                            </button>
                            <button class="btn btn-sm btn-outline-danger btn-delete-employee" title="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                     viewBox="0 0 24 24">
                                    <g fill="none">
                                        <path fill="currentColor" d="M8 21h8a2 2 0 0 0 2-2V7H6v12a2 2 0 0 0 2 2"
                                              opacity=".16"/>
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4"/>
                                    </g>
                                </svg>
                            </button>
                        `
                    }
                </div>
            </div>
        `;

        // event edit
        li.querySelector(".btn-edit-employee")?.addEventListener('click' ,(e) => {
            e.stopPropagation();
             this.onEdit(this.employee);
        });

        // event delete
        li.querySelector(".btn-delete-employee")?.addEventListener('click',(e) => {
            e.stopPropagation();
            if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
                this.onRemove(this.employee);
            }
        });

        // event delete member
        li.querySelector(".btn-delete-member")?.addEventListener('click',(e) => {
            e.stopPropagation();
            if (confirm('Êtes-vous sûr de vouloir supprimer cet employe ?')) {
                this?.onRemoveMember(this.employee.id);
            }
        })

        // event click
        li.addEventListener('click', () => {
            this.onClick(this.employee);
        });

        // Event draggable
        li.addEventListener('dragstart', (e) => {
            li.classList.add('dragging');
            e.dataTransfer.setData('text/plain', this.employee.id);
        })

        li.addEventListener('dragend', () => {
            li.classList.remove('dragging');
        })

        return li;
    }
}
