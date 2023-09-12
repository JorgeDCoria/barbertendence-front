import { useState } from "react";
import { TableRow, TableCell, Stack, TextField, Typography, Button } from "@mui/material";
import { Schedule, Shift } from "../../../../../types/Schedule";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface EmployeeScheduleRowProps {
    schedule: Schedule;
    handleChange: (
        newValue: any,
        schedule: Schedule,
        prop: "morningShift" | "afternoonShift",
        typeShift: keyof Shift
    ) => void;
    addShift: (schedule: Schedule, turn: "morningShift" | "afternoonShift") => void;
}
const EmployeeScheduleRow: React.FC<EmployeeScheduleRowProps> = ({
    schedule,
    handleChange,
    addShift,
}) => {
    const [readOnly, setReadOnly] = useState(true);
    return (
        <TableRow key={schedule.day}>
            <TableCell align="left">{schedule.day}</TableCell>
            <TableCell align="center">
                {schedule.morningShift.start != "" && schedule.morningShift.end != "" ? (
                    <Stack spacing={1}>
                        <TimePicker
                            readOnly={readOnly}
                            label="Inicio"
                            ampm={true}
                            value={schedule.morningShift.start}
                            onChange={(newValue) =>
                                handleChange(newValue, schedule, "morningShift", "start")
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    disabled
                                    size="small"
                                    sx={{ minWidth: "110px" }}
                                />
                            )}
                        />
                        <TimePicker
                            ampm={true}
                            readOnly={readOnly}
                            label="FIn"
                            value={schedule.morningShift.end}
                            onChange={(newValue) =>
                                handleChange(newValue, schedule, "morningShift", "end")
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    disabled
                                    size="small"
                                    sx={{ minWidth: "110px" }}
                                />
                            )}
                        />
                    </Stack>
                ) : (
                    <Stack>
                        <Typography>No disponible</Typography>
                        <Button
                            variant="outlined"
                            onClick={() => addShift(schedule, "morningShift")}
                        >
                            Agregar Horario
                        </Button>
                    </Stack>
                )}
            </TableCell>

            <TableCell align="center">
                {schedule.afternoonShift.start != "" && schedule.afternoonShift.end != "" ? (
                    <Stack spacing={1}>
                        <TimePicker
                            readOnly={readOnly}
                            label="Inicio"
                            ampm={true}
                            value={dayjs(schedule.afternoonShift.start).toDate()}
                            onChange={(newValue) =>
                                handleChange(newValue, schedule, "afternoonShift", "start")
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    disabled
                                    size="small"
                                    sx={{ minWidth: "110px" }}
                                />
                            )}
                        />
                        <TimePicker
                            ampm={true}
                            readOnly={readOnly}
                            label="FIn"
                            value={schedule.afternoonShift.end}
                            onChange={(newValue) =>
                                handleChange(newValue, schedule, "afternoonShift", "end")
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    disabled
                                    size="small"
                                    sx={{ minWidth: "110px" }}
                                />
                            )}
                        />
                    </Stack>
                ) : (
                    <Stack>
                        <Typography>No disponible</Typography>
                        <Button
                            variant="outlined"
                            onClick={() => addShift(schedule, "afternoonShift")}
                        >
                            Agregar Horario
                        </Button>
                    </Stack>
                )}
            </TableCell>

            <TableCell align="center">
                <Button variant="outlined" size="small" onClick={() => setReadOnly(false)}>
                    Personalizar
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default EmployeeScheduleRow;
