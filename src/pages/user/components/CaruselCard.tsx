import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ReactNode } from "react";
import s from "./CarouselCard.module.css";

interface Props {
    children: ReactNode;
    numDesktop?: number;
    numTablet?: number;
    numMobile?: number;
}

const CaruselCard: React.FC<Props> = ({
    children,
    numDesktop = 3,
    numMobile = 1,
    numTablet = 2,
}) => {
    const responsive: any = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: numDesktop,
            slidesToSlide: numDesktop,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: numTablet,
            slidesToSlide: numTablet,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: numMobile,
            slidesToSlide: numMobile,
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
