import { useState, useEffect } from "react";
import appointmentService from "../service/appointmentService";
import { AppointmentHistory } from "../types/AppointmentHistory";
import { StateError } from "../types/StateError";

export const useUserHistories = (id: string) => {
    const [histories, setHistories] = useState<AppointmentHistory[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<StateError | null>(null);

    useEffect(() => {
        console.log("entre al useEffect");

        appointmentService
            .getAppointmentsByUser(id)
            .then((r) => {
                console.log(r);

                setHistories(r);
                setLoading(false);
                setError(null);
            })
            .catch((e: any) => {
                setLoading(false);
                const error: StateError = { message: e.message, code: e.code };
                setError(error);
                setHistories(null);
                console.log(error);
            });
    }, [id]);

    return { histories, loading, error };
};
