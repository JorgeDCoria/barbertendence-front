export const persistLocalStorage = <T,>(key: string, value: T) => {
    if (typeof value == "string") {
        localStorage.setItem(key, value);
    } else localStorage.setItem(key, JSON.stringify({ ...value }));
};

export const clearLocalStorage = (key: string) => {
    localStorage.removeItem(key);
};
