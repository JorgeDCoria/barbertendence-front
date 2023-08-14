import { configureStore } from "@reduxjs/toolkit";
import appointmentsReducer from "../slices/appointmentSlice";
import errorReducer from "../slices/errorSlice";

export const store = configureStore({
    reducer: {
        appointments: appointmentsReducer,
        error: errorReducer,
    },
});

//estamos retornando el type que rotorna la function
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
