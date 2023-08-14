import { Dispatch } from "@reduxjs/toolkit";
import { getAllBarbers } from "../slices/barberSlice";
import { Barber } from "src/types/Barber";
import { clearError, setError } from "../slices/errorSlice";
import { StateError } from "src/types/StateError";
import barberService from "../../service/barberService";

export const actionGetAllBarber = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(clearError());
            const barbers: Barber[] = await barberService.getAllBarbers();
            dispatch(getAllBarbers(barbers));
        } catch (e: any) {
            const error: StateError = { code: e.status, message: e.message };
            dispatch(setError(error));
        }
    };
};
