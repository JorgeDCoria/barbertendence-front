import { Appointment } from "src/types/Appointment";
import serviceAdapter from "./serviceAdapter";
import userAdapter from "./userAdapter";
import barberAdapter from "./barberAdapter";
import { SchedulerDateTime } from "node_modules/@devexpress/dx-react-scheduler/dist/dx-react-scheduler";
import { AppointmentHistory } from "src/types/AppointmentHistory";
const mapAppointmentApiToAppointment = (data: any): Appointment => {
    // console.log(new Date(data.endDate).toLocaleDateString());
    // console.log(new Date(data.startDate).toDateString());

    return {
        id: data.id,
        startDate: data.startDate,
        endDate: data.endDate,
        title: data.service.name,
        service: data.service && serviceAdapter.mapServiceApiToService(data.service),
        barber: data.barber && barberAdapter.mapBarberApiToBarber(data.barber),
        barberId: data.barberId,
        user: data.user && userAdapter.mapUserApiToUser(data.user),
        state: data.state,
    };
};

const mapAppointmentsApiToAppointments = (array: any): Appointment[] => {
    return array.map((app: any) => mapAppointmentApiToAppointment(app));
};

const mapDateToDateSchedule = (date: Date | string | SchedulerDateTime): Date => {
    const aux = new Date(date);

    return new Date(
        aux.getUTCFullYear(),
        aux.getUTCMonth(),
        aux.getUTCDate(),
        aux.getUTCHours(),
        aux.getUTCMinutes()
    );
};

const mapAppointmentApiToAppointmentHistory = (data: any): AppointmentHistory => {
    return {
        id: data.id,
        date: data.startDate,
        service: serviceAdapter.mapServiceApiToService(data.service),
        barber: barberAdapter.mapBarberApiToBarber(data.barber),
        user: userAdapter.mapUserApiToUser(data.user),
        state: data.state,
    };
};
const mapAppointmentsApiToAppointmentHistories = (array: any): AppointmentHistory[] => {
    return array.map((app: any) => mapAppointmentApiToAppointmentHistory(app));
};

const appointmentAdapter = {
    mapAppointmentApiToAppointment,
    mapAppointmentsApiToAppointments,
    mapDateToDateSchedule,
    mapAppointmentsApiToAppointmentHistories,
};

export default appointmentAdapter;
