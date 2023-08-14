import { barbersBd } from "../data/data";
const getAllBarbers = () => {
    //llamada al bakcend
    return barbersBd;
};

const barberService = {
    getAllBarbers,
};

export default barberService;
