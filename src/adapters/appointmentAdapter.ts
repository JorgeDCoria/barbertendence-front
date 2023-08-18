import { Appointment } from "src/types/Appointment";
import serviceAdapter from "./serviceAdapter";
import userAdapter from "./userAdapter";
import barberAdapter from "./barberAdapter";
const mapAppointmentApiToAppointment = (data: any): Appointment => {
    console.log(`barber ${data.barber.name}`);

    // console.log(new Date(data.endDate).toLocaleDateString());
    // console.log(new Date(data.startDate).toDateString());

    return {
        id: data.id,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
        title: data.service.name,
        service: serviceAdapter.mapServiceApiToService(data.service),
        barber: barberAdapter.mapBarberApiToBarber(data.barber),
        barberId: data.barber.id,
        user: userAdapter.mapUserApiToUser(data.user),
        state: data.state,
    };
};

const mapAppointmentsApiToAppointments = (array: any): Appointment[] => {
    return array.map((app: any) => mapAppointmentApiToAppointment(app));
};

const adapterAppointment = {
    mapAppointmentApiToAppointment,
    mapAppointmentsApiToAppointments,
};

export default adapterAppointment;
