import { Dispatch } from "@reduxjs/toolkit";
import { setError } from "../slices/errorSlice";
import { StateError } from "../../types/StateError";
import { setUsers, orderByProperty, setUser } from "../slices/user.Slice";
import userService from "../../service/userService";
import { User, Order } from "../../types/";
import authService from "../../service/authService";

export const actionLoginUserWhithEmail = (user: string, rol: string, token: string) => {
    return async (dispatch: Dispatch) => {
        try {
            //const userLogged = await authService.logInWithEmail(token);
            dispatch(setUser({ id: user, rol, token, isLoggedWhitEmail: true }));
        } catch (e: any) {
            throw e;
        }
    };
};
export const actionLoginUserWhithNumber = (number: string, password: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const userLogged = await authService.logInWhitNumber(number, password);
            dispatch(setUser(userLogged));
        } catch (e: any) {
            //dispatch(setError({ code: e.status ? e.status : 0, message: e.message }));
            throw e;
        }
    };
};
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
