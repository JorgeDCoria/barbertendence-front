import { Barber } from "src/types/Barber";
interface BarberResource {
    text: string;
    id: string;
}
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
