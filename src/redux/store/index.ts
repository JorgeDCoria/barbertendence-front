import { configureStore } from "@reduxjs/toolkit";
import appointmentsReducer from "../slices/appointmentSlice";
import errorReducer from "../slices/errorSlice";
import barbersReducer from "../slices/barberSlice";
import userReducer from "../slices/user.Slice";
import servicesReducer from "../slices/servicesSlice";
import barberShopReducer from "../slices/barberShopReducer";

export const store = configureStore({
    reducer: {
        appointments: appointmentsReducer,
        servicesState: servicesReducer,
        barbers: barbersReducer,
        userSate: userReducer,
        barberShop: barberShopReducer,
        error: errorReducer,
    },
});

//estamos retornando el type que rotorna la function
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
