import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ReactNode } from "react";
import { Box, Button } from "@mui/material";
import s from "./CarouselCard.module.css";

interface Props {
    children: ReactNode;
}

const CaruselCard: React.FC<Props> = ({ children }) => {
    const responsive: any = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1,
        },
    };

    return (
        <Carousel
            // swipeable={false}
            // draggable={false}
            className={s.container}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
        >
            {children}
        </Carousel>
    );
};

export default CaruselCard;
