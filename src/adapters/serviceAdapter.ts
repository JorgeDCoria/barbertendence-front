import { Service } from "src/types/Service";

const mapServiceApiToService = (data: any): Service => {
    return {
        id: data._id,
        name: data.name,
        price: data.price,
        description: data.description,
        duration: data.duration,
        image: data.image,
    };
};

const mapServicesApiToServices = (data: any): Service[] => {
    return data.map((serv: any) => mapServiceApiToService(serv));
};

const serviceAdapter = {
    mapServiceApiToService,
    mapServicesApiToServices,
};

export default serviceAdapter;
