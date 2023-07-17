import {
    Box,
    Theme,
    useTheme,
    Card,
    CardMedia,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Drawer,
    IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import logo from "../../../assets/logov1.png";

interface Props {
    showSideBar: boolean | undefined;
    handleShowSideBar: () => void;
    isUpMd: boolean;
}
const SideBar: React.FC<Props> = ({ showSideBar, handleShowSideBar, isUpMd }) => {
    const theme: Theme = useTheme();
    const drawerWidth = 350;
    const draweHeaderHeight = 48;
    return (
        <Drawer
            open={showSideBar}
            variant={isUpMd ? "persistent" : "temporary"}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    background: theme.palette.customDark,
                    width: drawerWidth,
                    height: "100%",
                }}
            >
                <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                    pr={1}
                    sx={{
                        height: `${draweHeaderHeight}px`,
                        background: theme.palette.customDark,
                    }}
                >
                    <IconButton
                        onClick={handleShowSideBar}
                        sx={{
                            color: "white",
                            "&:hover": {
                                background: "gray",
                            },
                        }}
                    >
                        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </Box>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-around"}
                    alignItems={"center"}
                    border={"2px solid red"}
                    sx={{ height: `calc(100% - ${draweHeaderHeight}px)` }}
                >
                    <Card
                        sx={{
                            width: "200px",
                            height: "200px",
                            background: "none",
                            boxShadow: "none",
                        }}
                    >
                        <CardMedia
                            sx={{
                                width: "100%",
                                height: "100%",
                            }}
                            image={logo}
                        />
                    </Card>
                    <FormControl fullWidth>
                        <InputLabel
                            id="type-appointment"
                            sx={{
                                color: "white",
                            }}
                        >
                            {" "}
                            Turnos Pendientes
                        </InputLabel>
                        <Select
                            labelId="type-appointment"
                            value={""}
                            sx={{
                                border: "1px solid white",
                            }}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel
                            id="barber"
                            sx={{
                                color: "white",
                            }}
                        >
                            {" "}
                            all
                        </InputLabel>
                        <Select
                            labelId="barber"
                            value={""}
                            sx={{
                                border: "1px solid white",
                            }}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Drawer>
    );
};

export default SideBar;
