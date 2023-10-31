import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Appointment } from "../../types/Appointment";
import { AppointmentHistory } from "../../types/AppointmentHistory";

interface AppointmentsState {
    appointments: Appointment[];
    appointmentsUserHistory: Appointment[] | null;
    appointmentsPending: Appointment[] | null;
    state: string;
}

const initialState: AppointmentsState = {
    appointments: [] as Appointment[],
    appointmentsUserHistory: null,
    appointmentsPending: null,
    state: "ALL",
};
export const appointmentSlice = createSlice({
    name: "appointments",
    initialState: initialState,
    reducers: {
        getAllAppointments: (state, action) => {
            state.appointments = action.payload;
        },
        //reducer para filtrar appointments por el id de barber
        getAppointmentsByBarber: (state, action) => {
            let aux: Appointment[] = [...state.appointments];
            aux = aux.filter((app) => app.barberId === action.payload);
            state.appointments = aux;
        },
        getAppointmentsByState: (state, action) => {
            // let aux: Appointment[] = [...state.appointments];
            // aux = aux.filter((app) => app.state.toUpperCase() === action.payload.toUpperCase());
            state.appointments = action.payload;
        },
        setAppointmentsUserHistory: (state, action: PayloadAction<Appointment[] | null>) => {
            state.appointmentsUserHistory = action.payload;
        },
        setState: (state, action) => {
            state.state = action.payload;
        },
        setAppointmentsPending: (state, action: PayloadAction<Appointment[] | null>) => {
            state.appointmentsPending = action.payload;
        },
    },
});

export const {
    getAllAppointments,
    getAppointmentsByBarber,
    getAppointmentsByState,
    setState,
    setAppointmentsUserHistory,
    setAppointmentsPending,
} = appointmentSlice.actions;
export default appointmentSlice.reducer;
