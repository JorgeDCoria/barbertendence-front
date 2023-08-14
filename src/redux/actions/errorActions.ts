import { Dispatch } from "@reduxjs/toolkit";
import { clearError, setError } from "../slices/errorSlice";
import { type StateError } from "../../types/StateError";

export const actionsClearError = () => {
    return (dispatch: Dispatch) => {
        dispatch(clearError(null));
    };
};

export const actionSetError = (error: StateError) => {
    return (dispatch: Dispatch) => {
        dispatch(setError(error));
    };
};
