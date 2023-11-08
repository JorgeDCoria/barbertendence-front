import { Appointment } from ".";
import { Schedule } from "./Schedule";

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
    services?: string[];
    schedules?: Schedule[];
    appointments?: Appointment[];
};
//seleccion rapida de horarios (turno mañana, tarde, jornada completa y opcion de personalizar);
// [{dia: "", incio:"DateTIME", fin:""}]
//{day:"", monrningShift:{start:"", end:""}, afternoonShift:{start:"", end:""}}
//multipoartfort type binary => para enviar la image
