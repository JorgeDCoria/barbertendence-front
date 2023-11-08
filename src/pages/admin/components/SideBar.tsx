import { useState } from "react";
import {
    Box,
    Theme,
    useTheme,
    Card,
    CardMedia,
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
import s from "../admin.module.css";
import { useAppDispatch, useAppSelector } from "../../../hook/useStore";
import { actionGetAppointmentsByState } from "../../../redux/actions/appointmentActions";
import ListBarbersCheck from "./ListBarbersCheck";
import { Link } from "react-router-dom";
const listMenuTurnos = [
    { title: "Todos", value: "ALL" },
    { title: "Pendientes", value: "Pendiente" },
    { title: "Cancelados", value: "Cancelado" },
    { title: "En Proceso", value: "En Proceso" },
    { title: "Ausentes", value: "Ausente" },
    { title: "Atendidos", value: "Atendido" },
];

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
    const dispatch = useAppDispatch();
    const theme: Theme = useTheme();
    const drawerWidth = 350;
    const draweHeaderHeight = 48;
    const [expanded, setExpanded] = useState<string | false>(false);
    const { barbersSelected: barbers } = useAppSelector((state) => state.barbers);
    const dayCalendar = dayjs(currentDate);

    const handleChangeAccordion =
        //@ts-ignore
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handleChangeDateCalendar = (date: Dayjs | null) => {
        if (date) {
            const aux = new Date(date.toString());
            handleChangeDate(aux);
        }
    };

    const handleClickFilterByState = (state: string) => {
        dispatch(actionGetAppointmentsByState(state));
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
                                        <ListItem key={item.title}>
                                            <Divider sx={{ background: "white" }} />
                                            <ListItemButton
                                                onClick={() => handleClickFilterByState(item.value)}
                                            >
                                                <ListItemText primary={item.title} />
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
                            <AccordionDetails>{barbers && <ListBarbersCheck />}</AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box display={"flex"} flexDirection={"column"} gap={1}>
                        <Box>
                            <Button
                                variant="contained"
                                onClick={() => handleChangeDate(new Date())}
                            >
                                Hoy
                            </Button>
                        </Box>

                        <CalendarPicker
                            className={s.calendar}
                            date={dayCalendar}
                            onChange={(newValue) => handleChangeDateCalendar(newValue)}
                        />
                    </Box>

                    <Link to={"/admin/clients"}>
                        <Button variant="contained">Clientes</Button>
                    </Link>
                </Box>
            </Box>
        </Drawer>
    );
};

export default SideBar;
