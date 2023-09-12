import { useState } from "react";
import {
    Box,
    Table,
    TableContainer,
    Paper,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Stack,
    Typography,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    SelectChangeEvent,
    Button,
} from "@mui/material";
import { Schedule, Shift } from "../../../../../types/Schedule";
import {
    DesktopTimePicker,
    LocalizationProvider,
    MobileTimePicker,
    TimePicker,
} from "@mui/x-date-pickers";

import dayjs, { Dayjs } from "dayjs";
import EmployeeScheduleRow from "./EmployeeScheduleRow";

// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";
// dayjs.extend(utc);
// dayjs.extend(timezone);

// dayjs.tz.setDefault("America/Argentina/Buenos_Aires");

const getCompleteMorningShift = () => {
    return {
        start: dayjs().hour(8).minute(0).toISOString(),
        end: dayjs().hour(12).minute(0).toISOString(),
    };
};
const getEmptyShift = () => {
    return {
        start: "",
        end: "",
    };
};
const getCompleteAfternoonShift = () => {
    return {
        start: dayjs().hour(16).minute(0).toISOString(),
        end: dayjs().hour(20).minute(0).toISOString(),
    };
};

const scheduleWeek: Schedule[] = [
    {
        day: "Lunes",
        morningShift: getCompleteMorningShift(),
        afternoonShift: getCompleteAfternoonShift(),
    },
    {
        day: "Martes",
        morningShift: getCompleteMorningShift(),
        afternoonShift: getCompleteAfternoonShift(),
    },
    {
        day: "Miercoles",
        morningShift: getCompleteMorningShift(),
        afternoonShift: getCompleteAfternoonShift(),
    },
    {
        day: "Jueves",
        morningShift: getCompleteMorningShift(),
        afternoonShift: getCompleteAfternoonShift(),
    },
    {
        day: "Viernes",
        morningShift: getCompleteMorningShift(),
        afternoonShift: getCompleteAfternoonShift(),
    },
];

const EmployeeScheduleForm = () => {
    const [barberSchedule, setBarberSchedule] = useState<Schedule[]>(scheduleWeek);
    const [age, setAge] = useState("");

    const addShift = (schedule: Schedule, turn: "afternoonShift" | "morningShift") => {
        setBarberSchedule((oldSchedule) => {
            let auxSchedules = [...oldSchedule];
            auxSchedules = auxSchedules.map((s) => {
                if (s.day == schedule.day) {
                    if (turn == "morningShift") s.morningShift = getCompleteMorningShift();
                    else s.afternoonShift = getCompleteAfternoonShift();
                }
                return s;
            });

            return auxSchedules;
        });
    };
    const handleSelect = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        let schedules: Schedule[] = [...barberSchedule];

        switch (value) {
            case "morning":
                schedules = schedules.map((s) => {
                    s.morningShift = getCompleteMorningShift();
                    s.afternoonShift = getEmptyShift();

                    return s;
                });
                break;
            case "afternoon":
                schedules = schedules.map((s) => {
                    s.morningShift = getEmptyShift();
                    s.afternoonShift = getCompleteAfternoonShift();

                    return s;
                });
                break;
            case "custom":
                schedules = schedules.map((s) => {
                    s.morningShift = getEmptyShift();
                    s.afternoonShift = getEmptyShift();
                    return s;
                });
                break;
            case "complete":
                schedules = schedules.map((s) => {
                    s.morningShift = getCompleteMorningShift();
                    s.afternoonShift = getCompleteAfternoonShift();
                    return s;
                });
                break;
        }
        setBarberSchedule(schedules);
        setAge(value);
    };

    const handleChange = (
        newValue: any,
        schedule: Schedule,
        prop: "morningShift" | "afternoonShift",
        typeShift: keyof Shift
    ) => {
        // let aux = { ...barberSchedule };

        // aux = aux.map((s) => {
        //     if (s.day == schedule.day) {
        //         if (prop == "morningShifth" || prop == "afternoonShifth") {
        //             s[prop][typeShifth] = newValue as string;
        //         } return s;
        //     } else return s;
        // });
        // setBarberSchedule(aux);
        let hour = dayjs(newValue).toISOString();
        console.log(hour);

        setBarberSchedule((prevSchedule) =>
            prevSchedule.map((s) => {
                if (s.day === schedule.day) {
                    return {
                        ...s,
                        [prop]: {
                            ...s[prop],
                            [typeShift]: hour,
                        },
                    };
                } else {
                    return s;
                }
            })
        );
    };
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            width={"100%"}
            height={"100%"}
            gap={{ xs: 1 }}
            py={2}
            sx={{ boxSizing: "border-box", overflowY: "auto" }}
        >
            <Box
                sx={{
                    margin: "auto 0",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "center",
                    gap: 2,
                    boxSizing: "border-box",
                    px: 2,
                }}
            >
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    width={"100%"}
                    borderBottom={"1px solid gray"}
                    p={1}
                    gap={2}
                >
                    <Typography>Seleccion Rapida</Typography>
                    <FormControl sx={{ width: { sm: "50%" } }}>
                        <Select
                            id="demo-simple-select"
                            value={age}
                            onChange={handleSelect}
                            displayEmpty
                        >
                            <MenuItem value={"complete"}>Turno Completo</MenuItem>
                            <MenuItem value={"morning"}>Turno Mañana</MenuItem>
                            <MenuItem value={"afternoon"}>Turno Tarde</MenuItem>
                            <MenuItem value={"custom"}>Personalizado</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Paper sx={{ width: "100%" }}>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Dia</TableCell>

                                    <TableCell align="center">Mañana</TableCell>
                                    <TableCell align="center">Tarde</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {barberSchedule.map((schedule) => (
                                    <EmployeeScheduleRow
                                        key={schedule.day}
                                        schedule={schedule}
                                        addShift={addShift}
                                        handleChange={handleChange}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </Box>
    );
};

export default EmployeeScheduleForm;
