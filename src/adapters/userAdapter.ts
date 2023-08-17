import { User } from "src/types/User";

const mapUserApiToUser = (data: any): User => {
    return {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        numberPhone: data.numberPhone,
        birthDate: data.birthDate,
        rol: data.rol,
        token: data.token,
    };
};

const mapUsersApiToUsers = (data: any): User[] => {
    return data.map((serv: any) => mapUserApiToUser(serv));
};

const UserAdapter = {
    mapUserApiToUser,
    mapUsersApiToUsers,
};

export default UserAdapter;
