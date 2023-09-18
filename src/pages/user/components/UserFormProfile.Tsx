import { Box, TextField, Typography, Theme, useTheme, Stack, Button, Divider } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputPhoneNumber from "../../login/components/InputPhoneNumber";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
interface Props {
    handleClickCancel: () => void;
}
const UserFormProfile: React.FC<Props> = ({ handleClickCancel }) => {
    const theme: Theme = useTheme();
    //const [input, setInput] = useState({});
    return (
        <Box
            component={"form"}
            gap={2}
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Typography variant="h5" color={theme.palette.primary.main}>
                Editar Datos
            </Typography>
            <Divider />
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-around"}
                width={{ xs: "100%", md: "70%" }}
                gap={1}
            >
                <AccountCircleOutlinedIcon
                    sx={{
                        fontSize: 32,
                    }}
                />
                <TextField sx={{ flexGrow: 1 }} label="Nombre y Apellido" />
            </Box>
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-around"}
                width={{ xs: "100%", md: "70%" }}
            >
                <DatePicker sx={{ flexGrow: 1 }}  label="Fecha de Nacimiento" />
            </Box>
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-around"}
                width={{ xs: "100%", md: "70%" }}
            >
                <InputPhoneNumber sizeIcon="large" />
            </Box>

            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-around"}
                width={{ xs: "100%", md: "70%" }}
                gap={1}
            >
                <AlternateEmailIcon
                    sx={{
                        fontSize: 32,
                    }}
                />
                <TextField sx={{ flexGrow: 1 }} type="email" label="Email" />
            </Box>
            <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
                <Button variant="outlined" onClick={handleClickCancel}>
                    Cancelar
                </Button>
                <Button variant="outlined">Guardar Cambios</Button>
            </Stack>
        </Box>
    );
};

export default UserFormProfile;
