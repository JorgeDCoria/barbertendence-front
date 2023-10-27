import { useState, PropsWithChildren } from "react";

import {
    AppointmentForm,
    Scheduler,
    Appointments,
    WeekView,
    TodayButton,
    DateNavigator,
    Toolbar,
    AppointmentTooltip,
    ConfirmationDialog, //@ts-ignore
} from "@devexpress/dx-react-scheduler-material-ui";

import {
    EditingState,
    ViewState,
    IntegratedEditing,
    AppointmentModel, //@ts-ignore
} from "@devexpress/dx-react-scheduler";

import { Box, Paper, Theme, Button, useTheme } from "@mui/material";
import * as dayjs from "dayjs";

import header from "../../assets/serviceImage.jpg";
import { Appointment } from "src/types/Appointment";
import { Barber } from "src/types/Barber";
import { Service } from "src/types/Service";
import CustomAppointmentForm from "./CustomAppointmentForm";
import CustomTimeTableCell from "./CustomTimeTableCell";
import CustomAppointments from "./CustomAppointments";
import { useNotification } from "../../context/notification.context";
import { useNavigate } from "react-router-dom";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import { appointmentService } from "../../service";
import { usePersistData } from "../../hook/usePersistData";
import isSomeOrAfter from "dayjs/plugin/isSameOrAfter";
//import { WeekView } from "node_modules/@devexpress/dx-react-scheduler/dist/dx-react-scheduler";
dayjs.extend(isSomeOrAfter);
interface Props {
    service: Service;
    barber: Barber;
    handleReset: () => void;
}
// const appointmentsData: Appointment[] = [
//     {
//         id: 0,
//         startDate: new Date(2023, 9, 27, 8, 15, 0),
//         endDate: new Date(2023, 9, 27, 9, 15, 0),
//         title: "Reserved",
//         state: "atendido",
//         barberId: "",
//     },
//     {
//         id: 1,
//         startDate: new Date(2023, 9, 27, 10, 15, 0),
//         endDate: new Date(2023, 9, 27, 11, 15, 0),
//         title: "Reserved",
//         state: "pendiente",
//         barberId: "",
//     },
// ];

const filterAppointmentsBeforeToday = (data: Appointment[]) => {
    const currentDate = dayjs();

    console.log(new Date());

    return data.filter((app) => {
        const appointmentStart = dayjs(app.startDate);
        const appointmentEnd = dayjs(app.endDate);
        console.log(appointmentStart);

        return (
            appointmentStart.isSameOrAfter(currentDate) || appointmentEnd.isSameOrAfter(currentDate)
        );
    });
};

const ScheduleUser: React.FC<Props> = ({ service, barber, handleReset }) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    //const [appointments, setAppointments] = useState<Appointment[]>(appointmentsData);

    const [addedAppointment, setAddedAppointment] = useState<Appointment>({} as Appointment);
    const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = useState<boolean>(false);

    const theme: Theme = useTheme();
    const today: Date = new Date();
    const closeMorningHour: number = 12;
    const closeAfternoonHour: number = 20;
    const numWeeksToShow = 3;
    const maxDate: Date = new Date(
        dayjs(today)
            .add(numWeeksToShow - 1, "week")
            .toISOString()
    );
    /**
     * variable shiftTomorrow definida para indicar si el scheduler muestre horarios
     * de 8 a 12 || 16 a 20.
     */
    const [shiftTomorrow, setShifTomorrow] = useState<boolean>(today.getHours() < closeMorningHour);
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    let appointments: Appointment[] = barber?.appointments?.length
        ? filterAppointmentsBeforeToday(barber.appointments)
        : ([] as Appointment[]);

    //appointments = appointments.concat(appointmentsData);
    const { getIdBarberShop, getToken } = usePersistData();
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
        console.log("******* actuando handle commit change ********");

        if (added) {
            // const startingAddedId =
            //     appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 0;
            // setAppointments([...appointments, { id: startingAddedId, ...added }]);
            let newAppointment: Appointment = {
                serviceId: service?.id,
                barberId: barber.id !== undefined ? barber.id : "",
                startDate: added.startDate,
                state: "pendiente",
            };
            appointmentService
                .addAppointment(newAppointment, getIdBarberShop() as string, getToken())
                .then(() => {
                    showNotification("Turno Agendado", "success");
                    //navigate("/user");
                })
                .catch((e: any) => {
                    showNotification("Error, problemas al guardar turno", "error");
                    console.log(e.message);
                });
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
            console.log("estoy en onAdded");
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
                        <Button
                            variant="outlined"
                            onClick={handleClick}
                            endIcon={<ChangeCircleOutlinedIcon />}
                        >
                            {tomorrow ? "AM" : "PM"}
                        </Button>
                    </Box>
                </Box>
            </Toolbar.Root>
        );
    };

    return (
        <Paper sx={{ position: "relative", height: "70vh" }}>
            <Scheduler data={appointments} locale="es">
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
                    endDayHour={shiftTomorrow ? closeMorningHour : closeAfternoonHour}
                    cellDuration={15}
                    excludedDays={[0, 6]}
                    timeTableCellComponent={(props: WeekView.TimeTableCellProps) => (
                        <CustomTimeTableCell
                            closeHour={shiftTomorrow ? closeMorningHour : closeAfternoonHour}
                            today={today}
                            props={props}
                            data={appointments}
                            serviceDuration={service ? service.duration : 0}
                        />
                    )}
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
                <TodayButton messages={{ today: "Hoy" }} />
                <ConfirmationDialog messages={customDialogMessage} />
                {/* <Appointments appointmentComponent={CustomAppointments} /> */}
                {/* <AppointmentTooltip
                    headerComponent={CustomAppointmentTooltipHeader}
                    commandButtonComponent={CustomCommandButton}
                    showCloseButton
                    showDeleteButton
                /> */}
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
