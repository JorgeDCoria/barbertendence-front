export type User = {
    id?: string;
    fullName: string;
    birthDate?: Date | string;
    numberPhone: string;
    email: string;
    rol?: string;
    token?: string;
    isLoggedWhitEmail?: boolean;
}; //admin, user, barber
