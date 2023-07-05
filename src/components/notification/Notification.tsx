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
            autoHideDuration={3500}
            open={open}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={severity} variant={"filled"}>
                <Typography maxWidth={"70ch"}>{message}</Typography>
            </Alert>
        </Snackbar>
    );
};

export default Notification;
