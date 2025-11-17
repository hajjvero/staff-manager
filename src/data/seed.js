import {ROLES} from "../utils/constants.js";

// Plan de travail
export default {
    // Les zones disponibles
    zones: [
        {
            name: "Salle de conférence",
            allowedRoles: [ROLES.RECEPTIONISTE, ROLES.IT, ROLES.SECURITE, ROLES.NETTOYAGE, ROLES.AUTRES],
            capacity: 10,
            required: false
        },
        {
            name: "Salle des serveurs",
            allowedRoles: [ROLES.IT, ROLES.NETTOYAGE],
            capacity: 4,
            required: true
        },
        {
            name: "Salle de sécurité",
            allowedRoles: [ROLES.SECURITE, ROLES.NETTOYAGE],
            capacity: 5,
            required: true
        },
        {
            name: "Salle de réception",
            allowedRoles: [ROLES.RECEPTIONISTE, ROLES.NETTOYAGE],
            capacity: 3,
            required: true
        },
        {
            name: "Salle du personnel",
            allowedRoles: [ROLES.RECEPTIONISTE, ROLES.IT, ROLES.SECURITE, ROLES.NETTOYAGE, ROLES.AUTRES],
            capacity: 10,
            required: false
        },
        {
            // Nettoyage n'est PAS autorisé
            name: "Salle d’archives",
            allowedRoles: [ROLES.RECEPTIONISTE, ROLES.IT, ROLES.SECURITE],
            capacity: 6,
            required: true
        },
    ]
}
