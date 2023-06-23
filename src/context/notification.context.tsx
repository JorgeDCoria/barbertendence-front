import { AlertColor } from "@mui/material";
import { createContext, useContext, useState } from "react";
import Notification from "../../src/components/notification/Notification";

// Propiedades del contexto
type ContextProps = {
    showNotification: (msg: string, serverity: AlertColor) => void;
};
//creando contexto con sus props definidas
const NotificationContext = createContext<ContextProps | null>(null);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
    //const [] = useState();

    const handleClose = () => {
        setOpen(false);
    };
    const showNotification = (msg: string, severity: AlertColor) => {
        setSeverity(severity);
        setOpen(true);
        setMessage(msg);
    };
    const value = {
        showNotification,
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
