import { Button, Stack, Theme, Typography, useTheme, Divider } from "@mui/material";
import React from "react";

interface Props {
    handleClickEdit: () => void;
    handleClickChangePassword: () => void;
}

const UserInformationProfile: React.FC<Props> = ({
    handleClickEdit,
    handleClickChangePassword,
}) => {
    const theme: Theme = useTheme();
    return (
        <Stack gap={2} p={2}>
            <Typography variant="h5" color={theme.palette.primary.main} textAlign={"center"}>
                Mis Datos
            </Typography>
            <Divider />
            <Typography>
                <span
                    style={{
                        color: theme.palette.primary.main,
                        fontSize: "20px",
                        fontWeight: "500",
                    }}
                >
                    Nombre y Apellido:{" "}
                </span>
                Nombre Usuario
            </Typography>
            <Typography>
                <span
                    style={{
                        color: theme.palette.primary.main,
                        fontSize: "20px",
                        fontWeight: "500",
                    }}
                >
                    Fech Nacimiento:{" "}
                </span>
                23/01/75
            </Typography>
            <Typography>
                <span
                    style={{
                        color: theme.palette.primary.main,
                        fontSize: "20px",
                        fontWeight: "500",
                    }}
                >
                    Telefono:{" "}
                </span>
                3884611503
            </Typography>
            <Typography>
                <span
                    style={{
                        color: theme.palette.primary.main,
                        fontSize: "20px",
                        fontWeight: "500",
                    }}
                >
                    Email:{" "}
                </span>
                usuario@gmail.com
            </Typography>
            <Stack direction={{ md: "row" }} gap={{ xs: 2 }}>
                <Button variant="outlined" onClick={handleClickEdit}>
                    Editar Datos
                </Button>
                <Button variant="outlined" onClick={handleClickChangePassword}>
                    Cambiar Contraseña{" "}
                </Button>
            </Stack>
        </Stack>
    );
};

export default UserInformationProfile;
