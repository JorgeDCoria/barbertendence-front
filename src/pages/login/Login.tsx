// import { useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import logo from "../../assets/logo.png";

import { Link } from "react-router-dom";
import InputPassword from "./components/InputPassword";
import InputPhoneNumber from "./components/InputPhoneNumber";

interface Props {}

const Login: React.FC<Props> = ({}) => {
    return (
        <Grid
            container
            sx={{
                backgroundImage:
                    "linear-gradient(to bottom, #1F6BB5 7.57%, #7F217D 70%)",
                height: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: "border-box",
            }}
        >
            {/* contenedor del formulario */}
            <Grid
                item
                xs={11}
                sm={8}
                md={6}
                lg={4}
                container
                sx={{
                    background: "white",
                    height: "90vh",
                    borderRadius: "16px",
                    boxSizing: "border-box",
                }}
            >
                {/* contenedor de logo */}
                <Box sx={{ height: "100%" }}>
                    <Grid
                        container
                        justifyContent={{ xs: "center", sm: "space-around" }}
                        sx={{ height: "100%" }}
                    >
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                component="img"
                                sx={{
                                    width: { xs: 200 },
                                    height: 120,
                                    objectFit: "cover",
                                }}
                                src={logo}
                            ></Box>
                        </Grid>

                        {/* contenedor de los inputs */}
                        <Grid
                            item
                            xs={12}
                            sm={10}
                            md={12}
                            gap={{ md: 2 }}
                            padding={2}
                            container
                            marginTop={{ md: 4 }}
                            alignItems={"center"}
                            justifyContent={"center"}
                        >
                            {/*  input phone */}
                            <Grid item xs={12} lg={10}>
                                <InputPhoneNumber
                                    sizeIcon="large"
                                    sizeInput="medium"
                                />
                            </Grid>
                            {/* Numero password */}

                            <Grid
                                item
                                xs={12}
                                lg={10}
                                container
                                alignItems={"center"}
                                justifyContent={"center"}
                            >
                                <InputPassword
                                    label="Password"
                                    name="password"
                                    sizeTextField="medium"
                                    sizeIcon="large"
                                />
                            </Grid>
                            <Grid item xs={10} sx={{ height: "40px" }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    size="large"
                                >
                                    Ingresar
                                </Button>
                            </Grid>
                            <Grid item xs={10} sx={{ height: "40px" }}>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    fullWidth
                                    color="primary"
                                    size="large"
                                >
                                    Ingresar con gmail
                                </Button>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography
                                    component={"p"}
                                    align="center"
                                    color={"primary.main"}
                                >
                                    ¿olvidate tu password?
                                </Typography>
                                <Typography component={"p"} align="center">
                                    No tienes una cuenta{" "}
                                    <Link to={"/register"}>
                                        <Typography
                                            component={"span"}
                                            fontSize={"18px"}
                                            color={"primary.main"}
                                        >
                                            Registrate
                                        </Typography>{" "}
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
