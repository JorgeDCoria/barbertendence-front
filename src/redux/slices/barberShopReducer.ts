import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BarberShopState {
    idBarberShop: string | null;
}

const initialState: BarberShopState = {
    idBarberShop: null,
};

export const barberShopSlice = createSlice({
    name: "barberShop",
    initialState: initialState,
    reducers: {
        setBarberShopId: (state, action: PayloadAction<string | null>) => {
            state.idBarberShop = action.payload;
        },
    },
});

export const { setBarberShopId } = barberShopSlice.actions;

export default barberShopSlice.reducer;
