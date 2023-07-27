import React, { useState, useEffect, memo } from "react";
//@ts-ignore
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import { Appointment } from "src/types/Appointment";
import {
    Box,
    Typography,
    Theme,
    useTheme,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    SelectChangeEvent,
    Divider,
    Modal,
} from "@mui/material";
import DateUtility from "../../utilities/DateUtility";
import { Service } from "src/types/Service";
import { barbersBd, servicesBd } from "../../data/data";
import { Barber } from "src/types/Barber";

const CustomAdminAppointmentBasicLayout = ({
    appointmentData,
    onFieldChange,

    ...restProps
}: AppointmentForm.BasicLayoutProp) => {
    const [service, setService] = useState("");

    const [barber, setBarber] = useState<Barber | null>(null);
    const theme: Theme = useTheme();
    const services: Service[] = servicesBd;
    const barbers: Barber[] = barbersBd;

    const onCustomFieldChange = (nextValue: string, prop: string) => {
        onFieldChange({ [prop]: nextValue });
    };
    console.log({ ...restProps });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onFieldChange({ [e.target.name]: e.target.value });
    };
    const handleSelectService = (e: SelectChangeEvent<string>) => {
        onFieldChange({ [e.target.name]: e.target.value });
        setService(e.target.value);
    };
    useEffect(() => {
        const barberFound = barbers.find((b) => b.id === appointmentData.barberId);
        barberFound && setBarber(barberFound);
    }, []);
    return (
        <Box
            display={"flex"}
            p={{ xs: 1, md: 2 }}
            flexDirection={"column"}
            width={"100%"}
            minHeight={"200px"}
            justifyContent={"space-around"}
            gap={{ xs: 1, sm: 4, md: 2 }}
            alignItems={"center"}
            {...restProps}
        >
            <Typography variant="h5" color={theme.palette.primary.main}>
                Nuevo Turno
            </Typography>
            <Box
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
            </Box>
            <Divider
                sx={{
                    width: { xs: "100%", sm: "80%", md: "60%" },
                    background: theme.palette.primary.main,
                }}
            />
            <Typography mt={1} textAlign={"center"}>
                Presione en "Save" para confirmar turno
            </Typography>{" "}
            <TextField
                name="clientName"
                onChange={handleChange}
                value={appointmentData.clientName}
                sx={{
                    width: { xs: "100%", sm: "80%", md: "60%" },
                }}
                label={"Cliente"}
            ></TextField>
            <TextField
                name="clientPhone"
                onChange={handleChange}
                value={appointmentData.clientPhone}
                sx={{
                    width: { xs: "100%", sm: "80%", md: "60%" },
                }}
                label={"Telefono"}
                type="number"
            ></TextField>
            <Divider
                sx={{
                    width: { xs: "100%", sm: "80%", md: "60%" },
                    background: theme.palette.primary.main,
                }}
            />
            <FormControl
                sx={{
                    width: { xs: "100%", sm: "80%", md: "60%" },
                }}
            >
                <InputLabel id="demo-simple-select-label">Servicios</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="serviceId"
                    label="Servicios"
                    value={service}
                    onChange={handleSelectService}
                >
                    {services.map((s) => (
                        <MenuItem key={s.id} value={s.id}>
                            {" "}
                            {s.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default memo(CustomAdminAppointmentBasicLayout);
