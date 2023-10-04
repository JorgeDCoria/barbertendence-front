import { type SIZE_SM, type SIZE_SML } from "./const/consts";
import { Appointment } from "./types/Appointment";
import { type STATEAPPOINTMENT } from "./const/appointmentsConst";
import { ROL } from "./const";

export type SizeSMValue = (typeof SIZE_SM)[keyof typeof SIZE_SM];
export type SizeSMLValue = (typeof SIZE_SML)[keyof typeof SIZE_SML];
export type AppointmentProps = keyof Appointment;
export type AppointmentState = (typeof STATEAPPOINTMENT)[keyof typeof STATEAPPOINTMENT];
export type UserRol = (typeof ROL)[keyof typeof ROL];
