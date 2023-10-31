import {
    getAllAppointments,
    getAppointmentsByBarber,
    getAppointmentsByState,
    setAppointmentsPending,
    setAppointmentsUserHistory,
    setState,
} from "../slices/appointmentSlice";
import { Appointment } from "../../types/Appointment";
import appointmentService from "../../service/appointmentService";
import { Dispatch } from "@reduxjs/toolkit";
import { clearError, setError } from "../slices/errorSlice";
import { StateError } from "../../types/StateError";

export const actionGetAppointments = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(clearError());
            const appointments: Appointment[] = await appointmentService.getAppointments();
            dispatch(getAllAppointments(appointments));
        } catch (e: any) {
            const error: StateError = { code: e.status, message: e.message };
            dispatch(setError(error));
        }
    };
};

export const actionGetAppointmentsByBarber = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(getAppointmentsByBarber(id));
    };
};

export const actionGetAppointmentsByState = (state: string = "ALL") => {
    return async (dispatch: Dispatch) => {
        try {
            const appointments: Appointment[] = appointmentService.getAppointments(state);
            dispatch(getAppointmentsByState(appointments));
            dispatch(setState(state));
        } catch (e: any) {
            const error: StateError = { code: e.status, message: e.message };
            dispatch(setError(error));
        }
    };
};

export const actionGetAppointmentsUserHistories = (id: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const histories = appointmentService.getAppointmentsByUser(id);
            dispatch(setAppointmentsUserHistory(histories));
        } catch (e: any) {
            throw e;
        }
    };
};

export const actionClearAppointmentsUserHistories = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppointmentsUserHistory(null));
    };
};

export const actionGetAppointmentsPending = (idBarberShop: string, token: string) => {
    return async (dispatch: Dispatch) => {
        const data = await appointmentService.getAppointmentsPending(idBarberShop, token);
        dispatch(setAppointmentsPending(data));
    };
};

// export const actionAddAppointment = (appointment:Appointment, idBarberShop:string, token:string) => {
//     return async ( dispatch: Dispatch) => {
//         await appointmentService.addAppointment(appointment, idBarberShop, token);

//     }
// }
