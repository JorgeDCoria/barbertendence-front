import jwt from "jwt-decode";

const secretKey = import.meta.env.VITE_APP_SECRET_KEY_JWT;

export const decodedJWT = (token: string) => {
    try {
        const decoded = jwt(token);
        console.log(decoded);
    } catch (e: any) {
        throw `Error en decoded jwt: ${e.message}`;
    }
};
