// import { useState } from "react";
import { useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import InputPassword from "./components/InputPassword";
import InputPhoneNumber from "./components/InputPhoneNumber";
import { type Phone } from "../../types/phoneType";
import { type InputError } from "../../types/inputError";
import { useNotification } from "../../context/notification.context";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import { actionLoginUserWhithNumber } from "../../redux/actions/userAction";
import { UserKey } from "../../redux/slices/user.Slice";
import { actionsClearError } from "../../redux/actions/errorActions";

interface Props {}
interface Input {
    numberPhone: Phone;
    password: string;
}

type FormError = {
    phoneError: InputError;
    passwordError: InputError;
};

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
    const [input, setInput] = useState<Input>({
        numberPhone: { code: "", phone: 0 },
        password: "",
    });
    const [formError, setFormError] = useState<FormError>({
        phoneError: { error: false, message: "" },
        passwordError: { error: false, message: "" },
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { error } = useAppSelector((state) => state.error);
    const { user } = useAppSelector((state) => state.userSate);

    const login = () => {
        if (!formError.phoneError.error && !formError.passwordError.error) {
            dispatch(
                actionLoginUserWhithNumber(
                    `${input.numberPhone.code}${input.numberPhone.phone}`,
                    input.password
                )
            );
            if (error) {
                showNotification(`Error al iniciar sesion: ${error.message}`, "error");
                dispatch(actionsClearError());
            } else {
                user && (user.rol === UserKey ? navigate("/user/") : navigate("/admin/"));
            }
        } else {
            showNotification("Error: Telefono y/o Contraseña invalidos", "warning");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
        } else {
            setInput({
                ...input,
                numberPhone: {
                    ...input.numberPhone,
                    [e.target.name]: e.target.value,
                },
            });
            let aux = validarNumberPhone(e.target.value);
            setFormError({
                ...formError,
                phoneError: {
                    ...formError.phoneError,
                    error: aux !== "",
                    message: aux,
                },
            });
        }
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
                        codeName="code"
                        phoneName="phone"
                        codeValue={input.numberPhone.code}
                        phoneValue={input.numberPhone.phone}
                        handleChange={handleChange}
                        error={formError.phoneError.error}
                        errorMessage={formError.phoneError.message}
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
                        onClick={login}
                    >
                        Ingresar
                    </Button>
                </Grid>
                <Grid item xs={10} sx={{ height: "40px" }}>
                    <Button type="submit" variant="outlined" fullWidth color="primary" size="large">
                        Ingresar con gmail
                    </Button>
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
