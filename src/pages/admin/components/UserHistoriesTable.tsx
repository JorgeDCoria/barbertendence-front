import { useEffect } from "react";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Skeleton,
    Stack,
    Box,
    Typography,
    Theme,
    useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hook/useStore";
import {
    actionClearAppointmentsUserHistories,
    actionGetAppointmentsUserHistories,
} from "../../../redux/actions/appointmentActions";
import dayjs from "dayjs";

interface UserHistoriesTableProps {
    id: string;
}
const UserHistoriesTable: React.FC<UserHistoriesTableProps> = ({ id }) => {
    const dispatch = useAppDispatch();
    const { appointmentsUserHistory } = useAppSelector((state) => state.appointments);
    const theme: Theme = useTheme();

    useEffect(() => {
        dispatch(actionGetAppointmentsUserHistories(id));

        return () => {
            dispatch(actionClearAppointmentsUserHistories());
        };
    }, []);

    if (appointmentsUserHistory)
        return (
            <Box sx={{ margin: 1, background: theme.palette.primary.light, padding: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Historia
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Table
                        size="small"
                        aria-label="purchases"
                        sx={{
                            width: { sx: "100%", md: "70%" },
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Servicio</TableCell>
                                <TableCell>Profesional</TableCell>
                                <TableCell align="right">Estado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointmentsUserHistory.map((h) => (
                                <TableRow key={h.id}>
                                    <TableCell component="th" scope="row">
                                        {dayjs(h.date).format("DD/MM/YYYY-HH:mm")}
                                    </TableCell>
                                    <TableCell>{h.service.name}</TableCell>
                                    <TableCell align="right">{h.barber.name}</TableCell>
                                    <TableCell align="right">{h.state}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Box>
        );
    else
        return (
            <Box display={"flex"} justifyContent={"center"}>
                <Stack spacing={1} width={{ sx: "100%", md: "70%" }}>
                    <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "15ch" }} />

                    <Skeleton variant="rectangular" height={"80px"} width={"100%"} />
                </Stack>
            </Box>
        );
};

export default UserHistoriesTable;
