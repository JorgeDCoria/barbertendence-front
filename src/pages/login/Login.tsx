// import { useState } from "react";
import {
    Box,
    Grid,
    InputAdornment,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
} from "@mui/material";
import logo from "../../assets/logo.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import { Link } from "react-router-dom";

interface Props {}

const Login: React.FC<Props> = ({}) => {
    //const [showPassword, setShowPassword] = useState<Boolean>(false);
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
                            <Grid
                                item
                                xs={12}
                                lg={10}
                                container
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                sx={{ height: "80px" }}
                            >
                                <Grid item xs={5}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <PhoneAndroidOutlinedIcon fontSize="large" />
                                        <FormControl
                                            sx={{
                                                minWidth: { xs: 80, sm: 100 },
                                            }}
                                        >
                                            <InputLabel id="code">
                                                Code
                                            </InputLabel>
                                            <Select
                                                labelId="code"
                                                id="code-select"
                                                label="Code"
                                            >
                                                <MenuItem>+54</MenuItem>
                                                <MenuItem>+11</MenuItem>
                                                <MenuItem>+381</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={7}>
                                    {" "}
                                    <FormControl fullWidth>
                                        {" "}
                                        <TextField
                                            name="number"
                                            label="Numero sin codigo de area"
                                            type="number"
                                        ></TextField>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {/* Numero password */}

                            <Grid
                                item
                                xs={12}
                                lg={10}
                                sx={{ height: "80px" }}
                                container
                                alignItems={"center"}
                                justifyContent={"center"}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        width: "100%",
                                    }}
                                >
                                    {" "}
                                    <LockOutlinedIcon fontSize="large" />
                                    <TextField
                                        required
                                        id="input-password"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <VisibilityOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>{" "}
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
