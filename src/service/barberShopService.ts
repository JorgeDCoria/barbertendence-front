import axios from "axios";
import { usePersistData } from "../hook/usePersistData";
import barberAdapter from "../adapters/barberAdapter";
import serviceAdapter from "../adapters/serviceAdapter";
const URL_BASE = import.meta.env.VITE_APP_BASE_URL;
const { getIdBarberShop, getToken } = usePersistData();
// const filterData = (array: any[]) => {
//     array.sort((a, b) => {
//         const aDate = new Date(a.startDate);
//         const bDate = new Date(b.startDate);
//         return bDate.getTime() - aDate.getDate();
//     });

//     for(let i=0;i<array.length;i++){
//         const appointment = array[i]
//         const appointmentStartDate = new Date(appointment.startDate)
//         const gridElement = [appointment]
//         let isIn15MinutesInterval = true
//         for(let j=i;i<array.length && true ;i++){
//             const auxAppointment = array[j]
//             const auxAppointmentStartDate = new Date(auxAppointment.startDate)
//             isIn15MinutesInterval = ( appointmentStartDate <=
//         }
//     }
// };
const getServicesAndBarbers = async () => {
    const headers = {
        accesstoken: getToken(),
    };
    const data = await axios(
        `${URL_BASE}/users/barbershopSchedule?barbershopId=${getIdBarberShop()}`,
        {
            headers: headers,
        }
    ).then((r) => r.data);
    const barbers = barberAdapter.mapBarbersApiToBarbers(data.barbers);
    const services = serviceAdapter.mapServicesApiToServices(data.services);
    //const appointments = appointmentAdapter.mapAppointmentsApiToAppointments(data.appointments);
    //const appo = data.appointments;
    //const aux = filterData(data.appointments);
    return { barbers, services };
};

export default {
    getServicesAndBarbers,
};
