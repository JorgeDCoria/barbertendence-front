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
} from "@mui/material";

import UserRow from "./UserRow";

const ClientTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.userSate);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
                border: "2px solid red",
            }}
        >
            ClientTable
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

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component={"div"}
                        count={users ? users?.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ClientTable;
