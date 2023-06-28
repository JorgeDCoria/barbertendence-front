import { WeekView } from "@devexpress/dx-react-scheduler-material-ui";
import { useNotification } from "../../context/notification.context";
import { Appointment } from "src/types/Appointment";
import dayjs from "dayjs";

interface CustomTimeTableCellProps {
    today: Date;
    props: WeekView.TimeTableCellProps;
    data: Appointment[];
    serviceDuration: number;
}
const CustomTimeTableCell: React.FC<CustomTimeTableCellProps> = ({
    today,
    props,
    data,
    serviceDuration,
}) => {
    const { showNotification } = useNotification();
    const { startDate, onDoubleClick } = props;
    const isInvalid = startDate < today;
    console.log("soy cada celda");

    const verifyAvailableHours = (): boolean => {
        let invalid = false;
        const end = new Date(dayjs(startDate).add(serviceDuration, "minute").toISOString());
        data.forEach((e) => {
            console.log(e);
            if (startDate < new Date(e.endDate) && end > new Date(e.startDate)) {
                invalid = true;
                return;
            }
        });
        return invalid;
    };

    const checkAvailableHours = () => {
        const end = new Date(dayjs(startDate).add(serviceDuration, "minute").toISOString());
        console.log("datos de la celda");

        console.log(startDate);
        console.log(end);
        console.log(verifyAvailableHours());

        if (verifyAvailableHours())
            showNotification(
                "El tiempo de su servicio requiere de tiempo disponible mayor",
                "warning"
            );
        else onDoubleClick();
    };
    return (
        <WeekView.TimeTableCell
            {...props}
            sx={{}}
            isShaded={isInvalid}
            onDoubleClick={
                isInvalid
                    ? () => {
                          showNotification(
                              "No es posible otorgar turnos en horarios y fechas ya transcurridas",
                              "warning"
                          );
                      }
                    : checkAvailableHours
            }
        />
    );
};

export default CustomTimeTableCell;
