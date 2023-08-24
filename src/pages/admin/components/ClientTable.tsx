import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hook/useStore";
import { actionGetAllUser } from "../../../redux/actions/userAction";

import { Container } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import UserRow from "./UserRow";

const ClientTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.userSate);
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
                <Table aria-label="collapsible table">
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
                        {users && users.map((user) => <UserRow key={user.id} user={user} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ClientTable;
