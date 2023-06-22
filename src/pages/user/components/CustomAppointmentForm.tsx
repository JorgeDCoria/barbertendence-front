import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import { Box, Typography, useTheme, Theme } from "@mui/material";
import DateUtility from "../../../utilities/DateUtility";
import CardService from "./CardService";
import CardBarber from "./CardBarber";
import { Service } from "src/types/Service";
import { Barber } from "src/types/Barber";
import { Appointment } from "src/types/Appointment";

interface CustomAppointmentFormProps extends AppointmentForm.BasicLayoutProps {
    appointmentData: Appointment;
    service: Service;
    barber: Barber;
    restProps: any;
}
const CustomAppointmentForm: React.FC<CustomAppointmentFormProps> = ({
    appointmentData,
    service,
    barber,
    ...restProps
}) => {
    const theme: Theme = useTheme();
    return (
        <Box
            display={"flex"}
            p={{ md: 2 }}
            flexDirection={"column"}
            width={"100%"}
            height={"100%"}
            justifyContent={"space-around"}
            gap={1}
            alignItems={"center"}
            {...restProps}
        >
            <Typography variant="h5" color={theme.palette.primary.main}>
                Datos del Turno
            </Typography>

            <Box display={"flex"} gap={2} alignItems={"center"}>
                {" "}
                <Typography variant="h6">Fecha y Hora</Typography>
                <Typography variant="h6" color={theme.palette.primary.main}>
                    {DateUtility.formattedDateTime(appointmentData.startDate)}
                </Typography>
            </Box>
            <Box
                display={"flex"}
                justifyContent={"space-around"}
                alignItems={"center"}
                width={"100%"}
                gap={2}
                flexDirection={{ xs: "column", sm: "row" }}
            >
                {service && <CardService onlyRead service={service} />}
                {barber && <CardBarber onlyRead barber={barber} />}
            </Box>

            <Typography mt={1}>
                Presione en "Save" para confirmar turno
            </Typography>
        </Box>
    );
};

export default CustomAppointmentForm;
