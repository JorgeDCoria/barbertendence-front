import { useState } from "react";
import { Barber } from "src/types/Barber";
import {
    Card,
    CardMedia,
    Box,
    Theme,
    useTheme,
    Typography,
} from "@mui/material";
import perfil from "../../../assets/perfil.jpg";
interface Props {
    barber: Barber;
    selected: boolean;
    handleClick: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        barber: Barber
    ) => void;
}
const CardBarber: React.FC<Props> = ({ barber, selected, handleClick }) => {
    const theme: Theme = useTheme();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const handleMouseEnter = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();
        setIsHovered(true);
    };
    const handleMouseLeave = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();
        setIsHovered(false);
    };

    return (
        <Card
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseLeave={(e) => handleMouseLeave(e)}
            onClick={(e) => handleClick(e, barber)}
            sx={{
                height: "280px",
                width: "230px",
                position: "relative",
                cursor: "pointer",
            }}
        >
            <CardMedia
                component={"img"}
                src={perfil}
                sx={{
                    height: `${isHovered || selected ? "100%" : "200px"}`,
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "16px",
                    transition: "height 1s",
                    scale: `${selected && "1.2"}`,

                    "&:hover": {
                        scale: `${!selected && "1.2"}`,
                    },
                }}
            />
            <Typography
                textAlign={"center"}
                variant="h4"
                width={"100%"}
                color={theme.palette.secondary.main}
                fontWeight={800}
                position={"absolute"}
                top={4}
                sx={{
                    WebkitTextStroke: `0.5px white `,
                }}
            >
                {barber.name}
            </Typography>
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "40%",

                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    component={"div"}
                    p={1}
                    borderRadius={"16px"}
                    sx={{
                        background: `${
                            isHovered || selected
                                ? theme.palette.primary.main
                                : "#282528"
                        }`,

                        width: "90%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        transitionDuration: "1.5s",
                    }}
                >
                    <Typography textAlign={"center"} color={"white"}>
                        {barber.description}{" "}
                    </Typography>{" "}
                </Box>
            </Box>
        </Card>
    );
};

export default CardBarber;
