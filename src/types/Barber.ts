import { Service } from "./Service";

export type Barber = {
    id: string;
    name: string;
    password?: string;
    description: string;
    observation?: string;
    avatar: string;
    birthDay?: string;
    email?: string;
    phone?: string;
    address?: string;
    services?: Service[];
    schedules?: [];
};
