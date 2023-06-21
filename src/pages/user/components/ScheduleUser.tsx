import { useState, useEffect, PropsWithChildren } from "react";
import { Box, Paper, Theme, Button, useTheme, Typography } from "@mui/material";
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
import header from "../../../assets/serviceImage.jpg";
import { Appointment } from "src/types/Appointment";
import DateUtility from "../../../utilities/DateUtility";
import { Barber } from "src/types/Barber";
import { Service } from "src/types/Service";
import CardService from "./CardService";
//import { WeekView } from "node_modules/@devexpress/dx-react-scheduler/dist/dx-react-scheduler";

const appointmentsData: Appointment[] = [
    {
        id: 0,
        startDate: "2023-06-20T09:45",
        endDate: "2023-06-06T11:00",
        title: "Meeting",
    },
    {
        id: 1,
        startDate: "2023-06-20T12:00",
        endDate: "2023-06-06T13:30",
        title: "Go to a gym",
    },
];

interface Props {
    service: Service | null;
    barber: Barber | null;
}

const ScheduleUser: React.FC<Props> = ({ service, barber }) => {
    const [currentDate, setCurrentDate] = useState<string>(
        DateUtility.formattedDate(new Date())
    );
    const [appointments, setAppointments] =
        useState<Appointment[]>(appointmentsData);

    const [addedAppointment, setAddedAppointment] = useState<Appointment>(
        {} as Appointment
    );
    const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] =
        useState<boolean>(false);
    /**
     * variable shiftTomorrow definida para indicar si el scheduler muestre horarios
     * de 8 a 12 || 16 a 20.
     */
    const [shiftTomorrow, setShifTomorrow] = useState<boolean>(true);

    const theme: Theme = useTheme();

    /**
     * funcion encagada de cambiar el estado de shiftTomorrow.
     * @param e
     */
    const handleShiftTomorrow = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        setShifTomorrow(!shiftTomorrow);
    };

    const currentDateChange = (currentDate: string) => {
        setCurrentDate(currentDate);
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

    const TextEditor = (props: any) => {
        // eslint-disable-next-line react/destructuring-assignment
        if (props.type === "multilineTextEditor") {
            return null;
        }
        return <AppointmentForm.TextEditor {...props} />;
    };

    const BooleanEditor = (props: any) => {
        return null;
    };

    const DateEditor = (props: any) => {
        console.log("Props en Date");
        console.log(props);
        return null;
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

    const customDialogMessage: ConfirmationDialog.LocalizationMessages = {
        confirmDeleteMessage:
            "Estas seguro de que quieres eleiminar este Turno?",
        deleteButton: "Eliminar",
        cancelButton: "Cancelar",
    };

    //************** Toolbar personalizado ************************* */
    interface CustomToolbarProps extends PropsWithChildren<Toolbar.RootProps> {
        tomorrow: boolean;
        handleClick: () => void;
    }
    const CustomToolbar: React.FC<CustomToolbarProps> = ({
        tomorrow,
        handleClick,
        children,
    }) => {
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

    interface CustomAppointmentFormProps
        extends AppointmentForm.BasicLayoutProps {
        appointmentData: Appointment;
        restProps: any;
    }
    const CustomAppointmentForm: React.FC<CustomAppointmentFormProps> = ({
        appointmentData,
        ...restProps
    }) => {
        console.log({ ...restProps });
        console.log(typeof appointmentData);

        return (
            <Box
                border={"2px solid red"}
                display={"flex"}
                p={8}
                flexDirection={"column"}
                width={"100%"}
                height={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
                {...restProps}
            >
                <Typography variant="h5" color={theme.palette.primary.main}>
                    Datos del Turno
                </Typography>
                <Typography variant="h6">{appointmentData.title}</Typography>
                <Typography variant="h6">Fecha y Hora</Typography>
                <Box display={"flex"} gap={2} alignItems={"center"}>
                    {" "}
                    <Typography variant="h6">Inicio:</Typography>
                    <Typography>
                        {DateUtility.formattedDateTime(
                            appointmentData.startDate
                        )}
                    </Typography>
                </Box>
                {service && <CardService onlyRead service={service} />}

                <Box display={"flex"} gap={2} alignItems={"center"}>
                    {" "}
                    <Typography variant="h6">Finaliza (aprox):</Typography>
                    <Typography>
                        {DateUtility.formattedDateTime(appointmentData.endDate)}
                    </Typography>
                    DC
                </Box>
            </Box>
        );
    };

    return (
        <Paper sx={{ position: "relative", height: "70vh" }}>
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
                {shiftTomorrow ? (
                    <WeekView
                        startDayHour={8}
                        endDayHour={12}
                        cellDuration={15}
                        excludedDays={[0, 6]}
                    />
                ) : (
                    <WeekView
                        startDayHour={16}
                        endDayHour={20}
                        cellDuration={15}
                        excludedDays={[0, 6]}
                    />
                )}
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
                    basicLayoutComponent={(
                        props: AppointmentForm.BasicLayout
                    ) => (
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
