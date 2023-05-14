import { Link } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import logo from "../../assets/logo.png";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InputNumber from "./components/InputPhoneNumber";
import InputPassword from "./components/InputPassword";

const Register = () => {
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
                <Box sx={{ height: "100%", width: "100%" }}>
                    <Grid
                        container
                        alignItems={"center"}
                        justifyContent={{ xs: "center", sm: "space-around" }}
                        height={"100%"}
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
                            padding={2}
                            container
                            gap={{ xs: 2 }}
                            marginTop={{ md: 4 }}
                            justifyContent={"center"}
                        >
                            <Grid item xs={12} lg={10}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        width: "100%",
                                    }}
                                >
                                    {" "}
                                    <AccountCircleOutlinedIcon />
                                    <TextField
                                        required
                                        id="input-name"
                                        label="Name"
                                        type="text"
                                        name="name"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                </Box>{" "}
                            </Grid>
                            {/* Number phone */}
                            <Grid item xs={12} lg={10}>
                                <InputNumber
                                    sizeInput="small"
                                    sizeIcon="small"
                                />
                            </Grid>

                            <Grid item xs={12} lg={10}>
                                <InputPassword
                                    label="Password"
                                    name="password"
                                    sizeIcon="medium"
                                    sizeTextField="small"
                                />
                            </Grid>
                            <Grid item xs={12} lg={10}>
                                <InputPassword
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    sizeIcon="medium"
                                    sizeTextField="small"
                                />
                            </Grid>
                            <Grid item xs={10} md={6}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    size="small"
                                    sx={{
                                        height: "40px",
                                    }}
                                >
                                    Registrarse
                                </Button>
                            </Grid>
                            <Grid item xs={10} md={6}>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    fullWidth
                                    color="primary"
                                    size="small"
                                    sx={{
                                        height: "40px",
                                    }}
                                >
                                    Ingresar con gmail
                                </Button>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography component={"p"} align="center">
                                    Ya tienes una cuenta{" "}
                                    <Link to={"/"}>
                                        {" "}
                                        <Typography
                                            component={"span"}
                                            fontSize={"18px"}
                                            color={"primary.main"}
                                        >
                                            Login
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

export default Register;
