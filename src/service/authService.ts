import axios from "axios";
import userAdapter from "../adapters/userAdapter";
import { User } from "../types";

const URL_BASE = import.meta.env.VITE_APP_BASE_URL;
const logInWhitNumber = async (number: string, password: string) => {
    try {
        let user = await axios
            .post(`${URL_BASE}/auth/signin`, {
                phone: number,
                password,
            })
            .then((res) => res.data);
        user = userAdapter.mapUserApiLoggedToUser(user);
        user.isEmailLogin = false;
        return user;
    } catch (e: any) {
        throw e;
    }
};

const validateAvailableNumberPhone = async (number: string): Promise<boolean> => {
    let valid: boolean = await axios(`${URL_BASE}/users/checkPhone?phone=${number}`).then((r) => {
        console.log(r);

        return r.data.exist;
    });
    return valid;
};

const sendNumberPhone = async (number: string) => {
    await axios(`${URL_BASE}?phone=${number}`);
};

const registerUser = async (user: User) => {
    try {
        const data = await axios.post(`${URL_BASE}/auth/singnup`, user).then((r) => r.data);
    } catch (e: any) {
        throw `Error en registro: ${e.message}`;
    }
};

const authService = {
    logInWhitNumber,
    validateAvailableNumberPhone,
    sendNumberPhone,
};
export default authService;
