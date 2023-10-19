import { Dispatch } from "@reduxjs/toolkit";
import { setBarberShopId } from "../slices/barberShopReducer";
import { barberShopService } from "../../service";

export const actionSetBarberShopId = (idBarberShop: string | null) => {
    return (dispatch: Dispatch) => {
        dispatch(setBarberShopId(idBarberShop));
    };
};

export const actionGetServicesAndBarbers = () => {
    return async (dispatch: Dispatch) => {
        await barberShopService.getServicesAndBarbers();
    };
};
