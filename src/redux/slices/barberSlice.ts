import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Barber } from "src/types/Barber";

interface BarberState {
    barbers: Barber[] | null;
}

const initialState: BarberState = {
    barbers: null,
};

export const barberSlice = createSlice({
    name: "barbers",
    initialState: initialState,
    reducers: {
        getAllBarbers: (state, action: PayloadAction<Barber[]>) => {
            state.barbers = action.payload;
        },
    },
});

export const { getAllBarbers } = barberSlice.actions;

export default barberSlice.reducer;
