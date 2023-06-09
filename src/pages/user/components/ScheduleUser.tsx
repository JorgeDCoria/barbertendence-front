import { useState, useCallback, useEffect } from "react";
import { Box, Paper, Theme, useTheme } from "@mui/material";
//@ts-ignore
import {
    EditingState,
    ViewState,
    IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
//@ts-ignore
import {
    Scheduler,
    DayView,
    Appointments,
    AppointmentForm,
    WeekView,
    MonthView,
    ViewSwitcher,
    TodayButton,
    DateNavigator,
    Toolbar,
    AppointmentTooltip,
    ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import * as dayjs from "dayjs";
import header from "../../../assets/serviceImage.jpg";
import { Appointemnt } from "src/types/Appointment";
//import { WeekView } from "node_modules/@devexpress/dx-react-scheduler/dist/dx-react-scheduler";

const appointmentsData: Appointemnt[] = [
    {
        id: 0,
        startDate: "2023-06-06T09:45",
        endDate: "2023-06-06T11:00",
        title: "Meeting",
    },
    {
        id: 1,
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

interface Props {
    titleService: string;
    duration: number;
}

const ScheduleUser: React.FC<Props> = ({ titleService, duration }) => {
    const [currentDate, setCurrentDate] = useState<string>(
        formattedDate(new Date())
    );
    const [appointments, setAppointments] =
        useState<Appointemnt[]>(appointmentsData);
    const [addedAppointment, setAddedAppointment] = useState<Appointemnt>(
        {} as Appointemnt
    );
    const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] =
        useState<boolean>(false);
    const theme: Theme = useTheme();

    const currentDateChange = (currentDate: string) => {
        setCurrentDate(currentDate);
    };
    useEffect(() => {
        setAddedAppointment({
            title: titleService,
        } as Appointemnt);
    }, [titleService]);
    // ************* custom command Button ****************
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

    // ***************** custom header *************
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

    const CustomRadioGroupComponent: React.FC<{}> = ({}) => (
        <AppointmentForm.RadioGroupProps>
            Soy nuevo radio button
        </AppointmentForm.RadioGroupProps>
    );

    const handleCommitChange = ({
        added,
        changed,
        deleted,
    }: {
        added?: any;
        changed?: any;
        deleted?: number | string;
    }) => {
        if (added) {
            const startingAddedId =
                appointments.length > 0
                    ? appointments[appointments.length - 1].id + 1
                    : 0;
            setAppointments([
                ...appointments,
                { id: startingAddedId, ...added },
            ]);
        }
        if (changed) {
            setAppointments(
                appointments.map((appointment) =>
                    changed[appointment.id]
                        ? { ...appointment, ...changed[appointment.id] }
                        : appointment
                )
            );
        }
        if (deleted !== undefined) {
            setAppointments(
                appointments.filter((appointment) => appointment.id !== deleted)
            );
        }
        setIsAppointmentBeingCreated(false);
    };

    const onAddedAppointmentChange = (appointment: Appointemnt) => {
        appointment.title = addedAppointment.title;

        console.log(appointment);
        appointment.endDate = dayjs(appointment.startDate)
            .add(duration, "minutes")
            .toDate();
        setAddedAppointment(appointment);
        setIsAppointmentBeingCreated(true);
    };

    const customDialogMessage: ConfirmationDialog.LocalizationMessages = {
        confirmDeleteMessage:
            "Estas seguro de que quieres eleiminar este Turno?",
        deleteButton: "Eliminar",
        cancelButton: "Cancelar",
    };
    return (
        <Paper
            sx={{
                height: "80vh",
            }}
        >
            <Scheduler data={appointments}>
                {" "}
                <ViewState
                    currentDate={currentDate}
                    onCurrentDateChange={currentDateChange}
                />
                <EditingState
                    onCommitChanges={handleCommitChange}
                    addedAppointment={addedAppointment}
                    onAddedAppointmentChange={onAddedAppointmentChange}
                />
                {/* <DayView /> */}
                <IntegratedEditing />
                <WeekView
                    startDayHour={9}
                    endDayHour={14}
                    excludedDays={[0, 6]}
                />
                {/* <MonthView /> */}
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <ConfirmationDialog messages={customDialogMessage} />
                <Appointments />
                <AppointmentTooltip
                    headerComponent={CustomAppointmentTooltipHeader}
                    commandButtonComponent={CustomCommandButton}
                    showCloseButton
                    showDeleteButton
                />
                <AppointmentForm
                    radioGroupComponent={CustomRadioGroupComponent}
                />
            </Scheduler>
        </Paper>
    );
};

export default ScheduleUser;
