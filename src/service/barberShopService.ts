import axios from "axios";
import { usePersistData } from "../hook/usePersistData";
import barberAdapter from "../adapters/barberAdapter";
import serviceAdapter from "../adapters/serviceAdapter";
import appointmentAdapter from "../adapters/appointmentAdapter";
const URL_BASE = import.meta.env.VITE_APP_BASE_URL;
const { getIdBarberShop, getToken } = usePersistData();
const getServicesAndBarbers = async () => {
    const headers = {
        accesstoken: getToken(),
    };
    console.log(getIdBarberShop());

    const data = await axios(
        `${URL_BASE}/users/barbershopSchedule?barbershopId=${getIdBarberShop()}`,
        {
            headers: headers,
        }
    ).then((r) => r.data);
    const barbers = barberAdapter.mapBarbersApiToBarbers(data.barbers);
    const services = serviceAdapter.mapServicesApiToServices(data.services);
    const appointments = appointmentAdapter.mapAppointmentsApiToAppointments(data.appointments);
    return { barbers, services, appointments };
};

export default {
    getServicesAndBarbers,
};
