import { Box, FormControl, TextField, useTheme, Theme, useMediaQuery, Stack } from "@mui/material";
import { Barber } from "../../../../../types/Barber";
import { useState } from "react";
import { DatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

interface FormDataEmployeeProps {
    employee: Partial<Barber>;
    handleChange: () => void;
}
const EmployeeDataForm: React.FC<FormDataEmployeeProps> = ({ employee }) => {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [date, setDate] = useState<Dayjs | null>(dayjs("2014-08-18T21:11:54"));
    const [phoneNumber, setPhoneNumber] = useState<{ code: string; number: number }>({
        code: "",
        number: 0,
    });

    const { name, phone, email, address, birthDay, password } = employee;
    const theme: Theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            width={"100%"}
            height={"100%"}
            gap={{ xs: 1 }}
            py={2}
            sx={{ boxSizing: "border-box", overflowY: "auto" }}
        >
            <Box
                sx={{
                    margin: "auto 0",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "center",
                    gap: 2,
                    boxSizing: "border-box",
                }}
            >
                <TextField
                    required
                    name="name"
                    value={name}
                    label="Nombre"
                    sx={{ width: { sm: "60%" } }}
                    size={isXs ? "small" : "medium"}
                />
                <TextField
                    required
                    name="email"
                    value={email}
                    label="Correo Electronico"
                    sx={{ width: { sm: "60%" } }}
                    size={isXs ? "small" : "medium"}
                />
                <TextField
                    type="number"
                    value={phone}
                    label="Telefono"
                    sx={{ width: { sm: "60%" } }}
                    size={isXs ? "small" : "medium"}
                />
                <TextField
                    name="address"
                    value={address}
                    label="Domicilio"
                    sx={{ width: { sm: "60%" } }}
                    size={isXs ? "small" : "medium"}
                />
                {isXs ? (
                    <MobileDatePicker
                        value={date}
                        label={"Fecha Nacimiento"}
                        inputFormat="DD/MM/YYYY"
                        onChange={() => {}}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{ width: { sm: "60%" } }}
                                size={isXs ? "small" : "medium"}
                            />
                        )}
                    />
                ) : (
                    <DatePicker
                        value={date}
                        label={"Fecha Nacimiento"}
                        inputFormat="DD/MM/YYYY"
                        onChange={() => {}}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{ width: { sm: "60%" } }}
                                size={isXs ? "small" : "medium"}
                            />
                        )}
                    />
                )}

                <TextField
                    required
                    name="password"
                    value={password}
                    type="password"
                    label="Contraseña"
                    sx={{ width: { sm: "60%" } }}
                    size={isXs ? "small" : "medium"}
                />
                <TextField
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    type="password"
                    label="Confirmar Contraseña"
                    sx={{ width: { sm: "60%" } }}
                    size={isXs ? "small" : "medium"}
                />
            </Box>
        </Box>
    );
};

export default EmployeeDataForm;
