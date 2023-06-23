import { WeekView } from "@devexpress/dx-react-scheduler-material-ui";
import { useNotification } from "../../context/notification.context";

const CustomTimeTableCell: React.FC<WeekView.TimeTableCellProps> = (props) => {
    const { showNotification } = useNotification();
    const today = new Date();
    const { startDate, onDoubleClick } = props;
    const isInvalid = startDate < today;
    return (
        <WeekView.TimeTableCell
            {...props}
            sx={{}}
            isShaded={isInvalid}
            onDoubleClick={
                isInvalid
                    ? () => {
                          showNotification(
                              "No es posible otorgar turnos con horarios y fechas ya transcurridas",
                              "warning"
                          );
                      }
                    : onDoubleClick
            }
        />
    );
};

export default CustomTimeTableCell;
