import { Button, Stack, Typography, Theme, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
interface Props {
    label: string;
    handleClick?: Function;
}
const ButtonLg: React.FC<Props> = ({ label, handleClick }) => {
    const theme: Theme = useTheme();
    return (
        <Button
            onClick={handleClick ? (e) => handleClick(e) : () => {}}
            sx={{
                color: "white",
                width: "7rem",
                background: theme.palette.primary.dark,
                boxShadow: `2px 2px 10px 1px ${theme.palette.primary.main}`,
                "&:hover": {
                    background: theme.palette.primary.main,
                },
            }}
        >
            <Stack justifyContent={"center"} alignItems={"center"}>
                <AddIcon
                    sx={{
                        fontSize: "3rem",
                        color: "white",
                    }}
                />

                <Typography>{label}</Typography>
            </Stack>
        </Button>
    );
};

export default ButtonLg;
