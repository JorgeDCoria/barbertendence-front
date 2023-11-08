//@ts-ignore
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import { Box, Divider, Theme, Typography, useTheme } from "@mui/material";

import React from "react";

const AdminCustomLayout: React.FC<AppointmentForm.LayoutProps> = ({ restProps }) => {
    const theme: Theme = useTheme();

    {
        /* <Box
    display={"flex"}
    gap={{ xs: 0, sm: 2 }}
    alignItems={"center"}
    flexDirection={{ xs: "column", sm: "row" }}
>
    {" "}
    <Typography variant="h6">Fecha y Hora</Typography>
    <Typography variant="h6" color={theme.palette.primary.main}>
        {DateUtility.formattedDateTime(appointmentData.startDate)}
    </Typography>
</Box>
<Box
    display={"flex"}
    gap={{ xs: 0, sm: 2 }}
    alignItems={"center"}
    flexDirection={{ xs: "column", sm: "row" }}
>
    {" "}
    <Typography variant="h6">Profesional</Typography>
    <Typography variant="h6" color={theme.palette.primary.main}>
        {barber && barber.name}
    </Typography>
</Box> */
    }

    return (
        <AppointmentForm.Layout {...restProps}>
            {/* <AppointmentForm.BasicLayout> */}
            <Box
                display={"flex"}
                p={{ xs: 1, md: 2 }}
                flexDirection={"column"}
                width={"100%"}
                minHeight={"400px"}
                justifyContent={"space-around"}
                gap={{ xs: 1, sm: 4, md: 2 }}
                alignItems={"center"}
            >
                <Typography variant="h5" color={theme.palette.primary.main}>
                    Nuevo Turno
                </Typography>
                <Divider
                    sx={{
                        width: { xs: "100%", sm: "80%", md: "60%" },
                        background: theme.palette.primary.main,
                    }}
                />
            </Box>
            {/* </AppointmentForm.BasicLayout> */}
        </AppointmentForm.Layout>
    );
};

export default AdminCustomLayout;
