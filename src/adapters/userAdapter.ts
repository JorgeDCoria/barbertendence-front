import { User } from "src/types/User";
const mapUserApiToUserLogged = (data: any): User => {
    return {
        id: data.id,
        email: "",
        fullName: "",
        numberPhone: "",
        birthDate: "",
        rol: data.roles[0],
        token: data.accessToken,
    };
};

const mapUserApiToUser = (data: any): User => {
    return {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        numberPhone: data.numberPhone,
        birthDate: data.birthDate,
        rol: data.rol,
    };
};

/**
 * Funcion que mapia a un usuario logeado de la api el cual solo contiene informacion limitada
 * retorna solo algunas propiedades del usuario
 * @param data datos de usuario de la api
 * @returns
 */
const mapUserApiLoggedToUser = (data: any): Partial<User> => {
    return {
        id: data.id,
        rol: data.roles[0],
        token: data.accessToken,
    };
};
const mapUsersApiToUsers = (data: any): User[] => {
    return data.map((user: any) => mapUserApiToUser(user));
};

const userAdapter = {
    mapUserApiToUserLogged,
    mapUserApiToUser,
    mapUsersApiToUsers,
    mapUserApiLoggedToUser,
};

export default userAdapter;
