import { useEffect, useState } from "react";
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
    TablePagination,
    useTheme,
    TableContainer,
} from "@mui/material";
import dayjs from "dayjs";
import { useUserHistories } from "../../../hook/useUserHistories";

interface UserHistoriesTableProps {
    id: string;
}
const UserHistoriesTable: React.FC<UserHistoriesTableProps> = ({ id }) => {
    const theme: Theme = useTheme();
    const { histories, error, loading } = useUserHistories(id);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    //@ts-ignore
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {}, [histories]);

    if (loading)
        return (
            <Box display={"flex"} justifyContent={"center"}>
                <Stack spacing={1} width={{ sx: "100%", md: "70%" }}>
                    <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "15ch" }} />

                    <Skeleton variant="rectangular" height={"80px"} width={"100%"} />
                </Stack>
            </Box>
        );
    else if (error) {
        return (
            <Box
                display={"grid"}
                sx={{
                    background: theme.palette.primary.light,
                    placeContent: "center",
                    p: 2,
                }}
            >
                <Typography variant="h4" color={"red"}>
                    Error
                </Typography>
                <Typography> {error.message}</Typography>
            </Box>
        );
    } else
        return (
            <Box sx={{ margin: 1, background: theme.palette.primary.light, padding: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Historia
                </Typography>
                {histories?.length !== 0 ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <TableContainer
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
                                        <TableCell align="right">Servicio</TableCell>
                                        <TableCell align="right">Profesional</TableCell>
                                        <TableCell align="right">Estado</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {histories
                                        ?.slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((h) => (
                                            <TableRow key={h.id}>
                                                <TableCell component="th" scope="row">
                                                    {dayjs(h.date).format("DD/MM/YYYY-HH:mm")}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {h.service.name}
                                                </TableCell>
                                                <TableCell align="right">{h.barber.name}</TableCell>
                                                <TableCell align="right">{h.state}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component={"div"}
                            count={histories ? histories?.length : 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{ mt: "2rem" }}
                        />
                    </Box>
                ) : (
                    <Typography textAlign={"center"}>No se encontraron recursos</Typography>
                )}
            </Box>
        );
};

export default UserHistoriesTable;
