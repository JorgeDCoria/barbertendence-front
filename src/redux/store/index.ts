import { configureStore } from "@reduxjs/toolkit";
import appointmentsReducer from "../slices/appointmentSlice";
export const store = configureStore({
    reducer: {
        appointments: appointmentsReducer,
    },
});
