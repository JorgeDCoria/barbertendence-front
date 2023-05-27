import { Box, Container } from "@mui/material";
import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { TabNav } from "src/types/tabNav";
import MenuIcon from "@mui/icons-material/Menu";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
interface Props {}
const UserLayout: React.FC<Props> = () => {
    const itemsNav: TabNav[] = [
        { title: "Mis Turnos", url: "", icon: <MenuIcon /> },
        { title: "Nuevo Turno", url: "newOrder", icon: <MenuIcon /> },
        { title: "Mi Perfil", url: "perfil", icon: <MenuIcon /> },
    ];
    return (
        <Container maxWidth="xl" sx={{ mb: "24px" }}>
            <NavBar items={itemsNav} />
            <Box pt={10}></Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Outlet />
            </LocalizationProvider>
        </Container>
    );
};

export default UserLayout;
