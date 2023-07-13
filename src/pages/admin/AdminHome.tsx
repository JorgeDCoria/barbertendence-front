import { Box, useMediaQuery, Theme, useTheme, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";

const AdminHome: React.FC = () => {
    const [showSideBar, setShowSideBar] = useState<boolean | undefined>();
    const theme: Theme = useTheme();
    const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));
    const handleShowSideBar = () => {
        setShowSideBar((prev) => !prev);
    };
    useEffect(() => {
        setShowSideBar(isUpSm);
    }, [isUpSm]);
    return (
        <Box position={"relative"} minHeight={"100vh"}>
            <SideBar showSideBar={showSideBar} />
            Admin
            {!isUpSm && (
                <Button
                    onClick={handleShowSideBar}
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 4,
                    }}
                >
                    {showSideBar ? "Close" : "Open"}
                </Button>
            )}
        </Box>
    );
};

export default AdminHome;
