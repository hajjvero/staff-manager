const KEY = 'plan_staff';

export default class StorageService {
    static save(data) {
        localStorage.setItem(KEY, JSON.stringify(data));
    }

    static load() {
        const raw = localStorage.getItem(KEY);
        if (!raw) return null;

        try {
            return JSON.parse(raw);
        } catch (e) {
            console.warn('Storage corrupted', e);
        }

        return null;
    }

    static clear() {
        localStorage.removeItem(KEY);
    }
}
