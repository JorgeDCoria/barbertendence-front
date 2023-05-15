import { Link } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InputNumber from "./components/InputPhoneNumber";
import InputPassword from "./components/InputPassword";

const Register = () => {
    return (
        <Box
            sx={{ height: "100%" }}
            component={"form"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            {/* contenedor de los inputs */}
            <Grid
                padding={2}
                container
                rowGap={{ xs: 4, md: 0 }}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                    height: { xs: "100%", sm: "90%", md: "100%" },
                }}
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
                    <InputNumber sizeInput="small" sizeIcon="small" />
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
                <Grid
                    item
                    xs={12}
                    lg={10}
                    direction={"column"}
                    justifyContent={"center"}
                    container
                    rowGap={2}
                >
                    <Grid item border="2px solid red">
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
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
        </Box>
    );
};

export default Register;
