import axios from "axios";
import { usePersistData } from "../hook/usePersistData";
const URL_BASE = import.meta.env.VITE_APP_URL_BASE;
const { getIdBarberShop, getToken } = usePersistData();
const getServicesAndBarbers = async () => {
    const headers = {
        accestoken: getToken(),
    };
    console.log(getIdBarberShop());

    const data = await axios(
        `${URL_BASE}/users/barbershopSchedule?barberShopId=${getIdBarberShop()}`,
        {
            headers: headers,
        }
    ).then((r) => r.data);
    console.log(data);
};

export default {
    getServicesAndBarbers,
};
