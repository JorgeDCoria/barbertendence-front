import { Barber } from "src/types/Barber";
//import { BarberResource } from "../types/BarberResource";
import appointmentAdapter from "./appointmentAdapter";
import { Appointment } from "src/types";

// const mapBarberToBarberInstanceResource = (barbers: Barber[]): BarberResource[] => {
//     const barbersResources: BarberResource[] = barbers.map((b) => {
//         return { text: b.name, id: b.id };
//     });
//     return barbersResources;
// };

const mapBarberApiToBarber = (data: any): Barber => {
    return {
        avatar: data.avatar,
        description: data.description,
        id: data._id,
        name: data.name,
        services: data.services,
        appointments: data.appointments.length
            ? appointmentAdapter.mapAppointmentsApiToAppointments(data.appointments)
            : ([] as Appointment[]),
    };
};

const mapBarbersApiToBarbers = (data: any): Barber[] => {
    return data.map((barber: any) => mapBarberApiToBarber(barber));
};

const barberAdapter = {
    mapBarbersApiToBarbers,
    mapBarberApiToBarber,
};

export default barberAdapter;
