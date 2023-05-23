import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { Order } from "src/types/Order";
import CardOrder from "./components/CardOrder";
const orders: Order[] = [
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "george",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "george",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "george",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "george",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "george",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "george",
        nameService: "Corte de Pelo",
    },
];
const UserHome: React.FC<{}> = ({}) => {
    const theme = useTheme();

    return (
        <Box>
            <Stack>
                <Typography
                    color={theme.palette.primary.main}
                    fontWeight={600}
                    variant="h4"
                    textAlign={"center"}
                >
                    Turnos Pendientes
                </Typography>
                <Grid container>
                    <Grid item>
                        <CardOrder order={orders[0]} />
                    </Grid>
                    <Grid item></Grid>
                </Grid>
            </Stack>
        </Box>
    );
};

export default UserHome;
