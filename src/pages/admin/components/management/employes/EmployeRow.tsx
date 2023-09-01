import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Barber } from "../../../../../types/Barber";

interface EmployeRowProps {
    barber: Barber;
}
const EmployeRow: React.FC<EmployeRowProps> = ({ barber }) => {
    return (
        <TableRow
            hover
            sx={{
                "& > *": { borderBottom: "unset" },
            }}
        >
            <TableCell component="th" scope="row">
                {barber.name}
            </TableCell>

            <TableCell align="right">{barber.email}</TableCell>
            <TableCell align="right">{barber.phone}</TableCell>
            <TableCell align="right">Botones</TableCell>
        </TableRow>
    );
};

export default EmployeRow;
