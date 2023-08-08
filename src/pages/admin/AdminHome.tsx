import {
    Box,
    useMediaQuery,
    Theme,
    useTheme,
    Button,
    Stack,
    Avatar,
    IconButton,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import AdminSchedule from "../../components/admin-schedule/AdminSchedule";
import dayjs, { Dayjs } from "dayjs";
import {
    actionGetAppointmentsByBarber,
    actionGetAppointments,
} from "../../redux/actions/appointmentActions";
import Loading from "../../components/Loading/Loading";

const AdminHome: React.FC = () => {
    const theme: Theme = useTheme();
    const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
    const [showSideBar, setShowSideBar] = useState<boolean>(isUpMd);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const dispatch = useDispatch();
    const drawerWidth = 350;
    const handleShowSideBar = () => {
        setShowSideBar((prev) => !prev);
    };
    const handleCurrentDate = (date: Date) => {
        setCurrentDate(date);
    };
    const { appointments } = useSelector((state) => state.appointments);
    console.log(appointments);

    useEffect(() => {
        setShowSideBar(isUpMd);
        dispatch(actionGetAppointments());
    }, [isUpMd]);
    return (
        <Box minHeight={"100vh"}>
            <Box
                id="admin-nav"
                display={"flex"}
                flexDirection={"row"}
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
                currentDate={currentDate}
                handleChangeDate={handleCurrentDate}
            />
            <Box
                id="admin-section"
                sx={{
                    minHeight: "80vh",
                    paddingX: 4,
                    ml: isUpMd && showSideBar ? `${drawerWidth}px` : 0,
                }}
            >
                <Typography variant="h5" align="center" color={theme.palette.primary.main}>
                    {" "}
                    Reservas
                </Typography>
                {appointments ? (
                    <AdminSchedule currentDate={currentDate} handleChangeDate={handleCurrentDate} />
                ) : (
                    <Loading />
                )}
            </Box>
        </Box>
    );
};

export default AdminHome;
