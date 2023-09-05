import services from "../data/services.json";

const getAllServices = () => {
    try {
        return services;
    } catch (e: any) {
        throw e;
    }
};

export default { getAllServices };
