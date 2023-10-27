import { Appointment } from "../types/Appointment";
import appointmentAdapter from "../adapters/appointmentAdapter";
import data from "../data/appointments.json";
import { AppointmentHistory } from "../types/AppointmentHistory";
import axios from "axios";

const URL_BASE = import.meta.env.VITE_APP_BASE_URL;
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

const getAppointmentsByUser = async (id: string): Promise<AppointmentHistory[]> => {
    console.log("llege al service");

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

const getAppointmentsPending = async (idBarberShop: string, token: string) => {
    const headers = {
        accesstoken: token,
    };
    const appointments = await axios
        .get(`${URL_BASE}/users/pendingAppointments?barbershopId=${idBarberShop}`, {
            headers: headers,
        })
        .then((r) => r.data);
    return appointmentAdapter.mapAppointmentsApiToAppointments(appointments);
};

const addAppointment = async (appointment: Appointment, idBarberShop: string, token: string) => {
    const headers = {
        accesstoken: token,
    };
    await axios.post(
        `${URL_BASE}/users/appointments`,
        { ...appointment, date: appointment.startDate, note: "", barbershopId: idBarberShop },
        { headers: headers }
    );
};

const appointmentService = {
    getAppointments,
    getAppointmentsByUser,
    getAppointmentsPending,
    addAppointment,
};

export default appointmentService;
