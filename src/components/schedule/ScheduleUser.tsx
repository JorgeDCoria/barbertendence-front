import { useState, PropsWithChildren, useEffect } from "react";
import { Box, Paper, Theme, Button, useTheme } from "@mui/material";
//@ts-ignore
import {
    EditingState,
    ViewState,
    IntegratedEditing,
    AppointmentModel,
} from "@devexpress/dx-react-scheduler";
//@ts-ignore
import {
    AppointmentForm,
    Scheduler,
    Appointments,
    WeekView,
    TodayButton,
    DateNavigator,
    Toolbar,
    AppointmentTooltip,
    ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";

import * as dayjs from "dayjs";

import header from "../../assets/serviceImage.jpg";
import { Appointment } from "src/types/Appointment";
import DateUtility from "../../utilities/DateUtility";
import { Barber } from "src/types/Barber";
import { Service } from "src/types/Service";
import CustomAppointmentForm from "./CustomAppointmentForm";
import { useNotification } from "../../context/notification.context";
import CustomTimeTableCell from "./CustomTimeTableCell";
//import { WeekView } from "node_modules/@devexpress/dx-react-scheduler/dist/dx-react-scheduler";

const appointmentsData: Appointment[] = [
    {
        id: 0,
        startDate: "2023-06-20T09:45",
        endDate: "2023-06-20T11:00",
        title: "Reserved",
    },
    {
        id: 1,
        startDate: "2023-06-20T08:00",
        endDate: "2023-06-20T09:00",
        title: "Reserved",
    },
];

interface Props {
    service: Service | null;
    barber: Barber | null;
}

const ScheduleUser: React.FC<Props> = ({ service, barber }) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [currentWeekStart, setCurrentWeekStart] = useState<dayjs.Dayjs>(dayjs().startOf("week"));
    const [appointments, setAppointments] = useState<Appointment[]>(appointmentsData);

    const [addedAppointment, setAddedAppointment] = useState<Appointment>({} as Appointment);
    const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = useState<boolean>(false);
    /**
     * variable shiftTomorrow definida para indicar si el scheduler muestre horarios
     * de 8 a 12 || 16 a 20.
     */
    const [shiftTomorrow, setShifTomorrow] = useState<boolean>(true);

    const theme: Theme = useTheme();
    const today: Date = new Date();
    const numWeeksToShow = 3;
    const maxDate: Date = new Date(
        dayjs(today)
            .add(numWeeksToShow - 1, "week")
            .toISOString()
    );

    // useEffect(() => {
    //     console.log(`se renderiza`);
    // }, [currentDate]);
    /**
     * funcion encagada de cambiar el estado de shiftTomorrow.
     * @param e
     */
    const handleShiftTomorrow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setShifTomorrow(!shiftTomorrow);
    };

    const currentDateChange = (currentDate: Date) => {
        const auxToday = new Date(new Date(today).setHours(0, 0, 0, 0));
        if (currentDate >= auxToday && currentDate < maxDate) setCurrentDate(currentDate);
    };

    const handleCommitChange = ({
        added,
        changed,
        deleted,
    }: {
        added?: Partial<AppointmentModel>;
        changed?: { [key: string]: object };
        deleted?: number | string;
    }) => {
        if (added) {
            const startingAddedId =
                appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 0;
            setAppointments([...appointments, { id: startingAddedId, ...added }]);
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
            setAppointments(appointments.filter((appointment) => appointment.id !== deleted));
        }
        setIsAppointmentBeingCreated(false);
    };

    const onAddedAppointmentChange = (appointment: Appointment) => {
        if (service !== null) {
            appointment.title = service.name;

            appointment.endDate = dayjs(appointment.startDate)
                .add(service.duration, "minutes")
                .toDate();
            //console.log(appointment);
            setAddedAppointment(appointment);
            setIsAppointmentBeingCreated(true);
        }
    };

    // ************* custom command Button ****************
    /**
     * Componente definido para personalizar las propiedades del modal de schedule para
     * una mejor visualizacion, afectan al boton de close y delete
     * @param param0
     * @returns
     */
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
    /**
     * Componente definido para personalizar el header del modal de schedule al
     * visualizar un Appointment.
     * @param param0
     * @returns
     */
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

    /**
     * Objeto que contiene los valores de los textos a mostrar en el schedule
     */
    const customDialogMessage: ConfirmationDialog.LocalizationMessages = {
        confirmDeleteMessage: "Estas seguro de que quieres eleiminar este Turno?",
        deleteButton: "Eliminar",
        cancelButton: "Cancelar",
    };

    //************** Toolbar personalizado ************************* */
    interface CustomToolbarProps extends PropsWithChildren<Toolbar.RootProps> {
        tomorrow: boolean;
        handleClick: () => void;
    }
    const CustomToolbar: React.FC<CustomToolbarProps> = ({ tomorrow, handleClick, children }) => {
        console.log(children);
        return (
            <Toolbar.Root>
                {children}
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ marginLeft: "auto" }}>
                        <Button variant="outlined" onClick={handleClick}>
                            {tomorrow ? "PM" : "AM"}
                        </Button>
                    </Box>
                </Box>
            </Toolbar.Root>
        );
    };

    return (
        <Paper sx={{ position: "relative", height: "70vh" }}>
            <Scheduler data={appointments}>
                {" "}
                <ViewState currentDate={currentDate} onCurrentDateChange={currentDateChange} />
                <EditingState
                    onCommitChanges={handleCommitChange}
                    addedAppointment={addedAppointment}
                    onAddedAppointmentChange={onAddedAppointmentChange}
                />
                {/* <DayView /> */}
                <IntegratedEditing />
                <WeekView
                    startDayHour={shiftTomorrow ? 8 : 16}
                    endDayHour={shiftTomorrow ? 12 : 20}
                    cellDuration={15}
                    excludedDays={[0, 6]}
                    timeTableCellComponent={CustomTimeTableCell}
                />
                {/* <MonthView /> */}
                <Toolbar
                    rootComponent={(toolbarProps: any) => (
                        <CustomToolbar
                            {...toolbarProps}
                            tomorrow={shiftTomorrow}
                            handleClick={handleShiftTomorrow}
                        />
                    )}
                />
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
                    basicLayoutComponent={(props: AppointmentForm.BasicLayout) => (
                        <CustomAppointmentForm
                            appointmentData={addedAppointment}
                            service={service}
                            barber={barber}
                            {...props}
                        />
                    )}
                />
            </Scheduler>
        </Paper>
    );
};

export default ScheduleUser;
