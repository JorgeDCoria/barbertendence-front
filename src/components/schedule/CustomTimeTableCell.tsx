//@ts-ignore
import { WeekView } from "@devexpress/dx-react-scheduler-material-ui";
import { useNotification } from "../../context/notification.context";
import { Appointment } from "src/types/Appointment";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "../../App.css";

interface CustomTimeTableCellProps {
    today: Date;
    props: WeekView.TimeTableCellProps;
    data: Appointment[];
    serviceDuration: number;
    closeHour: number;
}
const CustomTimeTableCell: React.FC<CustomTimeTableCellProps> = ({
    today,
    props,
    data,
    serviceDuration,
    closeHour,
}) => {
    const { showNotification } = useNotification();
    const { startDate, endDate, onDoubleClick } = props;
    dayjs.extend(isBetween);
    const isInvalid = () => {
        let ocup = false;
        if (startDate < today) ocup = true;

        data.forEach((appointment) => {
            if (
                dayjs(startDate).isSame(dayjs(appointment.startDate), "minute") ||
                (appointment.endDate !== undefined &&
                    dayjs(startDate).isBetween(
                        dayjs(appointment.startDate),
                        dayjs(appointment.endDate) ||
                            dayjs(endDate).isBetween(
                                dayjs(appointment.startDate),
                                dayjs(appointment.endDate)
                            )
                    ))
            ) {
                ocup = true;
                return;
            }
        });
        return ocup;
    };

    //no se entiende por que las comparaciones funcionan con el operador && y no con el ||
    const verifyAvailableHours = (startDate: Date, endDate: Date): boolean => {
        let invalid = false;
        data.forEach((e) => {
            console.log(e);
            if (e.endDate && startDate < new Date(e.endDate) && endDate > new Date(e.startDate)) {
                invalid = true;
                return;
            }
        });
        return invalid;
    };

    const checkAvailableHours = () => {
        const endDate = new Date(dayjs(startDate).add(serviceDuration, "minute").toISOString());

        if (dayjs(endDate) > dayjs(startDate).hour(closeHour).minute(0).second(0)) {
            showNotification(
                `SU servicio elegido requiere de mayor tiempo, lo sentimos, nuestras instalaciones finalizan su jornada a las ${closeHour}hs`,
                "warning"
            );
        } else if (verifyAvailableHours(startDate, endDate))
            showNotification(
                "El tiempo de su servicio requiere de tiempo disponible mayor",
                "warning"
            );
        else onDoubleClick();
    };
    return (
        <WeekView.TimeTableCell
            {...props}
            className={isInvalid() ? "shadded" : "cellAviable"}
            onDoubleClick={
                isInvalid()
                    ? () => {
                          showNotification(
                              "Lo sentimos, debe seleccionar un horario diponible",
                              "warning"
                          );
                      }
                    : checkAvailableHours
            }
            onTouchStart={
                isInvalid()
                    ? () => {
                          showNotification(
                              "Lo sentimos, debe seleccionar un horario disponible",
                              "warning"
                          );
                      }
                    : checkAvailableHours
            }
        />
    );
};

export default CustomTimeTableCell;
