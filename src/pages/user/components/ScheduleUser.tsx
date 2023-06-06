import { useState } from "react";
import { Box, Paper, Theme, useTheme } from "@mui/material";
//@ts-ignore
import { ViewState } from "@devexpress/dx-react-scheduler";
//@ts-ignore
import {
    Scheduler,
    DayView,
    Appointments,
    WeekView,
    MonthView,
    ViewSwitcher,
    TodayButton,
    DateNavigator,
    Toolbar,
    AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";

import header from "../../../assets/serviceImage.jpg";
//import { WeekView } from "node_modules/@devexpress/dx-react-scheduler/dist/dx-react-scheduler";

const schedulerData = [
    {
        startDate: "2023-06-06T09:45",
        endDate: "2023-06-06T11:00",
        title: "Meeting",
    },
    {
        startDate: "2023-06-06T12:00",
        endDate: "2023-06-06T13:30",
        title: "Go to a gym",
    },
];
const formattedDate = (date: Date): string => {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const ScheduleUser = () => {
    const [currentDate, setCurrentDate] = useState<string>(
        formattedDate(new Date())
    );
    const theme: Theme = useTheme();

    const currentDateChange = (currentDate: string) => {
        setCurrentDate(currentDate);
    };

    const CustomCommandButton: React.FC<{}> = ({ ...restProp }) => (
        <AppointmentTooltip.CommandButton
            sx={{
                background: theme.palette.primary.light,
                color: theme.palette.primary.main,
                "&:hover": {
                    background: theme.palette.primary.dark,
                    color: theme.palette.primary.light,
                },
            }}
            {...restProp}
        />
    );

    type HeadersProps = {
        children: React.ReactNode;
        image: string;
    };
    const CustomAppointmentTooltipHeader: React.FC<HeadersProps> = ({
        children,
        image = header,
        ...restProps
    }) => (
        <AppointmentTooltip.Header
            sx={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "15em",
            }}
            {...restProps}
        ></AppointmentTooltip.Header>
    );

    return (
        <Paper
            sx={{
                height: "80vh",
            }}
        >
            <Scheduler data={schedulerData}>
                {" "}
                <ViewState
                    currentDate={currentDate}
                    onCurrentDateChange={currentDateChange}
                />
                {/* <DayView /> */}
                <WeekView
                    startDayHour={9}
                    endDayHour={14}
                    excludedDays={[0, 6]}
                />
                {/* <MonthView /> */}
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <Appointments />
                <AppointmentTooltip
                    headerComponent={CustomAppointmentTooltipHeader}
                    commandButtonComponent={CustomCommandButton}
                    showCloseButton
                    showDeleteButton
                />
            </Scheduler>
        </Paper>
    );
};

export default ScheduleUser;
