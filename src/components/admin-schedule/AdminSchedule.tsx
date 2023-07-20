import { useState, PropsWithChildren, useEffect } from "react";
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
    DayView,
    Resources,
    GroupingPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
//@ts-ignore
import {
    EditingState,
    ViewState,
    IntegratedEditing,
    AppointmentModel,
    IntegratedGrouping,
    GroupingState,
} from "@devexpress/dx-react-scheduler";

import { Box, Paper, Theme, Button, useTheme } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

import header from "../../assets/serviceImage.jpg";
import { Appointment } from "src/types/Appointment";
import { Barber } from "src/types/Barber";
import { Service } from "src/types/Service";
import CustomAppointmentForm from "./CustomAppointmentForm";
import CustomTimeTableCell from "../schedule/CustomTimeTableCell";
import CustomAppointments from "../schedule/CustomAppointments";
import { useNotification } from "../../context/notification.context";
import { useNavigate } from "react-router-dom";
import { data } from "../../data";
interface BarberData {
    text: string;
    id: number;
}

const barberData: BarberData[] = [
    { id: 1, text: "Alan" },
    { id: 2, text: "Juan" },
    { id: 3, text: "Jorge" },
];

interface Resource {
    fieldName: string;
    title: string;
    instances: BarberData[];
}
interface AdminScheduleProps {
    currentDate: Date;
    handleChangeDate: (date: Date) => void;
}
const AdminSchedule: React.FC<AdminScheduleProps> = ({ currentDate, handleChangeDate }) => {
    const appointmentsData = data;

    const [appointments, setAppointments] = useState<Appointment[]>(appointmentsData);
    // const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [addedAppointment, setAddedAppointment] = useState<Appointment>({} as Appointment);
    const resources: Resource[] = [
        { fieldName: "barberId", title: "Barber", instances: barberData },
    ];
    const grouping = [{ resourceName: "barberId" }];
    console.log(grouping);
    const theme: Theme = useTheme();
    const today: Date = new Date();
    const closeMorningHour: number = 12;
    const closeAfternoonHour: number = 20;
    const numWeeksToShow = 3;
    // const maxDate: Date = new Date(
    //     dayjs(today)
    //         .add(numWeeksToShow - 1, "week")
    //         .toISOString()
    // );
    const currenDateSchedule = new Date(currentDate ? currentDate.toString() : "");
    /**
     * variable shiftTomorrow definida para indicar si el scheduler muestre horarios
     * de 8 a 12 || 16 a 20.
     */
    const [shiftTomorrow, setShifTomorrow] = useState<boolean>(today.getHours() < closeMorningHour);
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    /**
     * funcion encagada de cambiar el estado de shiftTomorrow.
     * @param e
     */
    const handleShiftTomorrow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setShifTomorrow(!shiftTomorrow);
    };

    // const currentDateChange = (currentDate: Date) => {
    //     console.log("************" + currentDate + "*******************");
    //     // const auxToday = new Date(new Date(today).setHours(0, 0, 0, 0));
    //     // if (currentDate >= auxToday && currentDate < maxDate)
    //     //setCurrentDate(currentDate);
    // };

    // const handleCurrentDateChange = (currentDate: Date) => {
    //     console.log("************" + currentDate + "*******************");
    //     const date = dayjs(currentDate);
    //     handleChangeDate(date);
    // };

    const handleCommitChange = ({
        added,
        changed,
        deleted,
    }: {
        added?: Partial<AppointmentModel>;
        changed?: { [key: string]: object };
        deleted?: number | string;
    }) => {
        console.log("******* actuando handle commit change ********");

        if (added) {
            const startingAddedId =
                appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 0;
            setAppointments([...appointments, { id: startingAddedId, ...added }]);
            showNotification("Turno Agendado", "success");
            navigate("/user");
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
    };

    const onAddedAppointmentChange = (appointment: Appointment) => {
        // if (service !== null) {
        //     console.log("estoy en onAdded");
        //     appointment.title = service.name;
        //     appointment.endDate = dayjs(appointment.startDate)
        //         .add(service.duration, "minutes")
        //         .toDate();
        //     //console.log(appointment);
        //     setAddedAppointment(appointment);
        //     setIsAppointmentBeingCreated(true);
        // }
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
        confirmCancelMessage: "¿Esta seguro de descartar el horario y seleccionar otro?",
        discardButton: "Descartar",
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

    useEffect(() => {}, []);
    return (
        <Paper sx={{ position: "relative", height: "80vh", p: 4 }}>
            <Scheduler data={appointments}>
                {" "}
                <ViewState currentDate={currentDate} onCurrentDateChange={handleChangeDate} />
                <EditingState
                    onCommitChanges={handleCommitChange}
                    addedAppointment={addedAppointment}
                    onAddedAppointmentChange={onAddedAppointmentChange}
                />
                <GroupingState grouping={grouping} />
                <WeekView
                    startDayHour={shiftTomorrow ? 8 : 16}
                    endDayHour={shiftTomorrow ? closeMorningHour : closeAfternoonHour}
                    cellDuration={15}
                    excludedDays={[0, 6]}
                    timeTableCellComponent={(props: WeekView.TimeTableCellProps) => (
                        <CustomTimeTableCell
                            closeHour={shiftTomorrow ? closeMorningHour : closeAfternoonHour}
                            today={today}
                            props={props}
                            data={appointments}
                            serviceDuration={0}
                        />
                    )}
                />
                <Appointments appointmentComponent={CustomAppointments} />
                <Resources data={resources} />
                {/* <DayView /> */}
                <IntegratedGrouping />
                <IntegratedEditing />
                {/* <GroupingState grouping={grouping} /> */}
                {/* <DayView
                    intervalCount={3}
                    startDayHour={shiftTomorrow ? 8 : 16}
                    endDayHour={shiftTomorrow ? closeMorningHour : closeAfternoonHour}
                    cellDuration={15}
                    timeTableCellComponent={(props: WeekView.TimeTableCellProps) => (
                        <CustomTimeTableCell
                            closeHour={shiftTomorrow ? closeMorningHour : closeAfternoonHour}
                            today={today}
                            props={props}
                            data={appointments}
                            serviceDuration={0}
                        />
                    )}
                /> */}
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
                {/* <AppointmentTooltip
            headerComponent={CustomAppointmentTooltipHeader}
            commandButtonComponent={CustomCommandButton}
            showCloseButton
            showDeleteButton
        /> */}
                <AppointmentForm
                // basicLayoutComponent={(props: AppointmentForm.BasicLayout) => (
                //     <CustomAppointmentForm
                //         appointmentData={addedAppointment}
                //         service={service}
                //         barber={barber}
                //         {...props}
                //     />
                // )}
                />
                <GroupingPanel />
            </Scheduler>
        </Paper>
    );
};

export default AdminSchedule;
