import { AppointmentModel } from "node_modules/@devexpress/dx-react-scheduler/dist/dx-react-scheduler";

export interface UserApppointment extends AppointmentModel {
    barberId: string | number;
    serviceId: string | number;
}
