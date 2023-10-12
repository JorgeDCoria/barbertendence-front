import { Link, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Typography,
    Stack,
    FormHelperText,
    FormControl,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InputNumber from "./components/InputPhoneNumber";
import InputPassword from "./components/InputPassword";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import { actionSetUserToRegister, actionRegisterUser } from "../../redux/actions/userAction";
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
    const [error, setError] = useState<{ name: string; password: string }>({
        name: "",
        password: "",
    });
    const navigate = useNavigate();
    const { getIdBarberShop } = usePersistData();
    const dispatch = useAppDispatch();
    const { showNotification } = useNotification();

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        setError((prev) => ({ ...prev, password: "" }));
    };
    const handleBlurPassword = () => {
        if (input.password !== passwordCompare) {
            setError((prev) => ({ ...prev, password: "No hay coincidencias, intente nuevamente" }));
        }
    };

    const validatedForm = (): boolean => {
        const valid = true;
        setError({
            name: "",
            password: "",
        });
        if (!(input.fullName?.length && input.password?.length && input.numberPhone?.length))
            showNotification("Complete todos los campos", "warning");
        else if (!(error.name + error.password + input.numberPhone).length) {
        }
        return valid;
    };
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (validatedForm()) {
            console.log("pase validate");
            try {
                await dispatch(actionRegisterUser(input));
                navigate(`/${getIdBarberShop()}/confirmForm`);
            } catch (e) {
                showNotification("Error al registrar, intente mas tarde", "error");
            }
        }
    };
    useEffect(() => {
        dispatch(actionSetUserToRegister(null));
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
                    label="Name"
                    type="text"
                    fullWidth
                    name="fullName"
                    value={input.fullName}
                    variant="outlined"
                    size="small"
                    onChange={handleChangeInput}
                    error={error.name != ""}
                    helperText={error.name}
                />
            </Stack>
            {/* Number phone */}

            <InputNumber
                ifNumberExistError
                sizeInput="small"
                sizeIcon="small"
                handleChange={handleChangeNumber}
            />
            <DesktopDatePicker
                label="Fecha de Nacimiento"
                inputFormat="DD/MM/YYYY"
                value={input.birthDate}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField size="small" {...params} />}
            />
            <InputPassword
                label="Password"
                name="password"
                value={input.password ? input.password : ""}
                sizeIcon="medium"
                sizeTextField="small"
                error={false}
                errorMessage={""}
                handleChange={handleChangeInput}
            />
            <FormControl onBlur={handleBlurPassword}>
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
            </FormControl>

            <Stack spacing={2} width={"100%"}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleClick}
                >
                    Registrarse
                </Button>
                <LoginButton size="small" />
            </Stack>

            <FormHelperText sx={{ textAlign: "center" }}>
                Ya tienes una cuenta{" "}
                <Link to={`/${getIdBarberShop()}`}>
                    <Typography component={"span"} fontSize={"14px"} color={"primary.main"}>
                        Login
                    </Typography>{" "}
                </Link>
            </FormHelperText>
        </Box>
    );
};

export default Register;
