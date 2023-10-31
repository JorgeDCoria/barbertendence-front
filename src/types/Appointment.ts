import { type AppointmentState } from "../typesConfig";
import { Barber } from "./Barber";
import { Service } from "./Service";
import { User } from "./User";
import { AppointmentModel } from "node_modules/@devexpress/dx-react-scheduler/dist/dx-react-scheduler";

export interface Appointment extends AppointmentModel {
    barberId: string | number;
    serviceId?: string;
    notes?: string;
    barber?: Barber;
    service?: Service;
    user?: User;
    state: AppointmentState;
}

//pendiente, ausente, atendido, en curso, cancelado
