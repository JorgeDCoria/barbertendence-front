import { Alert, AlertColor, Snackbar, Typography } from "@mui/material";
import React from "react";

type NotificationProps = {
    open: boolean;
    message: string;
    severity: AlertColor | undefined;
    handleClose: () => void;
};
const Notification: React.FC<NotificationProps> = ({ open, handleClose, message, severity }) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={2500}
            open={open}
            onClose={handleClose}
        >
            <Alert onClose={handleClose}>
                <Typography>{message}</Typography>
            </Alert>
        </Snackbar>
    );
};

export default Notification;
