import { useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import InputPassword from "./components/InputPassword";
import InputPhoneNumber from "./components/InputPhoneNumber";
import { useNotification } from "../../context/notification.context";
import { useAppDispatch } from "../../hook/useStore";
import { actionLoginUserWhithNumber } from "../../redux/actions/userAction";
import { LoginButton } from "../../components/login-button";
import { PRIVATEROUTES } from "../../const";

import { usePersistData } from "../../hook/usePersistData";

interface Props {}

const LoginForm: React.FC<Props> = ({}) => {
    const { showNotification } = useNotification();
    const [input, setInput] = useState<{ numberPhone: string; password: string }>({
        numberPhone: "",
        password: "",
    });
    const [formError, setFormError] = useState({
        passwordError: { error: false, message: "" },
        phoneError: { error: false, message: "" },
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { getIdBarberShop } = usePersistData();

    const loginWhitNumber = () => {
        if (!formError.passwordError.error && input.numberPhone.length) {
            console.log("estoy por despachar");

            dispatch(actionLoginUserWhithNumber(`${input.numberPhone}`, input.password))
                .then(() => {
                    showNotification("Inicio de session exitoso, bienvenido/a", "success");
                    navigate(`/${PRIVATEROUTES}`, { replace: true });
                })
                .catch((e: any) => {
                    console.log(`ah ocurrido un error ${e.message}`);
                    showNotification(
                        `Error: numero/ contraseña invalidos, intente nuevamente`,
                        "error"
                    );
                });
        } else {
            showNotification("Error: Telefono y/o Contraseña invalidos", "warning");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if (e.target.name === "password") {
            if (e.target.value !== "")
                setFormError({
                    ...formError,
                    passwordError: {
                        ...formError.passwordError,
                        error: false,
                        message: "",
                    },
                });
            else {
                setFormError({
                    ...formError,
                    passwordError: {
                        ...formError.passwordError,
                        error: true,
                        message: "Complete el campo contraseña",
                    },
                });
            }

            setInput({ ...input, [e.target.name]: e.target.value });
        }
    };
    const handleChangeNumber = (value: string) => {
        setInput((prev) => ({ ...prev, numberPhone: value }));
    };

    const handleChangeInputErrorNumberPhone = (message: string) => {
        setFormError((prev) => ({
            ...prev,
            phoneError: { ...prev.phoneError, error: message.length == 0, message: message },
        }));
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    };

    return (
        <Box
            sx={{ height: "100%" }}
            component={"form"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            onSubmit={handleSubmit}
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
                {/*  input phone */}
                <Grid item xs={12} lg={10}>
                    <InputPhoneNumber
                        sizeIcon="large"
                        sizeInput="medium"
                        handleChange={handleChangeNumber}
                        onErrorChange={handleChangeInputErrorNumberPhone}
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
                        value={input.password}
                        handleChange={handleChange}
                        error={formError.passwordError.error}
                        errorMessage={formError.passwordError.message}
                    />
                </Grid>
                <Grid item xs={10} sx={{ height: "40px" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        color="primary"
                        size="large"
                        onClick={loginWhitNumber}
                    >
                        Ingresar
                    </Button>
                </Grid>
                <Grid item xs={10} sx={{ height: "40px" }}>
                    <LoginButton />
                </Grid>
                <Grid item xs={10}>
                    <Link
                        to={`/${getIdBarberShop()}/reset-password`}
                        style={{ textDecoration: "none" }}
                    >
                        <Typography component={"p"} align="center" color={"primary.main"}>
                            ¿olvidate tu contraseña?
                        </Typography>
                    </Link>
                    <Typography component={"p"} align="center">
                        No tienes una cuenta{" "}
                        <Link
                            to={`/${getIdBarberShop()}/register`}
                            style={{ textDecoration: "none" }}
                        >
                            <Typography component={"span"} fontSize={"18px"} color={"primary.main"}>
                                Registrate
                            </Typography>{" "}
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginForm;
