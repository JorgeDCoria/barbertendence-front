import { WeekView } from "@devexpress/dx-react-scheduler-material-ui";

const CustomTimeTableCell: React.FC<WeekView.TimeTableCellProps> = (props) => {
    const today = new Date();
    const { startDate, onDoubleClick } = props;
    const isInvalid = startDate < today;
    return (
        <WeekView.TimeTableCell
            {...props}
            sx={{}}
            isShaded={isInvalid}
            onDoubleClick={isInvalid ? () => {} : onDoubleClick}
        />
    );
};

export default CustomTimeTableCell;
