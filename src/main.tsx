import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import theme from "./theme.ts";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "./context/notification.context.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { store } from "./redux/store/index.ts";
import { Provider } from "react-redux";
import es from "dayjs/locale/es";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <NotificationProvider>
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={es}>
                            <CssBaseline />
                            <App />
                        </LocalizationProvider>
                    </ThemeProvider>
                </NotificationProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
