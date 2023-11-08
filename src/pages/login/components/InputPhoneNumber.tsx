import { useState } from "react";
import {
    Box,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    TextField,
    SelectChangeEvent,
    FormHelperText,
    Stack,
} from "@mui/material";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import { SizeSMLValue, type SizeSMValue } from "../../../typesConfig";

import authService from "../../../service/authService";

interface Props {
    sizeInput: SizeSMValue;
    sizeIcon: SizeSMLValue;
    handleChange: (number: string) => void;
    ifNumberExistError?: boolean;
    onErrorChange: (message: string) => void;
}
const InputPhoneNumber: React.FC<Props> = ({
    sizeInput,
    sizeIcon,
    handleChange,
    ifNumberExistError = false,
    onErrorChange,
}) => {
    const [code, setCode] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [error, setError] = useState({
        error: false,
        message: "",
    });

    const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setError({ error: false, message: "" });
        setPhone(e.target.value);
        if (e.target.value.length > 8) validatedNumber(code, e.target.value);
        if (e.target.value !== "") setError({ error: false, message: "" });
        else {
            onErrorChange("error");
            setError({ error: true, message: "complete numero telefono" });
        }
    };
    const handleSelectCode = (e: SelectChangeEvent<string>) => {
        setCode(e.target.value);
    };

    const validatedNumber = (code: string, phone: string) => {
        if (code !== "" && phone !== "") {
            setError({ error: false, message: "" });
            onErrorChange("");

            authService
                .validateAvailableNumberPhone(`${code}${phone}`)
                .then((valid) => {
                    if (ifNumberExistError && valid)
                        throw { message: "Ya existe una cuenta registrada con ese numero" };
                    if (!ifNumberExistError && !valid)
                        throw { message: "El Numero no pertenece a una cuenta registrada" };
                    handleChange(`${code}${phone}`);
                })
                .catch((e: any) => {
                    onErrorChange(e.message);
                    setError((prev) => ({ ...prev, message: e.message, error: true }));
                });
        } else {
            setError({
                error: true,
                message: "Numero invalido, verifique los codigo de area y/o numero",
            });
            onErrorChange("error");
        }
    };

    return (
        <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            sx={{
                width: "100%",
            }}
        >
            <Stack
                direction={"row"}
                width={"100%"}
                justifyContent={"space-between"}
                spacing={1}
                alignItems={"center"}
            >
                <PhoneAndroidOutlinedIcon fontSize={sizeIcon} />
                <FormControl fullWidth size={sizeInput} sx={{ width: "40%" }}>
                    <InputLabel id="code">Cod</InputLabel>
                    <Select
                        labelId="code"
                        id="code-select"
                        label={"Code"}
                        value={code}
                        onChange={handleSelectCode}
                    >
                        <MenuItem value={"+54"}>+54</MenuItem>
                        <MenuItem value={"+11"}>+11</MenuItem>
                        <MenuItem value={"+57"}>+57</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <TextField
                        size={sizeInput}
                        value={phone}
                        label="Numero sin codigo de area"
                        type="number"
                        onChange={handleChangePhone}
                    ></TextField>
                </FormControl>
            </Stack>
            {error && (
                <FormHelperText
                    sx={{
                        textAlign: "center",
                        width: "100%",
                        color: "red",
                    }}
                >
                    {error.message}
                </FormHelperText>
            )}
        </Box>
    );
};

export default InputPhoneNumber;
