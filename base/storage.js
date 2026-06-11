// ==============================
// STORAGE BASE (NÃO MEXER)
// ==============================

window.Storage = {

    get(key) {
        try {
            return JSON.parse(localStorage.getItem(key)) || [];
        } catch (e) {
            console.error("Storage get error:", key, e);
            return [];
        }
    },

    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    update(key, callback) {
        const data = this.get(key);
        const updated = callback(data);
        this.set(key, updated);
        return updated;
    }
};