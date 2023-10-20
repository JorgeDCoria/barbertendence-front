import userAdapter from "../adapters/userAdapter";
import data from "../data/users.json";
import { User } from "../types/User";
const getAllUsers = (): User[] => {
    try {
        const users = userAdapter.mapUsersApiToUsers(data);
        return users;
    } catch (e: any) {
        throw e;
    }
};

const findUsersByNameOrEmail = async (search: string) => {
    try {
        const user = data.filter((u) => u.fullName.includes(search) || u.email.includes(search));
        return userAdapter.mapUsersApiToUsers(user);
    } catch (e) {
        throw e;
    }
};

const userService = { getAllUsers, findUsersByNameOrEmail };
export default userService;
