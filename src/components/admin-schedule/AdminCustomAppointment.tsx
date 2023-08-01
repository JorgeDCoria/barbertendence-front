//@ts-ignore
import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import React, { useEffect } from "react";
import { Box, Typography, Divider, Stack, Theme, useTheme, Button, Link } from "@mui/material";
import barberLogo from "../../assets/perfil.jpg";
import { servicesBd, clientsBd } from "../../data/data";
import { Service } from "src/types/Service";
import dayjs from "dayjs";
import { User } from "src/types/User";
const AdminCustomAppointment: React.FC<Appointments.AppointmentProps> = ({
    data,
    ...restProps
}) => {
    const theme: Theme = useTheme();
    const service: Service | undefined = servicesBd.find((s) => s.id === data.serviceId);
    const client: User | undefined = clientsBd.find((c) => c.id === data.clientId);

    useEffect(() => {}, []);

    return (
        <>
            <Appointments.Appointment
                onDoubleClick={() => {
                    console.log("que pasa bro");
                }}
                data={data}
                {...restProps}
            >
                <Stack
                    direction={"column"}
                    justifyContent={"space-around"}
                    pt={2}
                    alignItems={"center"}
                    textAlign={"center"}
                    height={"80%"}
                    color={"white"}
                >
                    <Typography
                        sx={{
                            fontSize: "0.75rem",
                            fontWeight: "600",
                        }}
                    >
                        {service?.name}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "0.75rem",
                            fontWeight: "600",
                        }}
                    >
                        {dayjs(data.startDate).format("HH:mm")}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "0.75rem",
                            fontWeight: "600",
                        }}
                    >
                        {dayjs(data.endDate).format("HH:mm")}
                    </Typography>
                    <Typography>{client?.nombreApellido}</Typography>
                </Stack>
            </Appointments.Appointment>
        </>
    );
};

export default AdminCustomAppointment;
