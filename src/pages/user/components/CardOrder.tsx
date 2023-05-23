import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";
import { Order } from "src/types/Order";
import serviceImage from "../../../assets/serviceImage.jpg";

interface Props {
    order: Order;
}
const CardOrder: React.FC<Props> = ({ order }) => {
    return (
        <Card sx={{ width: "250px", height: "250px", position: "relative" }}>
            <CardMedia
                component={"img"}
                src={serviceImage}
                height={"100%"}
                width={"100%"}
            />
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
                        <Stack
                            width={"100%"}
                            direction={"row"}
                            justifyContent={"space-between"}
                        >
                            <Typography>{order.date.toDateString()}</Typography>
                            <Typography> {order.time}</Typography>
                        </Stack>
                        <Typography variant="h5" fontWeight={700}>
                            {order.nameService}
                        </Typography>
                        <Typography>{order.nameBarber}</Typography>
                        <Typography>{order.nameClient}</Typography>
                        <Button variant="contained">Ver Mas</Button>
                    </Stack>
                </CardContent>
            </Box>
        </Card>
    );
};

export default CardOrder;
