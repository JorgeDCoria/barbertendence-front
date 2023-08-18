import { Appointment } from "src/types/Appointment";
import { StateError } from "src/types/StateError";
import adapterAppointment from "../adapters/appointmentAdapter";
import data from "../data/appointments.json";

const getAppointments = (): Appointment[] => {
    try {
        return adapterAppointment.mapAppointmentsApiToAppointments(data);
    } catch (e: any) {
        throw e;
    }
};

const appointmentService = {
    getAppointments,
};

export default appointmentService;
