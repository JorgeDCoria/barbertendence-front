import { Dispatch } from "@reduxjs/toolkit";
import { getAllBarbers, setBarbersSelect, orderBarberByProperty } from "../slices/barberSlice";
import { Barber } from "src/types/Barber";
import { clearError, setError } from "../slices/errorSlice";
import { StateError } from "src/types/StateError";
import barberService from "../../service/barberService";
import { Order } from "../../types/Order";

export const actionGetAllBarber = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(clearError());
            const barbers: Barber[] = await barberService.getAllBarbers();
            dispatch(getAllBarbers(barbers));
            dispatch(setBarbersSelect(barbers));
        } catch (e: any) {
            const error: StateError = { code: e.status, message: e.message };
            dispatch(setError(error));
        }
    };
};

export const actionSetSelectBarber = (barbers: Barber[]) => {
    return (dispatch: Dispatch) => {
        dispatch(setBarbersSelect(barbers));
    };
};

export const actionOrderBarberByProperty = (order: Order, property: keyof Barber) => {
    return (dispatch: Dispatch) => {
        dispatch(orderBarberByProperty({ orderBy: property, order }));
    };
};
