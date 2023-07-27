import { useState } from "react";
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
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import logo from "../../../assets/logoTitle.png";
// import { DateCalendar, DatePicker, StaticDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { CalendarPicker } from "@mui/x-date-pickers";

const listMenuTurnos: string[] = ["Pendientes", "Vencidas", "Otros"];
interface Props {
    showSideBar: boolean | undefined;
    handleShowSideBar: () => void;
    isUpMd: boolean;
    currentDate: Date;
    handleChangeDate: (date: Date) => void;
}
const SideBar: React.FC<Props> = ({
    showSideBar,
    handleShowSideBar,
    isUpMd,
    currentDate,
    handleChangeDate,
}) => {
    const theme: Theme = useTheme();
    const drawerWidth = 350;
    const draweHeaderHeight = 48;
    const [expanded, setExpanded] = useState<string | false>(false);
    const dayCalendar = dayjs(currentDate);
    const handleChangeAccordion =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handleChangeDateCalendar = (date: Dayjs | null) => {
        if (date) {
            const aux = new Date(date.toString());
            handleChangeDate(aux);
        }
    };
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
                    overflowY: "auto",
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
                    <Card
                        sx={{
                            flex: 1,
                            height: "100%",
                            p: "8px",
                            background: "none",
                            boxShadow: "none",
                        }}
                    >
                        <CardMedia
                            sx={{
                                width: "50%",
                                height: "100%",
                            }}
                            image={logo}
                        />
                    </Card>
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
                    gap={2}
                    px={2}
                    sx={{
                        minHeight: `calc(100% - ${draweHeaderHeight}px)`,
                    }}
                >
                    <Box width={"100%"}>
                        <Accordion
                            expanded={expanded === "panel1"}
                            onChange={handleChangeAccordion("panel1")}
                            sx={{
                                background: "none",
                                color: "white",
                                boxShadow: "none",
                                border: "1px solid gray",
                                width: "100%",
                            }}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <ExpandMoreIcon
                                        sx={{
                                            color: "white",
                                        }}
                                    />
                                }
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Turnos </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    {listMenuTurnos.map((item) => (
                                        <ListItem key={item}>
                                            <Divider sx={{ background: "white" }} />
                                            <ListItemButton>
                                                <ListItemText primary={item} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box width={"100%"}>
                        <Accordion
                            expanded={expanded === "panel2"}
                            onChange={handleChangeAccordion("panel2")}
                            sx={{
                                background: "none",
                                color: "white",
                                boxShadow: "none",
                                border: "1px solid gray",
                                width: "100%",
                            }}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <ExpandMoreIcon
                                        sx={{
                                            color: "white",
                                        }}
                                    />
                                }
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Barberos </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    {listMenuTurnos.map((item) => (
                                        <ListItem key={item}>
                                            <ListItemButton>
                                                <ListItemText primary={item} />
                                            </ListItemButton>{" "}
                                            <Divider sx={{ background: "white" }} />
                                        </ListItem>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box display={"flex"} flexDirection={"column"} gap={1}>
                        <Box>
                            <Button variant="contained">Hoy</Button>
                        </Box>

                        {/* <DateCalendar
                            value={dayCalendar}
                            onChange={(newValue) => handleChangeDateCalendar(newValue)}
                            sx={{
                                background: "white",
                                borderRadius: "16px",
                            }}
                        /> */}
                        <CalendarPicker
                            date={dayCalendar}
                            onChange={(newValue) => handleChangeDateCalendar(newValue)}
                        />
                    </Box>

                    <Button variant="contained">Clientes</Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default SideBar;
