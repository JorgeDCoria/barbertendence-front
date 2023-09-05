import { Dispatch } from "@reduxjs/toolkit";
import { setServices } from "../slices/servicesSlice";
import { Service } from "src/types/Service";
import { clearError, setError } from "../slices/errorSlice";
import { StateError } from "src/types/StateError";
import serviceService from "../../service/serviceService";

export const actionGetAllServices = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(clearError());
            const services: Service[] = await serviceService.getAllServices();
            dispatch(setServices(services));
        } catch (e: any) {
            const error: StateError = { code: e.status, message: e.message };
            dispatch(setError(error));
        }
    };
};
