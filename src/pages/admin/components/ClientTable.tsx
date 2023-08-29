import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hook/useStore";
import { actionGetAllUser } from "../../../redux/actions/userAction";
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
    Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import UserRow from "./UserRow";
import { useNavigate } from "react-router-dom";

const ClientTable: React.FC = () => {
    const theme: Theme = useTheme();
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.userSate);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Usuario</TableCell>
                            <TableCell align="right">Fecha Nacimiento</TableCell>
                            <TableCell align="right">telefono</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Accion</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users &&
                            users
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user) => <UserRow key={user.id} user={user} />)}
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
