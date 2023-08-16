import { type AppointmentState } from "src/types";
import { Barber } from "./Barber";
import { Service } from "./Service";
import { User } from "./User";

export type Appointment = {
    id: string;
    startDate: Date | string;
    endDate: Date | string;
    title: string;
    notes?: string;
    barber: Barber;
    service: Service;
    user: User;
    state: AppointmentState;
};

//pendiente, ausente, atendido, en curso, cancelado
