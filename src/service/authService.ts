import axios from "axios";
import userAdapter from "../adapters/userAdapter";
import { User } from "../types";

const caracteresEspeciales = "+";

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
    const numeroCodificado = encodeURIComponent(number);
    let valid: boolean = await axios(`${URL_BASE}/users/checkPhone?phone=${numeroCodificado}`).then(
        (r) => r.data.exist
    );
    return valid;
};

const sendNumberPhone = async (number: string) => {
    await axios(`${URL_BASE}?phone=${number}`);
};

const registerUser = async (user: Partial<User>) => {
    try {
        const data = await axios
            .post(`${URL_BASE}/auth/signup`, {
                phone: user.numberPhone,
                fullName: user.fullName,
                password: user.password,
                birthDate: user.birthDate,
            })
            .then((r) => {
                console.log(r.data);

                userAdapter.mapUserApiLoggedToUser(r.data);
            });
        return data;
    } catch (e: any) {
        console.log(e);

        throw `Error en registro: ${e.message}`;
    }
};

const authService = {
    logInWhitNumber,
    validateAvailableNumberPhone,
    sendNumberPhone,
    registerUser,
};
export default authService;
