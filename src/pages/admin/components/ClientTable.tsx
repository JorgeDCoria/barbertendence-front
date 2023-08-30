import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hook/useStore";
import { actionGetAllUser, actionOrderUserByProperty } from "../../../redux/actions/userAction";
import {
    Table,
    TablePagination,
    Container,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Theme,
    useTheme,
    TableSortLabel,
    Typography,
    Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { visuallyHidden } from "@mui/utils";

import UserRow from "./UserRow";
import { useNavigate } from "react-router-dom";
import { User } from "../../../types/User";
import SearchBar from "../../../components/search-bar/SearchBar";

type Order = "asc" | "desc";

const ClientTable: React.FC = () => {
    const theme: Theme = useTheme();
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.userSate);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof User>("fullName");
    const navigate = useNavigate();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const createSortHandler = (e: React.MouseEvent<unknown>, property: keyof User) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
        dispatch(actionOrderUserByProperty(isAsc ? "desc" : "asc", property));
    };

    // const visibleRows = React.useMemo(
    //     () =>
    //       stableSort(rows, getComparator(order, orderBy)).slice(
    //         page * rowsPerPage,
    //         page * rowsPerPage + rowsPerPage,
    //       ),
    //     [order, orderBy, page, rowsPerPage],
    //   );

    useEffect(() => {
        dispatch(actionGetAllUser());
    }, []);

    return (
        <Container
            maxWidth={"xl"}
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
            }}
        >
            <Typography
                textAlign={"center"}
                color={theme.palette.primary.main}
                variant="h4"
                sx={{ position: "relative" }}
            >
                <ArrowBackIcon
                    fontSize="large"
                    onClick={() => navigate("/admin/")}
                    sx={{
                        position: "absolute",
                        left: "10px",
                        top: "5px",
                        cursor: "pointer",
                        "&:hover": {
                            color: theme.palette.primary.dark,
                            scale: "1.2",
                            background: theme.palette.primary.light,
                            borderRadius: 50,
                        },
                    }}
                />
                usuarios
            </Typography>
            <SearchBar></SearchBar>
            <TableContainer component={Paper} sx={{ mt: 2, minHeight: "60vh" }}>
                <Table aria-label="collapsible table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell sortDirection={orderBy === "fullName" ? order : false}>
                                <TableSortLabel
                                    active={orderBy === "fullName"}
                                    direction={orderBy === "fullName" ? order : "asc"}
                                    onClick={(e) => createSortHandler(e, "fullName")}
                                >
                                    Usuario
                                    {orderBy === "fullName" ? (
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
                                sortDirection={orderBy === "birthDate" ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === "birthDate"}
                                    direction={orderBy === "birthDate" ? order : "asc"}
                                    onClick={(e) => createSortHandler(e, "birthDate")}
                                >
                                    Fecha Nacimiento
                                    {orderBy === "birthDate" ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === "desc"
                                                ? "sorted descending"
                                                : "sorted ascending"}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">telefono</TableCell>
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
                            <TableCell align="right">Accion</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users &&
                            (users.length == 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <Typography textAlign={"center"}>
                                            No se Encontraron resultados
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((user) => <UserRow key={user.id} user={user} />)
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component={"div"}
                count={users ? users?.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ mt: "2rem" }}
            />
        </Container>
    );
};

export default ClientTable;
