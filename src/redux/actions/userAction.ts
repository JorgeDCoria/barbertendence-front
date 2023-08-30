import { Dispatch } from "@reduxjs/toolkit";
import { setError } from "../slices/errorSlice";
import { StateError } from "../../types/StateError";
import { setUsers, orderByProperty } from "../slices/user.Slice";
import userService from "../../service/userService";
import { Order } from "../../types/Order";
import { User } from "../../types/User";

export const actionGetAllUser = () => {
    return async (dispatch: Dispatch) => {
        try {
            const users = userService.getAllUsers();
            dispatch(setUsers(users));
        } catch (e: any) {
            const error: StateError = { code: e.status, message: e.message };
            dispatch(setError(error));
        }
    };
};

export const actionFindUserByNameOrEmail = (search: string) => {
    return async (dispatch: Dispatch) => {
        try {
            let users: User[] = [];
            if (search === "") users = await userService.getAllUsers();
            else users = await userService.findUsersByNameOrEmail(search);
            dispatch(setUsers(users));
        } catch (e: any) {
            const error: StateError = { code: e.status, message: e.message };
            dispatch(setError(error));
        }
    };
};
export const actionOrderUserByProperty = (order: Order, orderBy: keyof User) => {
    return (dispatch: Dispatch) => {
        dispatch(orderByProperty({ order, orderBy }));
    };
};
