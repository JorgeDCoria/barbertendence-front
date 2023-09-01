import { TableCell, TableRow, Theme, Tooltip, useTheme } from "@mui/material";
import React from "react";
import { Barber } from "../../../../../types/Barber";
import EditNoteIcon from "@mui/icons-material/EditNote";
interface EmployeRowProps {
    barber: Barber;
}
const EmployeRow: React.FC<EmployeRowProps> = ({ barber }) => {
    const theme: Theme = useTheme();
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
            <TableCell align="right">
                <Tooltip title="Editar">
                    <EditNoteIcon
                        sx={{
                            cursor: "pointer",
                            "&:hover": { color: theme.palette.primary.main },
                        }}
                    />
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};

export default EmployeRow;
