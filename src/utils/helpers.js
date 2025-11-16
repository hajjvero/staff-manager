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

export function isEmpty(value) {
    return value === null || value === undefined || value.toString().trim() === '';
}

export function isEmail(email) {
    if (isEmpty(email)) return false;
    const emailRegex = /^[^\s@#%&?]+@[^\s@]+\.[^\s@]+$/g;
    return emailRegex.test(email);
}

export function isURL(url) {
    if (isEmpty(url)) return false;
    const urlRegex = /^(https|http):\/\/([\w-]+)\.([\w]{2,6})([\/\w\.-]*)\/?$/;
    return urlRegex.test(url);
}

export function isPhone(phone) {
    if (isEmpty(phone)) return false;
    const phoneRegex = /^(\+212|0)[\s-]?(6|7)([\s-]\d{2}){4}/;
    return phoneRegex.test(phone);
}