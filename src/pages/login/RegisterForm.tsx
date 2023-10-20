import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Stack, FormHelperText } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InputNumber from "./components/InputPhoneNumber";
import InputPassword from "./components/InputPassword";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hook/useStore";
import { actionSetUserTemp } from "../../redux/actions/userAction";
import { User } from "../../types";
import { useNotification } from "../../context/notification.context";
import { usePersistData } from "../../hook/usePersistData";
import { LoginButton } from "../../components/login-button";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const Register = () => {
    const [input, setInput] = useState<Partial<User>>({
        fullName: "",
        password: "",
        numberPhone: "",
        birthDate: new Date().toISOString(),
    });
    const [passwordCompare, setPasswordCompare] = useState("");
    const [error, setError] = useState<{ fullName: string; password: string; numberPhone: string }>(
        {
            fullName: "",
            password: "",
            numberPhone: "",
        }
    );
    const navigate = useNavigate();
    const { getIdBarberShop } = usePersistData();
    const dispatch = useAppDispatch();
    const { showNotification } = useNotification();

    const handleInputChangeErrorNumberPhone = (message: string) => {
        setError((prev) => ({ ...prev, numberPhone: message }));
    };
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (e.target.name == "password") {
            if (passwordCompare !== "" && passwordCompare !== e.target.value)
                setError((prev) => ({
                    ...prev,
                    password: "Los campos de contraseña no coinciden",
                }));
        }
        if (e.target.name == "fullName") {
            if (e.target.value == "") setError((prev) => ({ ...prev, fullName: "campo vacio" }));
            else if (e.target.value.length < 3)
                setError((prev) => ({
                    ...prev,
                    fullName: "Nombre debe contener mas de tres caracteres",
                }));
            else setError((prev) => ({ ...prev, fullName: "" }));
        }
    };

    const handleChangeDate = (date: string | Date | null) => {
        let newDate: Date | string = new Date(date as string | Date);
        newDate = newDate.toISOString();
        console.log(newDate);

        if (date !== null) setInput((prev) => ({ ...prev, birthDate: newDate }));
    };
    const handleChangeNumber = (number: string) => {
        //dispatch(actionSetUserToRegister({ ...user, numberPhone: number }));
        setInput((prev) => ({ ...prev, numberPhone: number }));
    };
    const handleChangePasswordCompare = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPasswordCompare(e.target.value);
        if (e.target.value !== input.password)
            setError((prev) => ({ ...prev, password: "Los campos de contraseña no coinciden" }));
        else setError((prev) => ({ ...prev, password: "" }));
    };

    const validatedForm = (): boolean => {
        return [error.fullName, error.numberPhone, error.password].join("").length === 0;
    };
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (validatedForm()) {
            console.log("pase validate");
            try {
                await dispatch(actionSetUserTemp(input));
                navigate(`/${getIdBarberShop()}/confirmForm`);
            } catch (e) {
                showNotification("Error al registrar, intente mas tarde", "error");
            }
        }
    };
    useEffect(() => {
        dispatch(actionSetUserTemp(null));
    }, []);
    return (
        <Box
            sx={{ height: "100%", width: { xs: "100%", md: "80%" } }}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-around"}
        >
            {/* contenedor de los inputs */}

            <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{
                    gap: "8px",
                    width: "100%",
                }}
            >
                <AccountCircleOutlinedIcon />
                <TextField
                    required
                    id="fullName"
                    label="Nombre Completo"
                    type="text"
                    fullWidth
                    name="fullName"
                    value={input.fullName}
                    variant="outlined"
                    size="small"
                    onChange={handleChangeInput}
                    error={error.fullName != ""}
                    helperText={error.fullName}
                />
            </Stack>
            {/* Number phone */}

            <InputNumber
                ifNumberExistError
                sizeInput="small"
                sizeIcon="small"
                handleChange={handleChangeNumber}
                onErrorChange={handleInputChangeErrorNumberPhone}
            />
            <DesktopDatePicker
                label="Fecha de Nacimiento"
                inputFormat="DD/MM/YYYY"
                value={input.birthDate}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField size="small" {...params} />}
            />
            <InputPassword
                label="Contraseña"
                name="password"
                value={input.password ? input.password : ""}
                sizeIcon="medium"
                sizeTextField="small"
                error={false}
                errorMessage={""}
                handleChange={handleChangeInput}
            />

            <InputPassword
                label="Confirmar Contraseña"
                name="passwordCompare"
                sizeIcon="medium"
                sizeTextField="small"
                value={passwordCompare}
                error={error.password !== ""}
                errorMessage={error.password}
                handleChange={handleChangePasswordCompare}
            />

            <Stack spacing={2} width={"100%"}>
                <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    onClick={handleClick}
                    disabled={!validatedForm()}
                >
                    Registrarse
                </Button>
                <LoginButton size="small" />
            </Stack>

            <FormHelperText sx={{ textAlign: "center", fontSize: "1rem" }}>
                Ya tienes una cuenta{" "}
                <Link to={`/${getIdBarberShop()}`}>
                    <Typography component={"span"} color={"primary.main"}>
                        Login
                    </Typography>{" "}
                </Link>
            </FormHelperText>
        </Box>
    );
};

export default Register;
