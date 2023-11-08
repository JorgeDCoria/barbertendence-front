import { UserRol } from "../typesConfig";

export type User = {
    id?: string;
    fullName: string;
    birthDate?: Date | string;
    numberPhone: string;
    email: string;
    rol?: UserRol;
    token?: string;
    isLoggedWhitEmail?: boolean;
    password?: string;
    verificationCode?: string;
}; //admin, user, barber
