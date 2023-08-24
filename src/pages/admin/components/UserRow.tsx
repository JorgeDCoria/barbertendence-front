import React from "react";
import { User } from "../../../types/User";
import {
    TableCell,
    TableRow,
    IconButton,
    Collapse,
    Typography,
    Box,
    Table,
    TableHead,
    TableBody,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import dayjs from "dayjs";

interface UserRowProps {
    user: User;
}
const UserRow: React.FC<UserRowProps> = ({ user }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {user.fullName}
                </TableCell>
                <TableCell align="right">
                    {user.birthDate ? dayjs(user.birthDate).format("DD/MM/YYYY") : " "}
                </TableCell>
                <TableCell align="right">{user.numberPhone}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">Botones</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0, border: "2px solid red" }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
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
                                        {" "}
                                        Cuerpo
                                        {/* {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) /
                                                    100}
                                            </TableCell>
                                        </TableRow>
                                    ))} */}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default UserRow;
