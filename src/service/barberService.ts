import barbers from "../data/employes.json";
const getAllBarbers = () => {
    //llamada al bakcend
    return barbers;
};

const barberService = {
    getAllBarbers,
};

export default barberService;
