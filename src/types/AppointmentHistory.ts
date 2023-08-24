import { Barber } from "./Barber";
import { Service } from "./Service";
import { User } from "./User";
import { AppointmentState } from "src/types";

export type AppointmentHistory = {
    id: string;
    user: User;
    state: AppointmentState;
    barber: Barber;
    service: Service;
    note?: string;
    date: string;
};
