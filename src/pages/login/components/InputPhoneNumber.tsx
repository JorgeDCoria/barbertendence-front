import { useState } from "react";
import {
    Box,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    Grid,
    TextField,
    SelectChangeEvent,
} from "@mui/material";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import { SizeSMLValue, type SizeSMValue } from "../../../typesConfig";
import { useAppDispatch } from "../../../hook/useStore";
import authService from "../../../service/authService";

interface Props {
    sizeInput: SizeSMValue;
    sizeIcon: SizeSMLValue;
    handleChange: (number: string) => void;
    ifNumberExistError?: boolean;
}
const InputPhoneNumber: React.FC<Props> = ({
    sizeInput,
    sizeIcon,
    handleChange,
    ifNumberExistError = false,
}) => {
    const [code, setCode] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [error, setError] = useState({
        error: false,
        message: "",
    });

    const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPhone(e.target.value);
    };
    const handleSelectCode = (e: SelectChangeEvent<string>) => {
        setCode(e.target.value);
    };
    const handleBlur = () => {
        console.log("perdi el foco");
        console.log(`${code}${phone}`.trim());
        if (code !== "") {
            setError({ error: false, message: "" });

            authService
                .validateAvailableNumberPhone(`${code}${phone}`)
                .then((valid) => {
                    //if ((ifNumberExistError && !valid) || (!ifNumberExistError && valid)) {
                    if (true) {
                        handleChange(`${code}${phone}`);
                    } else {
                        throw {
                            message: `El numero ${
                                ifNumberExistError ? "ya" : "no"
                            } existe en nuestra base de datos`,
                        };
                    }
                    console.log(valid);
                })
                .catch((e: any) => {
                    setError((prev) => ({ ...prev, message: e.message, error: true }));
                });
        } else {
            setError({ error: true, message: "Seleccione codigo area" });
        }
    };
    return (
        <Grid
            container
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{
                width: "100%",
                height: "100%",
            }}
        >
            <Grid item xs={5}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <PhoneAndroidOutlinedIcon fontSize={sizeIcon} />
                    <FormControl
                        fullWidth
                        size={sizeInput}
                        sx={{
                            ml: 1,
                            mr: 1,
                        }}
                    >
                        <InputLabel id="code">Code</InputLabel>
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
                </Box>
            </Grid>

            <Grid item xs={7}>
                {" "}
                <FormControl fullWidth>
                    {" "}
                    <TextField
                        size={sizeInput}
                        value={phone}
                        label="Numero sin codigo de area"
                        type="number"
                        onChange={handleChangePhone}
                        onBlur={handleBlur}
                        error={error.error}
                        helperText={error.message !== "" && error.message}
                    ></TextField>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default InputPhoneNumber;
