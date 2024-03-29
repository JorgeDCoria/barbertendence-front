import { Box, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { type SizeSMValue, type SizeSMLValue } from "../../../typesConfig";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
interface Props {
    label: string;
    name: string;
    sizeTextField?: SizeSMValue;
    sizeIcon?: SizeSMLValue;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error: boolean;
    errorMessage: string;
}

const InputPassword: React.FC<Props> = ({
    label,
    name,
    sizeTextField = "medium",
    sizeIcon = "large",
    value,
    handleChange,
    error,
    errorMessage,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = (): void => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    // const handleChangePassword = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     handleChange(e.target.value)
    // }
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
            }}
        >
            <LockOutlinedIcon fontSize={sizeIcon} />
            <TextField
                required
                id={name}
                label={label}
                type={showPassword ? "text" : "password"}
                name={name}
                fullWidth
                variant="outlined"
                size={sizeTextField}
                value={value}
                onChange={(e) => handleChange(e)}
                error={error}
                helperText={error ? errorMessage : ""}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <VisibilityOutlinedIcon
                                onClick={handleShowPassword}
                                sx={{
                                    cursor: "pointer",
                                }}
                            />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

export default InputPassword;
