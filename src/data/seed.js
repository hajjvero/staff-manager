import {ROLES} from "../utils/constants.js";

// Plan de travail
export default {
    // Les zones disponibles
    zones: [
        {
            name: "Salle de réception",
            allowedRoles: [ROLES.RECEPTIONISTE, ROLES.NETTOYAGE],
            maxEmployees: 3,
        },
        {
            name: "Salle de conférence",
            allowedRoles: [ROLES.RECEPTIONISTE, ROLES.IT, ROLES.SECURITE, ROLES.NETTOYAGE, ROLES.AUTRES],
            maxEmployees: 10,
        },
        {
            name: "Salle des serveurs",
            allowedRoles: [ROLES.IT, ROLES.NETTOYAGE],
            maxEmployees: 4,
        },
        {
            name: "Salle de sécurité",
            allowedRoles: [ROLES.SECURITE, ROLES.NETTOYAGE],
            maxEmployees: 5,
        },
        {
            name: "Salle du personnel",
            allowedRoles: [ROLES.RECEPTIONISTE, ROLES.IT, ROLES.SECURITE, ROLES.NETTOYAGE, ROLES.AUTRES],
            maxEmployees: 10,
        },
        {
            // Nettoyage n'est PAS autorisé
            name: "Salle d’archives",
            allowedRoles: [ROLES.RECEPTIONISTE, ROLES.IT, ROLES.SECURITE, ROLES.AUTRES],
            maxEmployees: 6,
        },
    ]
}
