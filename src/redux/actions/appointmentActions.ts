import { getAllAppointments, getAppointmentsByBarber } from "../slices/appointmentSlice";
import { Appointment } from "../../types/Appointment";
import appointmentService from "../../service/appointmentService";
import { Dispatch } from "@reduxjs/toolkit";
import { clearError, setError } from "../slices/errorSlice";
import { StateError } from "src/types/StateError";

export const actionGetAppointments = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(clearError(null));
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
