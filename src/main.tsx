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
import { Auth0Provider } from "@auth0/auth0-react";

const DOMAIN = import.meta.env.VITE_APP_AUTH_DOMAIN;
const CLIENT_ID = import.meta.env.VITE_APP_AUTH_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Auth0Provider
            domain={DOMAIN}
            clientId={CLIENT_ID}
            authorizationParams={{ redirect_uri: "http://localhost:5173/user/" }}
        >
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
        </Auth0Provider>
    </React.StrictMode>
);
