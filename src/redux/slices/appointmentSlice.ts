import { createSlice } from "@reduxjs/toolkit";
import { Appointment } from "../../types/Appointment";

const appointments: Appointment[] = [];
export const appointmentSlice = createSlice({
    name: "appointments",
    initialState: {
        appointments: appointments,
    },
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
    },
});

export const { getAllAppointments, getAppointmentsByBarber, getAppointmentsByState } =
    appointmentSlice.actions;
export default appointmentSlice.reducer;
