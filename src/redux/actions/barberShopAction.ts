import { Dispatch } from "@reduxjs/toolkit";
import { setBarberShopId } from "../slices/barberShopReducer";
import { barberShopService } from "../../service";
import { setServices } from "../slices/servicesSlice";
import { setBarbers } from "../slices/barberSlice";

export const actionSetBarberShopId = (idBarberShop: string | null) => {
    return (dispatch: Dispatch) => {
        dispatch(setBarberShopId(idBarberShop));
    };
};

export const actionGetServicesAndBarbers = () => {
    return async (dispatch: Dispatch) => {
        const { services, barbers } = await barberShopService.getServicesAndBarbers();
        dispatch(setServices(services));
        dispatch(setBarbers(barbers));
    };
};
