import {
    Box,
    useMediaQuery,
    Theme,
    useTheme,
    Button,
    Stack,
    Avatar,
    IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import MenuIcon from "@mui/icons-material/Menu";

const AdminHome: React.FC = () => {
    const theme: Theme = useTheme();
    const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
    const [showSideBar, setShowSideBar] = useState<boolean>(isUpMd);

    const drawerWidth = 350;
    const handleShowSideBar = () => {
        setShowSideBar((prev) => !prev);
    };
    useEffect(() => {
        setShowSideBar(isUpMd);
    }, [isUpMd]);
    return (
        <Box minHeight={"100vh"}>
            <Box
                id="admin-nav"
                display={"flex"}
                flexDirection={"row"}
                border={"2px solid red"}
                justifyContent={showSideBar ? "flex-end" : "space-between"}
                sx={{
                    ml: isUpMd && showSideBar ? `${drawerWidth}px` : 0,
                }}
                px={2}
                py={2}
            >
                <IconButton
                    sx={{
                        display: showSideBar ? "none" : "block",
                    }}
                    onClick={handleShowSideBar}
                >
                    <MenuIcon />
                </IconButton>
                <Box display={"flex"} flexDirection={"row"} gap={4}>
                    <Button variant="outlined">Actualizar</Button>
                    <Avatar>JC</Avatar>
                </Box>
            </Box>
            <SideBar
                showSideBar={showSideBar}
                handleShowSideBar={handleShowSideBar}
                isUpMd={isUpMd}
            />
            <Box
                id="admin-section"
                sx={{
                    background: "gray",
                    minHeight: "80vh",
                    ml: isUpMd && showSideBar ? `${drawerWidth}px` : 0,
                }}
            >
                section isUpMd is {isUpMd}
            </Box>
        </Box>
    );
};

export default AdminHome;
