import { Box, Container } from "@mui/material";
import React from "react";
import NavBar from "./NavBar";
import { Navigate, Outlet } from "react-router-dom";
import { TabNav } from "../../types/tabNav";
import MenuIcon from "@mui/icons-material/Menu";
import { usePersistData } from "../../hook/usePersistData";
import { ROL } from "../../const";

interface Props {}
const UserLayout: React.FC<Props> = () => {
    const { getUser, getIdBarberShop } = usePersistData();
    const itemsNav: TabNav[] = [
        { title: "Mis Turnos", url: "", icon: <MenuIcon /> },
        { title: "Nuevo Turno", url: "newOrder", icon: <MenuIcon /> },
        { title: "Mi Perfil", url: "perfil", icon: <MenuIcon /> },
    ];
    return getUser() && getUser()?.rol === ROL.USERKEY ? (
        <Container
            maxWidth="xl"
            // boxSizing={"border-box"}
            sx={{
                mb: "24px",
                minHeight: "100vh",
            }}
        >
            <NavBar items={itemsNav} />

            <Box
                sx={{ width: "100%", minHeight: "100vh" }}
                pt={8}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Outlet />
            </Box>
        </Container>
    ) : (
        <Navigate to={`/${getIdBarberShop()}/`} />
    );
};

export default UserLayout;
