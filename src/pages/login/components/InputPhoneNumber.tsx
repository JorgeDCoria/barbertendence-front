import {
    Box,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    Grid,
    TextField,
} from "@mui/material";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import { SizeSMLValue, type SizeSMValue } from "src/types";

interface Props {
    sizeInput: SizeSMValue;
    sizeIcon: SizeSMLValue;
    codeName: string;
    codeValue: string;
    phoneValue: number;
    phoneName: string;
    handleChange: Function;
    error: boolean;
    errorMessage: string;
}
const InputPhoneNumber: React.FC<Props> = ({
    sizeInput,
    sizeIcon,
    codeName,
    codeValue,
    phoneName,
    phoneValue,
    handleChange,
    error,
    errorMessage,
}) => {
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
                            name={codeName}
                            value={codeValue}
                            onChange={(e) => handleChange(e)}
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
                        name={phoneName}
                        value={phoneValue}
                        label="Numero sin codigo de area"
                        type="number"
                        onChange={(e) => handleChange(e)}
                        error={error}
                        helperText={error ? errorMessage : ""}
                    ></TextField>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default InputPhoneNumber;
