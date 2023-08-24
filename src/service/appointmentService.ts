import { Appointment } from "src/types/Appointment";
import appointmentAdapter from "../adapters/appointmentAdapter";
import data from "../data/appointments.json";
import { AppointmentHistory } from "../types/AppointmentHistory";

const getAppointments = (state: string = "ALL"): Appointment[] => {
    try {
        if (state === "ALL") return appointmentAdapter.mapAppointmentsApiToAppointments(data);
        else {
            return appointmentAdapter.mapAppointmentsApiToAppointments(
                data.filter((app) => app.state.toUpperCase() === state.toUpperCase())
            );
        }
    } catch (e: any) {
        throw e;
    }
};

const getAppointmentsByUser = (id: string): AppointmentHistory[] => {
    try {
        const histories: AppointmentHistory[] =
            appointmentAdapter.mapAppointmentsApiToAppointmentHistories(
                data.filter((app) => app.user.id === id)
            );
        return histories;
    } catch (e: any) {
        throw e;
    }
};

const appointmentService = {
    getAppointments,
    getAppointmentsByUser,
};

export default appointmentService;
