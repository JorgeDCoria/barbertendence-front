import { useState, useCallback, useEffect } from "react";
import {
    Box,
    Modal,
    Paper,
    Stack,
    Theme,
    Typography,
    useTheme,
} from "@mui/material";
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
    DayView,
    Appointments,
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
const formattedDateTime = (date: Date): string => {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let hour = String(date.getHours());
    let min = String(date.getMinutes());

    return `${year}-${month}-${day}  ${hour}:${min}`;
};
interface Props {
    titleService: string;
    duration: number;
}

const ScheduleUser: React.FC<Props> = ({
    titleService = "Titulo del Servicio",
    duration = 30,
}) => {
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
    const [showFormModal, setShowFormModal] = useState<boolean>(false);
    const theme: Theme = useTheme();

    const currentDateChange = (currentDate: string) => {
        setCurrentDate(currentDate);
    };
    useEffect(() => {
        setAddedAppointment({
            title: titleService,
        } as Appointemnt);
    }, [titleService]);

    const handleCloseModalForm = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
        e.preventDefault();
        setShowFormModal(false);
    };
    const handleSchedulerDoubleClick = (appointment: Appointemnt) => {
        console.log("Estoy en double click");
        setAddedAppointment(appointment);
        setShowFormModal(true);
    };
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

    // ************************ custom Form ***********************

    // const BasicLayout: React.FC<AppointmentForm.BasicLayoutProps> = ({
    //     appointmentData,
    //     ...restProps
    // }) => {
    //     const onCustomFieldChange = (nextValue: any) => {
    //         onFieldChange({ customField: nextValue });
    //     };

    //     return (
    //         <AppointmentForm.BasicLayout
    //             appointmentData={appointmentData}
    //             {...restProps}
    //         >
    //             <AppointmentForm.Label text="Custom Field" type="title" />
    //             {/* <AppointmentForm.TextEditor
    //                 value={appointmentData.customField}
    //                 onValueChange={onCustomFieldChange}
    //                 placeholder="Custom field"
    //             /> */}
    //             <div>
    //                 <label>Date:</label>
    //                 <span>
    //                     {appointmentData.startDate.toLocaleDateString()}
    //                 </span>
    //             </div>
    //         </AppointmentForm.BasicLayout>
    //     );
    // };
    const CustomBasicLayout = (props: any) => null;

    const BasicLayout: React.FC<AppointmentForm.BasicLayoutProps> = ({
        appointmentData,
        ...restProps
    }) => {
        // console.log("props de custom basic Layout");
        // console.log(` title appointment ${appointmentData.title}`);

        // console.log(...restProps);
        //console.log(appointmentData);
        // if (!appointmentData || !appointmentData.rRule) {
        //     // Manejar el caso en el que appointmentData o rRule sean undefined
        //     return null; // o algún otro valor o mensaje adecuado
        //}
        return (
            <AppointmentForm.BasicLayout
                appointmentData={appointmentData}
                {...restProps}
            >
                <AppointmentForm.Label
                    sx={{
                        color: "red",
                    }}
                    text={"appointmentData.title"}
                    type={"title"}
                />
                <div>
                    <label>Date:</label>
                    <span>
                        {appointmentData.startDate.toLocaleDateString()}
                    </span>
                </div>
            </AppointmentForm.BasicLayout>
        );
    };
    const Layout: React.FC<AppointmentForm.LayoutProps> = ({
        startDate,
        endDate,
        title,
        ...restProps
    }) => {
        console.log("props de custom  Layout");
        //console.log(` custom  Layout ${..}`);

        // console.log(...restProps);
        //console.log(appointmentData);
        // if (!appointmentData || !appointmentData.rRule) {
        //     // Manejar el caso en el que appointmentData o rRule sean undefined
        //     return null; // o algún otro valor o mensaje adecuado
        //}

        return (
            <AppointmentForm.Layout
                {...restProps}
                recurrenceLayoutComponent={recurrenceLayout}
            >
                <div>
                    <label>Date:</label>
                    <span>
                        {startDate
                            ? startDate.toLocaleDateString()
                            : "no lee la fecha"}
                    </span>
                </div>
            </AppointmentForm.Layout>
        );
    };
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

    const onAddedAppointmentChange = (appointment: Appointemnt) => {
        appointment.title = addedAppointment.title;

        appointment.endDate = dayjs(appointment.startDate)
            .add(duration, "minutes")
            .toDate();
        //console.log(appointment);
        setAddedAppointment(appointment);
        setIsAppointmentBeingCreated(true);
    };

    const customDialogMessage: ConfirmationDialog.LocalizationMessages = {
        confirmDeleteMessage:
            "Estas seguro de que quieres eleiminar este Turno?",
        deleteButton: "Eliminar",
        cancelButton: "Cancelar",
    };

    // interface CustomAppointmentFormProps
    //     extends AppointmentForm.BasicLayoutProps {
    //     appointment: Appointemnt;
    // }
    const CustomAppointmentForm: React.FC<AppointmentForm.BasicLayoutProps> = ({
        appointmentData,
        onFieldChange,
        onSave,
        ...restProps
    }) => {
        const [customField, setCustomField] = useState(
            appointmentData.customField
        );

        const handleCustomFieldChange = (value: string) => {
            setCustomField(value);
            onFieldChange({ customField: value });
        };

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            // Realizar acciones adicionales antes de guardar los cambios, si es necesario
            // ...
            // Guardar los cambios
            onSave();
        };
        console.log(appointmentData);

        return (
            <Box
                border={"2px solid red"}
                display={"flex"}
                width={"100%"}
                height={"100%"}
                justifyContent={"center"}
            >
                <Typography variant="h5" color={theme.palette.primary.main}>
                    Datos del Turno
                </Typography>
                <Typography>
                    {formattedDateTime(appointmentData.startDate)}
                </Typography>
                <Typography>
                    {formattedDateTime(appointmentData.endDate)}
                </Typography>
                <form onSubmit={handleSubmit}>
                    {/* Agregar los componentes personalizados que desees */}
                    <h3>Custom Form</h3>
                    <p>Custom field: {customField}</p>
                    <input
                        type="text"
                        value={customField}
                        onChange={(e) =>
                            handleCustomFieldChange(e.target.value)
                        }
                    />
                    <button type="submit">Save</button>
                </form>
            </Box>
        );
    };

    return (
        <>
            <Paper sx={{ height: "70vh" }}>
                <Scheduler
                    data={appointments}
                    // onDoubleClick={handleSchedulerDoubleClick}
                >
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
                        endDayHour={17}
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
                        appointmentData={addedAppointment}
                        basicLayoutComponent={CustomAppointmentForm}
                        //textEditorComponent={null}
                        // textEditorComponent={TextEditor}
                        // booleanEditorComponent={BooleanEditor}
                        // dateEditorComponent={DateEditor}
                    >
                        {/* <BasicLayout /> */}
                        {/* <CustomAppointmentForm /> */}
                    </AppointmentForm>
                </Scheduler>
            </Paper>
        </>
    );
};

export default ScheduleUser;
