import { Dispatch } from "@reduxjs/toolkit";
import { setError } from "../slices/errorSlice";
import { StateError } from "../../types/StateError";
import {
    setUsers,
    orderByProperty,
    setUser,
    setUserFromUserTemp,
    setUserTemp,
} from "../slices/user.Slice";
import userService from "../../service/userService";
import { User, Order } from "../../types/";
import authService from "../../service/authService";
import { UserRol } from "../../typesConfig";

export const actionSetUser = (user: string, rol: UserRol, token: string) => {
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

/**
 * Action que setea un objeto usuario en el estado temporal de usuario.
 *
 * @param user campos del usuario
 * @returns reducer que setea al usuario temporal
 */
export const actionSetUserTemp = (user: Partial<User> | null) => {
    return async (dispatch: Dispatch) => {
        const userTemp: Partial<User> | null = user ? await authService.registerUser(user) : null;
        dispatch(setUserTemp(userTemp));
    };
};

/**
 * Esta action llama al reducer encargado de setear al usuario desde el usuario temporal
 * @returns
 */
export const actionSetUserFromUserRegister = () => {
    return (dispatch: Dispatch) => {
        dispatch(setUserFromUserTemp());
    };
};

/**
 * Accion definida para enviar el codigo de verificacion y token.
 * si la el proceso es exitoso, el numero del usuario sera tomado como
 * valido, lo cual permite iniciar sesion con el mismo.
 * @param code
 */
export const actionValidateNumberPhoneUser = (token: string, code: number) => {
    //necesitaria un atributo del estado en este archivo de actions
    return async (dispatch: Dispatch) => {
        await authService.validateNumberPhoneUser(token, code);
        await dispatch(setUserFromUserTemp());
    };
};
