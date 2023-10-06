import { clearLocalStorage, persistLocalStorage } from "../utilities";

export const usePersistData = () => {
    const setPersistData = <T>(key: string, value: T) => {
        persistLocalStorage(key, value);
    };

    const removePersistData = (key: string) => {
        clearLocalStorage(key);
    };

    const getUser = () => localStorage.getItem("user");
    const getIdBarberShop = () => localStorage.getItem("idBarberShop");
    const getToken = () => localStorage.getItem("token");

    return { getUser, getIdBarberShop, getToken, setPersistData, removePersistData };
};
