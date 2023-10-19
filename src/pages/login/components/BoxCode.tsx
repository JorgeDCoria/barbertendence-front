import { Box, TextField, useTheme } from "@mui/material";

interface Props {
    value: string;
    handleChange: Function;
    name: string;
}
const BoxCode: React.FC<Props> = ({ value, handleChange, name }) => {
    const theme = useTheme();
    //const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleChange(e);
        //se prevee que el foco cambie de froma automatica
        // const input = inputRef.current;
        // if (input && e.target.value !== "" && name !== "5") {
        //     const nextBoxCode = input.parentNode?.nextSibling;

        //     if (nextBoxCode instanceof Element) {
        //         const nextInput = nextBoxCode.querySelector("input");
        //         console.log(nextInput);

        //         nextInput?.focus();
        //     }
        //     //input.nextSibling.querySelector("input".focus());
        // }
    };
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
                name={name}
                inputProps={{ maxLength: 1 }}
                variant="standard"
                onChange={handleInputChage}
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
            >
                {value}
            </TextField>
        </Box>
    );
};

export default BoxCode;
