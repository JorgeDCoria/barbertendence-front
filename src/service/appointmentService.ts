import { Appointment } from "src/types/Appointment";
import { StateError } from "src/types/StateError";
import appointmentAdapter from "../adapters/appointmentAdapter";
import data from "../data/appointments.json";

const getAppointments = (): Appointment[] => {
    try {
        return appointmentAdapter.mapAppointmentsApiToAppointments(data);
    } catch (e: any) {
        throw e;
    }
};

const appointmentService = {
    getAppointments,
};

export default appointmentService;
