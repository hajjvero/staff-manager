export default class ZoneCard {
    constructor(zone, { onAddMember = () => {}, onRemoveMember = () => {} } = {}) {
        this.zone = zone;
        this.onAddMember = onAddMember;
        this.onRemoveMember = onRemoveMember;
        this.element = this.render();
    }

    render() {
        const article = document.createElement('article');
        article.className = 'col';
        
        // Compter le nombre de membres dans la zone
        const memberCount = this.zone.members.length;
        const hasMembers = memberCount > 0;
        
        article.innerHTML = `
            <div class="zone ${this.zone.required ? 'bg-danger-subtle' : ''}">
                <div class="d-flex justify-content-between align-items-center p-2 p-md-3 border-bottom">
                    <div>
                        <span class="fw-semibold small">${this.zone.name}</span>
                        <span class="badge bg-secondary ms-2">${memberCount} / ${this.zone.capacity}</span>
                    </div>
                    <button class="btn btn-primary btn-sm rounded-circle p-1 btn-add-member" 
                            style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;" 
                            title="Ajouter un membre">
                        +
                    </button>
                </div>
                <div class="p-3 d-flex align-items-center justify-content-center" 
                     style="min-height: 120px;">
                    ${hasMembers ? 
                        `<div class="w-100">
                            <ul class="list-group list-group-flush">
                                <!-- Les membres seront ajoutés ici dynamiquement -->
                            </ul>
                        </div>` : 
                        `<p class="text-center text-muted small mb-0">Aucun employé affecté</p>`
                    }
                </div>
            </div>
        `;
        
        // Ajout de l'événement sur le bouton d'ajout
        article.querySelector(".btn-add-member").addEventListener('click', (e) => {
            e.stopPropagation();
            this.onAddMember(this.zone);
        });
        
        return article;
    }
}