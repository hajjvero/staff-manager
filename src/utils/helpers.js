import { v4 as uuidv4 } from '../../node_modules/uuid/dist/index.js';

/**
 * Génère une chaîne UUID
 * @param {string} [prefix] - Le préfixe à ajouter à l'UUID
 * @returns {string} Retourne une chaîne UUIDv4
 */
export function generateUUID(prefix = '') {
    // Appelle la fonction uuidv4 pour générer l'UUID
    return `${prefix}${uuidv4()}`;
}