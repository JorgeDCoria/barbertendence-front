import { Barber } from "src/types/Barber";
import { BarberResource } from "../types/BarberResource";

const mapBarberToBarberInstanceResource = (barbers: Barber[]): BarberResource[] => {
    const barbersResources: BarberResource[] = barbers.map((b) => {
        return { text: b.name, id: b.id };
    });
    return barbersResources;
};

const barberAdapter = {
    mapBarberToBarberInstanceResource,
};

export default barberAdapter;
