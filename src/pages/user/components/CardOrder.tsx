import { Box, Button, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import React from "react";
import { Order } from "src/types/Order";
import serviceImage from "../../../assets/serviceImage.jpg";
import { Appointment } from "../../../types";

interface Props {
    data: Appointment;
}
const CardOrder: React.FC<Props> = ({ data }) => {
    console.log(data.startDate);

    return (
        <Card sx={{ width: "250px", height: "250px", position: "relative" }}>
            <CardMedia component={"img"} src={data.service?.image} height={"100%"} width={"100%"} />
            <Box
                component={"div"}
                position={"absolute"}
                height={"100%"}
                width={"100%"}
                top={0}
                left={0}
                sx={{ background: "rgba(61,16,60,0.6)" }}
            >
                <CardContent
                    sx={{
                        height: "100%",
                    }}
                >
                    <Stack
                        sx={{
                            height: "100%",
                            width: "100",
                        }}
                        color={"white"}
                        direction={"column"}
                        alignItems={"center"}
                        justifyContent={"space-around"}
                    >
                        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
                            <Typography>{new Date(data.startDate).toLocaleString()}</Typography>
                            {/* <Typography> {data.service?.duration}</Typography> */}
                        </Stack>
                        <Typography variant="h5" fontWeight={700}>
                            {data.service?.name}
                        </Typography>
                        <Typography>{data.barber ? data.barber.name : "Barber"}</Typography>
                        <Button variant="contained">Cancelar</Button>
                    </Stack>
                </CardContent>
            </Box>
        </Card>
    );
};

export default CardOrder;
