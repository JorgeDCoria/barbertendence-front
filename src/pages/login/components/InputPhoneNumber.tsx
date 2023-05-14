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
}
const InputPhoneNumber: React.FC<Props> = ({ sizeInput, sizeIcon }) => {
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
                        <Select labelId="code" id="code-select" label={"Code"}>
                            <MenuItem>+54</MenuItem>
                            <MenuItem>+11</MenuItem>
                            <MenuItem>+381</MenuItem>
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
                        name="number"
                        label="Numero sin codigo de area"
                        type="number"
                    ></TextField>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default InputPhoneNumber;
