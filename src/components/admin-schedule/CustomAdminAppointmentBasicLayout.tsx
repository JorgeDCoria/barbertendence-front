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
} from "@mui/material";
import DateUtility from "../../utilities/DateUtility";
import { Service } from "src/types/Service";
import { appointmentsBd, barbersBd, servicesBd } from "../../data/data";
import { Barber } from "src/types/Barber";
import dayjs, { Dayjs } from "dayjs";
import { useNotification } from "../../context/notification.context";
import { CustomError } from "src/types/CustomError";

interface CustomAppointmentFormBasicLayoutProps extends AppointmentForm.BasicLayoutProps {
    formError: CustomError | null;
    handleFormError: (value: CustomError | null) => void;
    appointmentData: AppointmentForm.BasicLayoutProps["appointmentData"];
    onFieldChange: AppointmentForm.BasicLayoutProps["onFieldChange"];
}

const CustomAdminAppointmentBasicLayout: React.FC<CustomAppointmentFormBasicLayoutProps> = ({
    formError,
    handleFormError,
    appointmentData,
    onFieldChange,
    ...restProps
}) => {
    const [barber, setBarber] = useState<Barber | null>(null);
    const theme: Theme = useTheme();
    const services: Service[] = servicesBd;
    const barbers: Barber[] = barbersBd;
    const appointments: Appointment[] = appointmentsBd;
    const closeMorningHour: number = 12;
    const closeAfternoonHour: number = 20;
    const { showNotification } = useNotification();

    //funciones para validar disponibilidad de appointment
    const verifyAvailableHours = (startDate: Date, endDate: Dayjs, barberId: string): boolean => {
        let invalid = false;
        appointments.forEach((e) => {
            if (e.barberId === barberId) {
                console.log(e);
                //verificar si e.endDate es un string se lo puso asi para evitar warning para el deploy
                if (startDate < new Date(e.endDate as string) && endDate > dayjs(e.startDate)) {
                    invalid = true;
                    return;
                }
            }
        });
        return invalid;
    };

    const checkAvailableHours = (barberId: string, endDate: Dayjs) => {
        const closeHour =
            dayjs(appointmentData.startDate).hour() < closeMorningHour
                ? closeMorningHour
                : closeAfternoonHour;

        if (formError?.state) handleFormError(null);
        if (endDate > dayjs(appointmentData.startDate).hour(closeHour).minute(0).second(0)) {
            showNotification(
                `SU servicio elegido requiere de mayor tiempo, lo sentimos, nuestras instalaciones finalizan su jornada a las ${closeHour}hs`,
                "warning"
            );
            handleFormError({
                state: true,
                message: `SU servicio elegido requiere de mayor tiempo, lo sentimos, nuestras instalaciones finalizan su jornada a las ${closeHour}hs`,
            });
        } else if (verifyAvailableHours(appointmentData.startDate, endDate, barberId)) {
            showNotification(
                "El tiempo de su servicio requiere de tiempo disponible mayor",
                "warning"
            );
            handleFormError({
                state: true,
                message: `SU servicio elegido requiere de mayor tiempo, lo sentimos, nuestras instalaciones finalizan su jornada a las ${closeHour}hs`,
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onFieldChange({ [e.target.name]: e.target.value });
    };
    const handleSelectService = (e: SelectChangeEvent<string>) => {
        const serviceSelected: Service | undefined = services.find((s) => s.id === e.target.value);

        if (serviceSelected) {
            const endDate = dayjs(appointmentData.startDate).add(
                serviceSelected.duration,
                "minute"
            );
            checkAvailableHours(appointmentData.barberId, endDate);
            onFieldChange({ ["endDate"]: endDate.toDate() });
            onFieldChange({ [e.target.name]: e.target.value });
        }
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
                    value={appointmentData.serviceId}
                    onChange={handleSelectService}
                >
                    {services.map((s) => (
                        <MenuItem key={s.id} value={s.id}>
                            {s.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default memo(CustomAdminAppointmentBasicLayout);
