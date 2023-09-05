import { Schedule } from "./Schedule";
import { Service } from "./Service";

export type Barber = {
    id?: string;
    name: string;
    password?: string;
    description: string;
    avatar: string;
    birthDay?: string;
    email?: string;
    phone?: string;
    address?: string;
    services?: Service[];
    schedules?: Schedule[];
};
//seleccion rapida de horarios (turno mañana, tarde, jornada completa y opcion de personalizar);
// [{dia: "", incio:"DateTIME", fin:""}]
