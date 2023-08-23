import { Appointment } from "src/types/Appointment";
import appointmentAdapter from "../adapters/appointmentAdapter";
import data from "../data/appointments.json";

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

const appointmentService = {
    getAppointments,
};

export default appointmentService;
