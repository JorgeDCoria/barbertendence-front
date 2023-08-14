import { getAllAppointments, getAppointmentsByBarber } from "../slices/appointmentSlice";
import { Appointment } from "../../types/Appointment";
import appointmentService from "../../service/appointmentService";
import { Dispatch } from "@reduxjs/toolkit";
export const actionGetAppointments = () => {
    return async (dispatch: Dispatch) => {
        const appointments: Appointment[] = await appointmentService.getAppointments();
        dispatch(getAllAppointments(appointments));
    };
};

export const actionGetAppointmentsByBarber = (id: string) => {
    return (dispatch: any) => {
        dispatch(getAppointmentsByBarber(id));
    };
};
