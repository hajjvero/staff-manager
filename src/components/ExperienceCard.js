export default class ExperienceCard {
    constructor(experience, { onEdit = () => {}, onRemove = () => {} } = {}) {
        this.experience = experience;
        this.onEdit = onEdit;
        this.onRemove = onRemove;
        this.element = this.render();
    }

    render() {
        const div = document.createElement('div');
        div.setAttribute('class', 'card shadow-sm mb-2');
        
        div.innerHTML = `
            <div class="card-body p-3">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <h6 class="mb-1 fw-bold">${this.experience.role}</h6>
                        <p class="mb-1 text-muted small">${this.experience.company}</p>
                        <p class="mb-0 text-muted small">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                            </svg>
                            ${this.experience.from} - ${this.experience.to || 'Present'}
                        </p>
                    </div>
                    <div class="d-flex">
                        <button type="button" class="btn btn-sm btn-outline-info btn-edit-experience" title="Edit experience">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                 viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"/>
                            </svg>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger ms-2 btn-delete-experience" title="Delete experience">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Edit button event
        div.querySelector(".btn-edit-experience").addEventListener('click', (e) => {
            this.onEdit(this.experience);
        });

        // Delete button event
        div.querySelector(".btn-delete-experience").addEventListener('click', (e) => {
            if (confirm('Êtes-vous sûr de vouloir supprimer cette expérience ?')) {
                this.onRemove(this.experience);
            }
        });

        return div;
    }
}