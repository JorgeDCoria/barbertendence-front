import { Box, Container } from "@mui/material";
import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { TabNav } from "src/types/tabNav";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {}
const UserLayout: React.FC<Props> = () => {
    const itemsNav: TabNav[] = [
        { title: "Mis Turnos", url: "", icon: <MenuIcon /> },
        { title: "Nuevo Turno", url: "newOrder", icon: <MenuIcon /> },
        { title: "Mi Perfil", url: "perfil", icon: <MenuIcon /> },
    ];
    return (
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
    );
};

export default UserLayout;
