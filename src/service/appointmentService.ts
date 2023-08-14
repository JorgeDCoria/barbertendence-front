import { appointmentsBd } from "../data/data";

const getAppointments = () => {
    return appointmentsBd;
};

const appointmentService = {
    getAppointments,
};

export default appointmentService;
