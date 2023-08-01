import { useState, PropsWithChildren, useEffect } from "react";

import {
    EditingState,
    ViewState,
    IntegratedEditing,
    AppointmentModel,
    IntegratedGrouping,
    GroupingState,
} from "@devexpress/dx-react-scheduler";
import {
    AppointmentForm,
    Scheduler,
    Appointments,
    TodayButton,
    DateNavigator,
    Toolbar,
    AppointmentTooltip,
    ConfirmationDialog,
    DayView,
    WeekView,
    Resources,
    GroupingPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
    Box,
    Paper,
    Theme,
    Button,
    useTheme,
    Modal,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { Appointment } from "src/types/Appointment";
import CustomTimeTableCell from "../schedule/CustomTimeTableCell";

import { useNotification } from "../../context/notification.context";
import { useNavigate } from "react-router-dom";
import { appointmentsBd, clientsBd } from "../../data/data";
import { historiesBd } from "../../data/histories";
import CustomAdminAppointmentBasicLayout from "./CustomAdminAppointmentBasicLayout";
import { AppointmentProps } from "src/types";

import AdminCustomAppointment from "./AdminCustomAppointment";
import { User } from "src/types/User";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
interface BarberData {
    text: string;
    id: string;
}

const barberData: BarberData[] = [
    { text: "Alan", id: "1" },
    { text: "Juan", id: "2" },
    { text: "Jorge", id: "3" },
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
    const appointmentsData = appointmentsBd;

    const [appointments, setAppointments] = useState<Appointment[]>(appointmentsData);
    // const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [addedAppointment, setAddedAppointment] = useState<Appointment>({} as Appointment);
    const resources: Resource[] = [
        { fieldName: "barberId", title: "Barber", instances: barberData },
    ];
    const grouping = [{ resourceName: "barberId" }];

    const theme: Theme = useTheme();
    const today: Date = new Date();
    const closeMorningHour: number = 12;
    const closeAfternoonHour: number = 20;

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
        console.log("*********** estoy en addded ***********");
        console.log(JSON.stringify(appointment));
        setAddedAppointment(appointment);
    };

    const handleChangeAddedAppointment = <T extends AppointmentProps>(
        prop: T,
        value: Appointment[T]
    ) => {
        let aux = { ...addedAppointment };
        aux[prop] = value;
        setAddedAppointment(aux);
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
                "&:hover": {
                    background: theme.palette.primary.light,
                    color: theme.palette.primary.main,
                },
            }}
            {...restProp}
        />
    );

    const CustomContentComponentTooltip: React.FC<AppointmentTooltip.ContentProps> = ({
        appointmentData,
        appointmentResources,
        ...restProps
    }) => {
        const client: User | undefined = clientsBd.find(
            (user) => user.id === appointmentData.clientId
        );
        console.log({ ...restProps });
        const histories = historiesBd;

        return (
            <AppointmentTooltip.Content
                {...restProps}
                appointmentResources={appointmentResources}
                appointmentData={appointmentData}
            >
                <Box>
                    {client ? (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={
                                    <ExpandMoreIcon
                                        sx={{
                                            color: appointmentResources[0].color.A200,
                                        }}
                                    />
                                }
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    background: appointmentResources[0].color[50],
                                    "&:hover": {
                                        background: appointmentResources[0].color[100],
                                    },
                                }}
                            >
                                <Typography>Historial de: {client.nombreApellido}</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    p: "8px 0px",
                                }}
                            >
                                <TableContainer
                                    sx={{
                                        width: "100%",
                                    }}
                                >
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Servicio</TableCell>
                                                <TableCell>Profesional</TableCell>
                                                <TableCell>Fecha</TableCell>
                                                <TableCell>Asistencia</TableCell>
                                            </TableRow>{" "}
                                        </TableHead>
                                        <TableBody>
                                            {histories.map((h) => (
                                                <TableRow key={h.id}>
                                                    <TableCell>{h.service.name}</TableCell>
                                                    <TableCell>{h.barber.name}</TableCell>
                                                    <TableCell>
                                                        {dayjs(h.date).format(
                                                            "dddd, MMM DD, YYYY - HH:MM"
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {h.state ? (
                                                            <SentimentVerySatisfiedIcon
                                                                sx={{
                                                                    color: "green",
                                                                }}
                                                            />
                                                        ) : (
                                                            <SentimentVeryDissatisfiedIcon
                                                                sx={{
                                                                    color: "red",
                                                                }}
                                                            />
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                    ) : (
                        <Typography textAlign={"center"} color={"red"}>
                            {" "}
                            No se encontraron registros de cliente
                        </Typography>
                    )}
                </Box>
            </AppointmentTooltip.Content>
        );
    };
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

    const CustomAdminComandButtonComponent: React.FC<AppointmentForm.CommandLayoutProps> = (
        props
    ) => {
        console.log(props);

        return (
            <AppointmentForm.CommandLayout {...props}>
                <Button>hola</Button>
            </AppointmentForm.CommandLayout>
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
                {/* <WeekView
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
                /> */}
                <DayView
                    intervalCount={2}
                    startDayHour={shiftTomorrow ? 8 : 16}
                    endDayHour={shiftTomorrow ? closeMorningHour : closeAfternoonHour}
                    cellDuration={15}
                />
                <Appointments appointmentComponent={AdminCustomAppointment} />
                <Resources data={resources} />
                <IntegratedGrouping />
                <IntegratedEditing />
                <AppointmentTooltip
                    // appointmentData={addedAppointment}
                    // headerComponent={CustomAppointmentTooltipHeader}
                    commandButtonComponent={CustomCommandButton}
                    contentComponent={CustomContentComponentTooltip}
                    showCloseButton
                    showDeleteButton
                />
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
                <AppointmentForm
                    // appointmentData={addedAppointment}
                    // LayoutComponent={(props: AppointmentForm.LayoutProps) => (
                    //     <AdminCustomLayout {...props} />
                    // )}
                    commandLayoutComponent={CustomAdminComandButtonComponent}
                    basicLayoutComponent={CustomAdminAppointmentBasicLayout}
                />
                <GroupingPanel />
            </Scheduler>
        </Paper>
    );
};

export default AdminSchedule;
