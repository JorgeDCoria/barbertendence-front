import {
    Avatar,
    Checkbox,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Theme,
    useTheme,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../hook/useStore";
import { actionSetSelectBarber } from "../../../redux/actions/barberActions";
import { Barber } from "../../../types/Barber";

const ListBarbersCheck = () => {
    const { barbers, barbersSelected } = useAppSelector((state) => state.barbers);
    // const [barbersSelected, setBarbersSelected] = useState<Barber[]>([]);
    const dispatch = useAppDispatch();
    const theme: Theme = useTheme();

    const findBarber = (barber: Barber): boolean => {
        return barbersSelected.some((b) => barber.id === b.id);
    };
    const handleChekedBarber = (barber: Barber) => {
        const selected = findBarber(barber);
        let barbers: Barber[] = [];
        if (selected) {
            barbers = barbersSelected.filter((b) => b.id !== barber.id);
        } else {
            barbers = [...barbersSelected, barber];
        }

        dispatch(actionSetSelectBarber(barbers));
    };

    return (
        <List>
            {barbers &&
                barbers.map((barber) => {
                    const labelId = `checkbox-list-secondary-label-${barber.id}`;
                    return (
                        <ListItem
                            key={barber.id}
                            secondaryAction={
                                <Checkbox
                                    edge="end"
                                    onChange={() => handleChekedBarber(barber)}
                                    checked={findBarber(barber)}
                                    inputProps={{ "aria-labelledby": labelId }}
                                    sx={{
                                        "&:hover": {
                                            color: "white",
                                        },
                                        "&.Mui-checked": {
                                            color: theme.palette.secondary.main,
                                        },
                                    }}
                                />
                            }
                            disablePadding
                        >
                            <ListItemButton onClick={() => handleChekedBarber(barber)}>
                                <ListItemAvatar>
                                    <Avatar>{barber.name.slice(0, 1)}</Avatar>
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={barber.name} />
                            </ListItemButton>{" "}
                        </ListItem>
                    );
                })}
        </List>
    );
};

export default ListBarbersCheck;
