import {
    Box,
    Card,
    CardMedia,
    Grid,
    Theme,
    useTheme,
    Modal,
    Typography,
    Stack,
    Button,
} from "@mui/material";
import { useState } from "react";
import file from "../../assets/file.jpg";
import logo from "../../assets/logo.png";
import UserInformationProfile from "./components/UserInformationProfile";
import UserFormProfile from "./components/UserFormProfile";
import InputPassword from "../login/components/InputPassword";

const UserPerfil = () => {
    const [editUser, setEditUser] = useState<boolean>(true);
    const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
    const theme: Theme = useTheme();

    const handleEditUser = (): void => {
        setEditUser((prevEditUser) => !prevEditUser);
    };

    const handleShowChangePassword = (): void => {
        setShowChangePassword((prevShowChange) => !prevShowChange);
    };
    return (
        <Box sx={{ width: "100%" }} display={"flex"}>
            <Grid container justifyContent={"center"} alignItems={"center"} gap={{ xs: 0, sm: 2 }}>
                <Grid item xs={12}>
                    <Box
                        width={"100%"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Card
                            sx={{
                                width: { xs: "50%", sm: "40%", md: "20%" },
                                minHeight: "200px",

                                boxShadow: "none",
                            }}
                        >
                            <CardMedia
                                component={"img"}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                }}
                                image={logo}
                                alt="image logo"
                            />
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} container justifyContent={"center"}>
                    <Grid item xs={5} display={{ xs: "none", sm: "block" }}>
                        <Box
                            width={"80%"}
                            minHeight={"400px"}
                            borderRadius={8}
                            position={"relative"}
                            sx={{
                                background: `url(${file})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                            }}
                        ></Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={5}>
                        {!editUser ? (
                            <UserInformationProfile
                                handleClickEdit={handleEditUser}
                                handleClickChangePassword={handleShowChangePassword}
                            />
                        ) : (
                            <UserFormProfile handleClickCancel={handleEditUser} />
                        )}
                    </Grid>
                </Grid>
            </Grid>
            {showChangePassword && (
                <Modal
                    open={showChangePassword}
                    onClose={handleShowChangePassword}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: "600px",
                            minHeight: "350px",
                            background: "white",
                            borderRadius: "16px",
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                        }}
                    >
                        <Typography
                            textAlign={"center"}
                            variant="h5"
                            color={theme.palette.primary.main}
                        >
                            Cambio de Clave
                        </Typography>
                        <InputPassword label="Clave Actual" />
                        <InputPassword label="Nueva Clave" />
                        <InputPassword label="Confirmar Clave" />
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            gap={2}
                            justifyContent={"center"}
                        >
                            <Button variant="outlined" onClick={handleShowChangePassword}>
                                Cancelar
                            </Button>
                            <Button variant="outlined">Guardar Cambios</Button>
                        </Stack>
                    </Box>
                </Modal>
            )}
        </Box>
    );
};

export default UserPerfil;
