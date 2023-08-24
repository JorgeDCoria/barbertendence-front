import userAdapter from "src/adapters/userAdapter";
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

const userService = { getAllUsers };
export default userService;
