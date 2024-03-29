import { Barber } from "src/types/Barber";
import { BarberResource } from "../types/BarberResource";
import appointmentAdapter from "./appointmentAdapter";
import { Appointment } from "src/types";

const mapBarberToBarberInstanceResource = (barbers: Barber[]): BarberResource[] => {
    const barbersResources: BarberResource[] = barbers
        ? barbers.map((b) => {
              return { text: b.name, id: b.id ? b.id : "" };
          })
        : ([] as BarberResource[]);
    return barbersResources;
};

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
    mapBarberToBarberInstanceResource,
    mapBarbersApiToBarbers,
    mapBarberApiToBarber,
};

export default barberAdapter;
