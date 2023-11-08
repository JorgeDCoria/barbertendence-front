import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Service } from "../../types/Service";

interface ServiceState {
    services: Service[] | null;
}

const initialState: ServiceState = {
    services: null,
};

export const servicesSlice = createSlice({
    name: "services",
    initialState: initialState,
    reducers: {
        setServices: (state, action: PayloadAction<Service[]>) => {
            state.services = action.payload;
        },
    },
});

export const { setServices } = servicesSlice.actions;

export default servicesSlice.reducer;
