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

import { useNotification } from "../../context/notification.context";

import { clientsBd } from "../../data/data";
import { historiesBd } from "../../data/histories";
import CustomAdminAppointmentBasicLayout from "./CustomAdminAppointmentBasicLayout";
import AdminCustomAppointment from "./AdminCustomAppointment";
import { User } from "src/types/User";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { CustomError } from "../../types/CustomError";

import { useAppSelector } from "../../hook/useStore";
import { BarberResource } from "src/types/BarberResource";
import barberAdapter from "../../adapters/barberAdapter";

interface Resource {
    fieldName: string;
    title: string;
    instances: BarberResource[];
}
interface AdminScheduleProps {
    currentDate: Date;
    handleChangeDate: (date: Date) => void;
}
const AdminSchedule: React.FC<AdminScheduleProps> = ({ currentDate, handleChangeDate }) => {
    // const [appointments, setAppointments] = useState<Appointment[]>(appointmentsData);
    const { appointments } = useAppSelector((state) => state.appointments);
    const { barbers } = useAppSelector((state) => state.barbers);
    // const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [addedAppointment, setAddedAppointment] = useState<Appointment>({} as Appointment);
    const [barberData, setBarberData] = useState<BarberResource[]>([] as BarberResource[]);
    const [resources, setResources] = useState<Resource[] | null>(null);

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
    const [formError, setFormError] = useState<CustomError | null>(null);
    const { showNotification } = useNotification();

    useEffect(() => {
        if (barbers) {
            const aux: BarberResource[] = barberAdapter.mapBarberToBarberInstanceResource(barbers);
            setBarberData(aux);
            setResources([{ fieldName: "barberId", title: "Barber", instances: aux }]);
        }
    }, [barbers]);
    console.log(barberData);
    console.log(resources);
    const grouping = [{ resourceName: "barberId" }];
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
            // const startingAddedId =
            //     appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 0;
            //setAppointments([...appointments, { id: startingAddedId, ...added }]);
            showNotification("Turno Agendado", "success");
        }
        if (changed) {
            // setAppointments(
            //     appointments.map((appointment) =>
            //         changed[appointment.id]
            //             ? { ...appointment, ...changed[appointment.id] }
            //             : appointment
            //     )
            // );
        }
        if (deleted !== undefined) {
            //setAppointments(appointments.filter((appointment) => appointment.id !== deleted));
        }
    };

    const onAddedAppointmentChange = (appointment: Appointment) => {
        console.log("*********** estoy en addded ***********");
        console.log(JSON.stringify(appointment));
        setAddedAppointment(appointment);
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
                                <Typography>Historial de: {client.fullName}</Typography>
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
        commitCommand: "Guardar Turno",
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

    const CustomAdminComandButtonComponent: React.FC<AppointmentForm.CommandLayoutProps> = ({
        onCommitButtonClick,
        ...restProps
    }) => {
        console.log(restProps);
        const handleClick = (): void => {
            if (formError?.state) {
                showNotification(formError.message, "warning");
            } else {
                onCommitButtonClick();
            }
        };

        return <AppointmentForm.CommandLayout onCommitButtonClick={handleClick} {...restProps} />;
    };

    //  ************** componentes que permiten agregar props *************

    const getAdditionalProps = () => {
        // Personaliza esta función para devolver las propiedades adicionales que necesitas pasar
        return {
            formError,
            handleFormError: (value: CustomError | null): void => setFormError(value),
            // Agrega más propiedades según sea necesario
        };
    };

    const withAdditionalProps = <T extends object>(
        WrappedComponent: React.FC<T>,
        getAdditionalProps: () => {
            formError: CustomError | null;
            handleFormError: (value: CustomError | null) => void;
        }
    ) => {
        const EnhancedComponent: React.FC<T> = (props) => {
            const additionalProps = getAdditionalProps();

            return <WrappedComponent {...props} {...additionalProps} />;
        };
        return EnhancedComponent;
    };
    const EnhancedCustomAdminAppointmentBasicLayout = withAdditionalProps(
        CustomAdminAppointmentBasicLayout,
        getAdditionalProps
    );

    const AdminCustomTimeTableCell: React.FC<DayView.TimeTableCellProps> = ({
        onDoubleClick,
        ...restProps
    }) => {
        const isValid = restProps.startDate > new Date();
        const handleClick = () => {
            if (isValid) onDoubleClick();
            else showNotification("No se permiten turnos anteriores a la fecha", "warning");
        };
        return (
            <DayView.TimeTableCell
                isShaded={!isValid}
                {...restProps}
                onDoubleClick={handleClick}
                onTouchStart={handleClick}
            />
        );
    };

    return (
        <Paper sx={{ position: "relative", height: "80vh", p: 4 }}>
            {barbers && (
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
                        timeTableCellComponent={(props: DayView.TimeTableCellProps) => (
                            <AdminCustomTimeTableCell {...props} />
                        )}
                    />
                    <Appointments appointmentComponent={AdminCustomAppointment} />
                    <Resources data={resources} />
                    <IntegratedGrouping />
                    <IntegratedEditing />
                    <AppointmentTooltip
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
                    <TodayButton messages={{ today: "Hoy" }} />
                    <ConfirmationDialog messages={customDialogMessage} />
                    <AppointmentForm
                        messages={customDialogMessage}
                        commandLayoutComponent={CustomAdminComandButtonComponent}
                        basicLayoutComponent={EnhancedCustomAdminAppointmentBasicLayout}
                    />
                    <GroupingPanel />
                </Scheduler>
            )}
        </Paper>
    );
};

export default AdminSchedule;
