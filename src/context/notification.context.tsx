import { AlertColor } from "@mui/material";
import { createContext, useContext, useState } from "react";
import Notification from "../../src/components/notification/Notification";

type ContextProps = {
    getError: (msg: string) => void;
};
const NotificationContext = createContext<ContextProps | null>(null);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
    //const [] = useState();

    const handleClose = () => {
        setOpen(false);
    };
    const getError = (msg: string) => {
        setSeverity("error");
        setOpen(true);
        setMessage(msg);
    };
    const value = {
        getError,
    };
    return (
        <NotificationContext.Provider value={value}>
            <Notification
                handleClose={handleClose}
                message={message}
                open={open}
                severity={severity}
            />
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("No existe contexto notificacion");
    return context;
};
