import { useState, useEffect } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";

import { Link, useLocation, useNavigate } from "react-router-dom";
import InputPassword from "./components/InputPassword";
import InputPhoneNumber from "./components/InputPhoneNumber";
import { type Phone } from "../../types/phoneType";
import { type InputError } from "../../types/inputError";
import { useNotification } from "../../context/notification.context";
import { useAppDispatch } from "../../hook/useStore";
import {
    actionLoginUserWhithEmail,
    actionLoginUserWhithNumber,
} from "../../redux/actions/userAction";

import { LoginButton } from "../../components/login-button";
import { PRIVATEROUTES } from "../../const";
import { UserRol } from "../../typesConfig";

interface Props {}

const validarPassword = (password: string): string => {
    let message = "";
    let ExpRegPass =
        /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
    if (!password.trim().length) message = "Ingrese su contraseña";
    //else if (password.match(ExpRegPass) == null) message = "El password no es seguro";
    return message;
};
const validarNumberPhone = (phone: string): string => {
    let ExpRegSoloNumeros = "^[0-9]+$";
    let message: string = "";
    if (phone.match(ExpRegSoloNumeros) == null) message = "Solo numeros";
    if (phone.length < 7) message = "Ingrese un numero valido";

    return message;
};

const LoginForm: React.FC<Props> = ({}) => {
    const { showNotification } = useNotification();
    const [input, setInput] = useState<{ numberPhone: string; password: string }>({
        numberPhone: "",
        password: "",
    });
    const [formError, setFormError] = useState({
        passwordError: { error: false, message: "" },
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const loginWhitNumber = () => {
        if (!formError.passwordError.error && input.numberPhone.length) {
            console.log("estoy por despachar");

            dispatch(actionLoginUserWhithNumber(`${input.numberPhone}`, input.password))
                .then(() => {
                    navigate(`/${PRIVATEROUTES}`, { replace: true });
                })
                .catch((e: any) => {
                    console.log(`ah ocurrido un error ${e.message}`);
                    showNotification(
                        `ah ocurrido un error al inicia sesion: ${e.message}`,
                        "error"
                    );
                });
        } else {
            showNotification("Error: Telefono y/o Contraseña invalidos", "warning");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if (e.target.name === "password") {
            setInput({ ...input, [e.target.name]: e.target.value });
            let aux = validarPassword(e.target.value);

            setFormError({
                ...formError,
                passwordError: {
                    ...formError.passwordError,
                    error: aux.length != 0,
                    message: aux,
                },
            });
        }
        // else {
        //     setInput({
        //         ...input,
        //         numberPhone: {
        //             ...input.numberPhone,
        //             [e.target.name]: e.target.value,
        //         },
        //     });
        //     let aux = validarNumberPhone(e.target.value);
        //     setFormError({
        //         ...formError,
        //         phoneError: {
        //             ...formError.phoneError,
        //             error: aux !== "",
        //             message: aux,
        //         },
        //     });
        // }
    };
    const handleChangeNumber = (value: string) => {
        setInput((prev) => ({ ...prev, numberPhone: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    };
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get("token");
        const user = searchParams.get("user");
        const rol = searchParams.get("roles");
        if (token && user && rol)
            dispatch(actionLoginUserWhithEmail(user, rol.toLowerCase() as UserRol, token))
                .then(() => {
                    navigate(`/${PRIVATEROUTES}`);
                })
                .catch((e: any) => {
                    console.log(e.message);
                    showNotification(
                        `Erro al iniciar con cuenta gmail, intentelo mas tarde ${e.message}`,
                        "error"
                    );
                });
    }, [location]);

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
                    <Typography component={"p"} align="center" color={"primary.main"}>
                        ¿olvidate tu password?
                    </Typography>
                    <Typography component={"p"} align="center">
                        No tienes una cuenta{" "}
                        <Link to={"/register"}>
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
