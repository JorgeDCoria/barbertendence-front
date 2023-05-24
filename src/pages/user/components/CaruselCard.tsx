import { Order } from "src/types/Order";

import CardOrder from "./CardOrder";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Props {
    orders: Order[];
}
const CaruselCard: React.FC<Props> = ({ orders }) => {
    const responsive: any = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <Carousel responsive={responsive}>
            {orders.map((order, index) => (
                <CardOrder key={index} order={order} />
            ))}
        </Carousel>
    );
};

export default CaruselCard;
