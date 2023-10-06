import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InputNumber from "./components/InputPhoneNumber";
import InputPassword from "./components/InputPassword";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import { actionSetUserToRegister } from "../../redux/actions/userAction";
import { User } from "../../types";
import { useNotification } from "../../context/notification.context";
import { usePersistData } from "../../hook/usePersistData";
import authService from "../../service/authService";

const Register = () => {
    const [input, setInput] = useState<Partial<User>>({
        fullName: "",
        password: "",
        numberPhone: "",
    });
    const [passwordCompare, setPasswordCompare] = useState("");
    const [error, setError] = useState<{ name: string; password: string }>({
        name: "",
        password: "",
    });
    const navigate = useNavigate();
    const { getIdBarberShop } = usePersistData();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.userSate);
    const { showNotification } = useNotification();
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleChangeNumber = (number: string) => {
        dispatch(actionSetUserToRegister({ ...user, numberPhone: number }));
    };
    const handleChangePasswordCompare = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPasswordCompare(e.target.value);
    };
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log("handleclick");
        setError({
            name: "",
            password: "",
        });
        if (!(input.fullName?.length && input.password?.length && input.numberPhone?.length))
            showNotification("Complete todos los campos", "warning");
        if (input.password !== passwordCompare) {
            setError((prev) => ({ ...prev, password: "No hay coincidencias, intente nuevamente" }));
        } else if (!(error.name + error.password).length && user?.numberPhone?.length) {
            input.numberPhone = user.numberPhone;
            dispatch(actionSetUserToRegister(input));
            authService
                .sendNumberPhone(input.numberPhone)
                .then(() => {
                    navigate(`/${getIdBarberShop()}/confirmForm`);
                })
                .catch((e: any) => {
                    console.log(e.message);

                    showNotification(
                        "Error al intentar contactar con el numero ingresado",
                        "error"
                    );
                });
        }
    };
    useEffect(() => {
        dispatch(actionSetUserToRegister(null));
    }, []);
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
                            id="fullName"
                            label="Name"
                            type="text"
                            name="fullName"
                            value={input.fullName}
                            fullWidth
                            variant="outlined"
                            size="small"
                            onChange={handleChangeInput}
                            error={error.name != ""}
                            helperText={error.name}
                        />
                    </Box>{" "}
                </Grid>
                {/* Number phone */}
                <Grid item xs={12} lg={10}>
                    <InputNumber
                        ifNumberExistError
                        sizeInput="small"
                        sizeIcon="small"
                        handleChange={handleChangeNumber}
                    />
                </Grid>

                <Grid item xs={12} lg={10}>
                    <InputPassword
                        label="Password"
                        name="password"
                        value={input.password ? input.password : ""}
                        sizeIcon="medium"
                        sizeTextField="small"
                        error={error?.password !== ""}
                        errorMessage={error.password}
                        handleChange={handleChangeInput}
                    />
                </Grid>
                <Grid item xs={12} lg={10}>
                    <InputPassword
                        label="Confirm Password"
                        name="passwordCompare"
                        sizeIcon="medium"
                        sizeTextField="small"
                        value={passwordCompare}
                        error={error.password !== ""}
                        errorMessage={error.password}
                        handleChange={handleChangePasswordCompare}
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
                            onClick={handleClick}
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
                            <Typography component={"span"} fontSize={"18px"} color={"primary.main"}>
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
