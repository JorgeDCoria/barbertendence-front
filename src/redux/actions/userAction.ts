import { Dispatch } from "@reduxjs/toolkit";
import { setError } from "../slices/errorSlice";
import { StateError } from "../../types/StateError";
import { getAllUser } from "../slices/user.Slice";
import userService from "../../service/userService";

export const actionGetAllUser = () => {
    return async (dispatch: Dispatch) => {
        try {
            const users = userService.getAllUsers();
            dispatch(getAllUser(users));
        } catch (e: any) {
            const error: StateError = { code: e.status, message: e.message };
            dispatch(setError(error));
        }
    };
};
