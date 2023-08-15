import { Checkbox, Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hook/useStore";
import { actionSetSelectBarber } from "../../../redux/actions/barberActions";
import { Barber } from "../../../types/Barber";

const ListBarbersCheck = () => {
    const { barbers, barbersSelected } = useAppSelector((state) => state.barbers);
    // const [barbersSelected, setBarbersSelected] = useState<Barber[]>([]);
    const dispatch = useAppDispatch();

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
        // setBarbersSelected(barbers);
        dispatch(actionSetSelectBarber(barbers));
    };
    //const { barbersSelected: barbers } = useAppSelector((state) => state.barbers);
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
                                />
                            }
                        >
                            <ListItemButton>
                                <ListItemText primary={barber.name} />
                            </ListItemButton>{" "}
                            <Divider sx={{ background: "white" }} />
                        </ListItem>
                    );
                })}
        </List>
    );
};

export default ListBarbersCheck;
