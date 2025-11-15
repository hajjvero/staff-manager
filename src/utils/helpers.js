import { v4 as uuidv4 } from '../../node_modules/uuid';

/**
 * Génère une chaîne UUID
 * @returns {string} Retourne une chaîne UUIDv4
 */
export function generateUUID() {
    // Appelle la fonction uuidv4 pour générer l'UUID
    return uuidv4();
}