import { UserRol } from "../types";

export type User = {
    id?: string;
    fullName: string;
    birthDate?: Date | string;
    numberPhone: string;
    email: string;
    rol?: UserRol;
    token?: string;
    isLoggedWhitEmail?: boolean;
}; //admin, user, barber
