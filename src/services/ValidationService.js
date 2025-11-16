import {isEmail, isEmpty, isPhone} from "../utils/helpers.js";

export default class ValidationService {
    // list of errors
    _errors = [];

    constructor(controller) {
        this.controller = controller;
    }

    isValide() {
        this._errors.map((item) => this.removeError(item.element));
        this._errors = [];

        if (isEmpty(this.controller.inputWorkerName.value.trim())) {
            this._errors.push({
                element: this.controller.inputWorkerName,
                message: "Ce champ est requis."
            });
        }

        if (isEmpty(this.controller.inputWorkerRole.value.trim())) {
            this._errors.push({
                element: this.controller.inputWorkerRole,
                message: "Ce champ est requis."
            });
        }

        if (!isEmail(this.controller.inputWorkerEmail.value.trim())) {
            this._errors.push({
                element: this.controller.inputWorkerEmail,
                message: "Veuillez entrer une adresse e-mail valide. Exemple : 'exemple@mail.com'"
            });
        }

        if (isEmpty(this.controller.inputWorkerPhone.value.trim())) {
            this._errors.push({
                element: this.controller.inputWorkerPhone,
                message: "Ce champ est requis."
            });
        } else if (!isPhone(this.controller.inputWorkerPhone.value.trim())) {
            this._errors.push({
                element: this.controller.inputWorkerPhone,
                message: "Veuillez entrer un numéro de téléphone valide. Exemple : '+212 6 01 23 45 67 ou 06 01 23 45 67'"
            });
        }

        // Afficher les erreurs
        this._errors.map((item) => this.displayError(item.element, item.message));

        return this._errors.length === 0;
    }

    displayError(target, error) {
        const messageElement = document.createElement("p");
        messageElement.setAttribute("class", "my-1 text-danger small");
        messageElement.textContent = error;

        // Ajouter les classes d'état d'erreur
        target.classList.add("border-danger");

        target.parentElement?.append(messageElement);
    }

    removeError(target) {
        target.nextElementSibling?.remove();

        // Supprimer les classes d'état d'erreur
        target.classList.remove("border-danger");
    }
}