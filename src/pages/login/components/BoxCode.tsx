import { Box, InputAdornment, TextField, useTheme } from "@mui/material";

interface Props {
    value: string;
    handleChange: Function;
}
const BoxCode: React.FC<Props> = ({ value, handleChange }) => {
    const theme = useTheme();
    return (
        <Box
            component={"div"}
            border={`1px solid ${theme.palette.primary.main}`}
            width={{ xs: "3rem", sm: "3.5rem" }}
            height={{ xs: "4rem", sm: "5rem" }}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"8px"}
            sx={{
                background: theme.palette.primary.light,
            }}
        >
            <TextField
                inputProps={{ maxLength: 1 }}
                variant="standard"
                sx={{
                    textAlign: "center",
                    px: "0.7rem",
                    "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                            borderWidth: 0, // Quita el borde en estado hover
                        },
                        "&.Mui-focused fieldset": {
                            borderWidth: 0, // Quita el borde en estado focus
                        },
                    },
                    "& .MuiInputBase-input": {
                        fontSize: { xs: "32px", sm: "44px" },
                    },
                }}
            ></TextField>
        </Box>
    );
};

export default BoxCode;
