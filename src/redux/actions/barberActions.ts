import { Dispatch } from "@reduxjs/toolkit";
import { getAllBarbers, getBarbersSelect } from "../slices/barberSlice";
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
            dispatch(getBarbersSelect(barbers));
        } catch (e: any) {
            const error: StateError = { code: e.status, message: e.message };
            dispatch(setError(error));
        }
    };
};

export const actionGetSelectBarber = (barbers: Barber[]) => {
    return (dispatch: Dispatch) => {
        dispatch(getBarbersSelect(barbers));
    };
};
