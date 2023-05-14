import { Box, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { type SizeSMValue, type SizeSMLValue } from "src/types";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
interface Props {
    label: string;
    name: string;
    sizeTextField: SizeSMValue;
    sizeIcon: SizeSMLValue;
}

const InputPassword: React.FC<Props> = ({
    label,
    name,
    sizeTextField,
    sizeIcon,
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
            }}
        >
            {" "}
            <LockOutlinedIcon fontSize={sizeIcon} />
            <TextField
                required
                id={name}
                label={label}
                type="password"
                name={name}
                fullWidth
                variant="outlined"
                size={sizeTextField}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <VisibilityOutlinedIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

export default InputPassword;
