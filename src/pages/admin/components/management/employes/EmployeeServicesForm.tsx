import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Theme,
    Typography,
    useTheme,
    List,
    ListItem,
    IconButton,
    ListItemIcon,
    Checkbox,
    ListItemText,
    ListItemButton,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../hook/useStore";
import { actionGetAllServices } from "../../../../../redux/actions/servicesActions";
import Loading from "../../../../../components/Loading/Loading";
import image from "../../../../../assets/service.jpg";
import { Service } from "../../../../../types/Service";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";

const EmployeeServicesForm = () => {
    const dispatch = useAppDispatch();
    const { services } = useAppSelector((state) => state.servicesState);
    const [servicesChecked, setServicesChecked] = useState<Service[]>([]);
    const theme: Theme = useTheme();

    const handleChecked = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, service: Service) => {
        let auxServices = [...servicesChecked];
        const foundService = auxServices.find((s) => s.id == service.id);
        if (foundService) auxServices = auxServices.filter((s) => s.id != foundService.id);
        else auxServices.push(service);
        setServicesChecked(auxServices);
    };

    useEffect(() => {
        dispatch(actionGetAllServices());
    }, []);
    return (
        <Box
            sx={{
                display: "flex",
                pt: 2,
                width: "100%",
                justifyContent: "center",
            }}
        >
            {services ? (
                <List>
                    {services.map((service) => {
                        const labelId = `checkbox-list-label-${service.id}`;

                        return (
                            <ListItem key={service.id} disablePadding>
                                <ListItemButton
                                    role={undefined}
                                    onClick={(e) => handleChecked(e, service)}
                                    dense
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={
                                                servicesChecked.find((s) => s.id == service.id)
                                                    ? true
                                                    : false
                                            }
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ "aria-labelledby": labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={service.name} />
                                    <ListItemIcon
                                        sx={{
                                            display: "flex",
                                            justifyContent: "end",
                                        }}
                                    >
                                        <MiscellaneousServicesIcon />
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            ) : (
                <Loading />
            )}
        </Box>
    );
};

export default EmployeeServicesForm;
