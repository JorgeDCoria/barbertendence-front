import axios from "axios";
import userAdapter from "../adapters/userAdapter";
const URL_BASE = import.meta.env.VITE_APP_BASE_URL;
const logIn = async (number: string, password: string) => {
    try {
        let user = await axios
            .post(`${URL_BASE}/auth/signin`, { phone: number, password })
            .then((res) => res.data);
        user = userAdapter.mapUserApiToUserLogged(user);
        return user;
    } catch (e: any) {
        throw e;
    }
};

const authService = {
    logIn,
};
export default authService;
