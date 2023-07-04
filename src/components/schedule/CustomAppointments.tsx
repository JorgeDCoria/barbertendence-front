import { useRef, useState } from "react";
//@ts-ignore
import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import {
    Box,
    Popper,
    useTheme,
    Theme,
    Typography,
    Avatar,
    Button,
    Stack,
    Divider,
} from "@mui/material";
import barberLogo from "../../assets/perfil.jpg";
const CustomAppointments: React.FC<Appointments.AppointmentProps> = ({
    onDoubleClick,
    ...restProps
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [showSuggestion, setShowSuggestion] = useState<boolean>(false);

    const theme: Theme = useTheme();
    const id = showSuggestion ? "popper" : undefined;
    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
        setShowSuggestion((prevShowSuggestion) => !prevShowSuggestion);
    };
    const handleMouseLeave = () => {
        setAnchorEl(null);
        setShowSuggestion((prev) => !prev);
    };
    const handlePopperMouseEnter = () => {
        setShowSuggestion(true);
    };

    const handlePopperMouseLeave = () => {
        setShowSuggestion(false);
    };

    return (
        <>
            <Appointments.Appointment
                aria-describedby={id}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onDoubleClick={() => {
                    console.log("que pasa bro");
                }}
                {...restProps}
            />
            <Popper
                id={id}
                open={showSuggestion}
                anchorEl={anchorEl}
                onMouseEnter={handlePopperMouseEnter}
                onMouseLeave={handlePopperMouseLeave}
                sx={{
                    zIndex: 2,
                }}
            >
                <Box
                    sx={{
                        width: "200px",
                        border: `1px solid ${theme.palette.primary.main}`,
                        p: 1,
                        bgcolor: "white",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="body2" color={theme.palette.primary.main}>
                        ¿Quieres Un Turno en este horario?
                    </Typography>
                    <Typography pb={1} variant="body2">
                        Profesionales disponibles:
                    </Typography>
                    <Divider />
                    <Stack
                        direction={"row"}
                        justifyContent={"space-around"}
                        pt={2}
                        alignItems={"center"}
                    >
                        <Avatar alt="Rodrigo" src={barberLogo} />
                        Juan{" "}
                        <Button size="small" variant="contained">
                            Elegir
                        </Button>
                    </Stack>
                </Box>
            </Popper>
        </>
    );
};

export default CustomAppointments;
