import { Dispatch } from "@reduxjs/toolkit";
import { setBarberShopId } from "../slices/barberShopReducer";

export const actionSetBarberShopId = (idBarberShop: string | null) => {
    return (dispatch: Dispatch) => {
        dispatch(setBarberShopId(idBarberShop));
    };
};
