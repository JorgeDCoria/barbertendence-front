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
                let user = userAdapter.mapUserApiLoggedToUser(r.data);
                user.verificationCode = r.data.verificationCode;
                return user;
            });
        return data;
    } catch (e: any) {
        console.log(e);

        throw `Error en registro: ${e.message}`;
    }
};
const validateNumberPhoneUser = async (token: string, code: number) => {
    const headers = {
        accesstoken: `${token}`,
    };
    const response = await axios.post(`${URL_BASE}/users/validate`, { code }, { headers: headers });
    if (response.status !== 201) throw { message: "Eroor en validacion de numero" };
};
const authService = {
    logInWhitNumber,
    validateAvailableNumberPhone,
    sendNumberPhone,
    registerUser,
    validateNumberPhoneUser,
};
export default authService;
