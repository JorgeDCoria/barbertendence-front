import { User } from "../types";
import { clearLocalStorage, persistLocalStorage } from "../utilities";

export const usePersistData = () => {
    const setPersistData = <T>(key: string, value: T) => {
        persistLocalStorage(key, value);
    };

    const removePersistData = (key: string) => {
        clearLocalStorage(key);
    };

    //const getUser = ():Partial<User> | null =>JSON.parse(localStorage.getItem("user")) as Partial<User> || null;
    const getUser = (): Partial<User> | null =>
        localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null;
    const getIdBarberShop = () => localStorage.getItem("idBarberShop");
    const getToken = () => localStorage.getItem("token");

    return { getUser, getIdBarberShop, getToken, setPersistData, removePersistData };
};
