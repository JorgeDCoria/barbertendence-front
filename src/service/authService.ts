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

const logInWithEmail = async (token: string) => {
    try {
        let user = await axios
            .post(`${URL_BASE}/getUser`, {
                //phone_phone_verified
                //birthdate
                //name
                email: email,
                isEmailLogin: true,
                barbershopId: "64fd0b77b93867557d02ac35",
            })
            .then((res) => res.data);
        token = userAdapter.mapUserApiToUserLogged(user);
        user.isEmailLogin = true;
        return user;
    } catch (e: any) {
        throw e;
    }
};

const registerUser = async (user: User) => {
    try {
        const data = await axios.post(`${URL_BASE}/auth/singnup`, user).then((r) => r.data);
    } catch (e: any) {
        throw `Error en registro: ${e.message}`;
    }
};

const getToken = async (token: string) => {
    try {
        await axios
            .post(`https://fair-red-drill-belt.cyclic.cloud/api/auth/google/redirect`, {
                token: token,
            })
            .then((r) => {
                console.log(r);
            });
        // const response = await axios
        //     .post(`https://dev-wrsb3uo2nf1r5sy4.us.auth0.com/oauth/token`, {
        //         headers: {
        //             "Content-Type": "Aplication/json",
        //         },
        //         body: JSON.stringify({
        //             grant_type: "Authorization_code",
        //             client_id: "3eCQtCZIEldRzH0Oua0sbc5OfWVCYKlB",
        //             client_secret:
        //                 "BRjtxjSkqvcWCgMM6oziSMYdVQu3JhYSdrohdq8Z0m1nMRZo99jbQG9sKZeTDgVB",
        //             code: authorizationCode,
        //             // redirect_uri: "http://localhost:5173/",
        //         }),
        //     })
        //     .then((r) => r.data);
        // console.log(JSON.stringify(response));
        // return response;
    } catch (e: any) {
        console.log(e);
    }
};

const authService = {
    logInWhitNumber,
    logInWithEmail,
    getToken,
};
export default authService;
