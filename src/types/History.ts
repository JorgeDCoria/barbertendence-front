import { Barber } from "./Barber";
import { Service } from "./Service";

export type History = {
    id: string;
    userId: string;
    state: boolean;
    date: Date;
    barber: Barber;
    service: Service;
};
