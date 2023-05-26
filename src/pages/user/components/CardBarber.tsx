import React from "react";
import { Barber } from "src/types/Barber";
import {
    Card,
    CardMedia,
    CardContent,
    Box,
    Theme,
    useTheme,
    Typography,
} from "@mui/material";
import perfil from "../../../assets/perfil.jpg";
interface Props {
    barber: Barber;
}
const CardBarber: React.FC<Props> = ({ barber }) => {
    const theme: Theme = useTheme();
    return (
        <Card
            sx={{
                height: "280px",
                width: "230px",
                position: "relative",
            }}
        >
            <CardMedia
                component={"img"}
                src={perfil}
                sx={{
                    height: "200px",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "16px",
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
                        background: "#282528",

                        width: "90%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
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
