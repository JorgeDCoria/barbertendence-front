import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Barber } from "src/types/Barber";

interface BarberState {
    barbers: Barber[] | null;
    barbersSelected: Barber[];
}

const initialState: BarberState = {
    barbers: null,
    barbersSelected: [],
};

export const barberSlice = createSlice({
    name: "barbers",
    initialState: initialState,
    reducers: {
        getAllBarbers: (state, action: PayloadAction<Barber[]>) => {
            state.barbers = action.payload;
        },
        getBarbersSelect: (state, action: PayloadAction<Barber[]>) => {
            state.barbersSelected = action.payload;
        },
    },
});

export const { getAllBarbers, getBarbersSelect } = barberSlice.actions;

export default barberSlice.reducer;
