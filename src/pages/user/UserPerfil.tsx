import {
    Avatar,
    Box,
    Button,
    FormControl,
    Grid,
    Stack,
    TextField,
    Theme,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";
import logo from "../../assets/perfil.jpg";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const UserPerfil = () => {
    const theme: Theme = useTheme();
    return (
        <Box sx={{ width: "100%" }} display={"flex"}>
            <Grid container justifyContent={"center"} alignItems={"center"} gap={{ xs: 1, sm: 2 }}>
                <Grid item xs={12} sm={4}>
                    <Stack justifyContent={"center"} alignItems={"center"}>
                        <Box
                            width={{ xs: "150px", sm: "250px" }}
                            minHeight={"150px"}
                            position={"relative"}
                        >
                            <Avatar
                                alt="Remy Sharp"
                                src={logo}
                                sx={{
                                    width: { xs: "150px", sm: "250px" },
                                    height: { xs: "150px", sm: "250px" },
                                }}
                            />
                            <Box
                                position={"absolute"}
                                bottom={{ xs: 0, sm: 5 }}
                                right={{ xs: 0, sm: 5 }}
                                sx={{
                                    cursor: "pointer",
                                }}
                            >
                                <AddAPhotoIcon
                                    sx={{
                                        color: theme.palette.primary.main,
                                        fontSize: "36px",
                                    }}
                                />
                            </Box>
                        </Box>
                        <Typography
                            variant="h5"
                            textAlign={"center"}
                            color={theme.palette.primary.main}
                        >
                            Nombre de Usuario
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={5}>
                    {" "}
                    <Stack width={"100%"} gap={2} p={2}>
                        <Typography variant="h5">Mis Datos</Typography>
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
                            <Button variant="outlined">Editar Datos</Button>
                            <Button variant="outlined">Cambiar Contraseña </Button>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserPerfil;
