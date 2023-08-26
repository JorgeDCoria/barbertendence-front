import React from "react";
import { User } from "../../../types/User";
import { TableCell, TableRow, IconButton, Collapse, Theme, useTheme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import dayjs from "dayjs";
import UserHistoriesTable from "./UserHistoriesTable";

interface UserRowProps {
    user: User;
}
const UserRow: React.FC<UserRowProps> = ({ user }) => {
    const [open, setOpen] = React.useState(false);
    const theme: Theme = useTheme();
    return (
        <>
            <TableRow hover sx={{ "& > *": { borderBottom: "unset" } }}>
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
                    style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                        border: `1px solid ${theme.palette.primary.main}`,
                    }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {user.id && <UserHistoriesTable id={user.id} />}
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default UserRow;
