import { Appointment } from "src/types/Appointment";
import { appointmentsBd } from "../data/data";
import { StateError } from "src/types/StateError";

const getAppointments = (): Appointment[] => {
    try {
        return appointmentsBd;
    } catch (e: any) {
        throw e;
    }
};

const appointmentService = {
    getAppointments,
};

export default appointmentService;
