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
        getAppointmentsByBarber: (state, action) => {
            let aux: Appointment[] = [...state.appointments];
            console.log(state.appointments);
            console.log(aux);

            aux = aux.filter((app) => app.barberId === action.payload);
            console.log(aux);

            state.appointments = aux;
        },
    },
});

export const { getAllAppointments, getAppointmentsByBarber } = appointmentSlice.actions;
export default appointmentSlice.reducer;
