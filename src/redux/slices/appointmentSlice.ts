import { createSlice } from "@reduxjs/toolkit";
import { Appointment } from "../../types/Appointment";

interface AppointmentsState {
    appointments: Appointment[];
    state: string;
}

const initialState: AppointmentsState = {
    appointments: [] as Appointment[],
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
        setState: (state, action) => {
            state.state = action.payload;
        },
    },
});

export const { getAllAppointments, getAppointmentsByBarber, getAppointmentsByState, setState } =
    appointmentSlice.actions;
export default appointmentSlice.reducer;
