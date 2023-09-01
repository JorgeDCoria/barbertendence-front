import { useEffect, useState } from "react";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Theme,
    Typography,
    useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../hook/useStore";
import { Barber } from "src/types/Barber";
import { visuallyHidden } from "@mui/utils";
import {
    actionGetAllBarber,
    actionOrderBarberByProperty,
} from "../../../../../redux/actions/barberActions";
import EmployeRow from "./EmployeRow";

// id: string;
// name: string;
// description: string;
// avatar: string;
// birthDay?: string;
// mail?: string;
// phone?: string;

type Order = "asc" | "desc";
const EmployesTable = () => {
    const theme: Theme = useTheme();
    const dispatch = useAppDispatch();
    const { barbers } = useAppSelector((state) => state.barbers);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof Barber>("name");

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const createSortHandler = (e: React.MouseEvent<unknown>, property: keyof Barber) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
        dispatch(actionOrderBarberByProperty(isAsc ? "desc" : "asc", property));
    };

    useEffect(() => {
        dispatch(actionGetAllBarber());
    }, []);
    return (
        <Box mt={10} p={4}>
            <TableContainer component={Paper} sx={{ mt: 2, minHeight: "60vh", padding: 1 }}>
                <Table aria-label="collapsible table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sortDirection={orderBy === "name" ? order : false}>
                                <TableSortLabel
                                    active={orderBy === "name"}
                                    direction={orderBy === "name" ? order : "asc"}
                                    onClick={(e) => createSortHandler(e, "name")}
                                >
                                    Nombre
                                    {orderBy === "name" ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === "desc"
                                                ? "sorted descending"
                                                : "sorted ascending"}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                align="right"
                                sortDirection={orderBy === "email" ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === "email"}
                                    direction={orderBy === "email" ? order : "asc"}
                                    onClick={(e) => createSortHandler(e, "email")}
                                >
                                    Email
                                    {orderBy === "email" ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === "desc"
                                                ? "sorted descending"
                                                : "sorted ascending"}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">telefono</TableCell>

                            <TableCell align="right">Accion</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {barbers &&
                            (barbers.length == 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <Typography textAlign={"center"}>
                                            No se Encontraron resultados
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                barbers
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((barber) => <EmployeRow key={barber.id} barber={barber} />)
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component={"div"}
                count={barbers ? barbers?.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ mt: "2rem" }}
            />
        </Box>
    );
};

export default EmployesTable;
