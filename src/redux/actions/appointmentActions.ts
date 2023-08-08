import { getAllAppointments, getAppointmentsByBarber } from "../slices/appointmentSlice";
import { appointmentsBd } from "../../data/data";
import { Appointment } from "../../types/Appointment";
export const actionGetAppointments = () => {
    return async (dispatch: any) => {
        const appointments: Appointment[] = await appointmentsBd;
        dispatch(getAllAppointments(appointments));
    };
};

export const actionGetAppointmentsByBarber = (id: string) => {
    return (dispatch: any) => {
        dispatch(getAppointmentsByBarber(id));
    };
};
