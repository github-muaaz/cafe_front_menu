const storage = {
    get: (key) => {
        return JSON.parse(window.localStorage && window.localStorage.getItem(key)) || null;
    },
    set: (key, value, deleteOld) => {
        if (!value || value.length <= 0)
            return;

        if (window.localStorage && deleteOld)
            window.localStorage.setItem(key, JSON.stringify({...value}));
        else if (window.localStorage && !deleteOld)
            window.localStorage.setItem(key, JSON.stringify({...JSON.parse(localStorage.getItem(key)), ...value}));
    },
    remove: (key) => {
        if (window.localStorage && window.localStorage[key]) {
            window.localStorage.removeItem(key);
        }
    },
};

export default storage;