import { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Theme, Typography, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../hook/useStore";
import { actionGetAllServices } from "../../../../../redux/actions/servicesActions";
import Loading from "../../../../../components/Loading/Loading";
import image from "../../../../../assets/service.jpg";
import { Service } from "../../../../../types/Service";

const EmployeeServicesForm = () => {
    const dispatch = useAppDispatch();
    const { services } = useAppSelector((state) => state.servicesState);
    const [servicesSelected, setServicesSelected] = useState<Service[]>([]);
    const theme: Theme = useTheme();

    const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, service: Service) => {
        let auxServices = [...servicesSelected];
        const foundService = auxServices.find((s) => s.id == service.id);
        if (foundService) auxServices = auxServices.filter((s) => s.id != foundService.id);
        else auxServices.push(service);
        setServicesSelected(auxServices);
    };
    useEffect(() => {
        dispatch(actionGetAllServices());
    }, []);
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                justifyContent: "center",
                gap: 2,
            }}
        >
            {services ? (
                services.map((service) => (
                    <Card
                        key={service.id}
                        onClick={(e) => handleSelect(e, service)}
                        sx={{
                            width: { xs: "90%", sm: "45%", md: "30%" },
                            height: { xs: "100px", sm: "200px" },
                            color: "white",
                            boxShadow: `${
                                servicesSelected.find((s) => s.id == service.id)
                                    ? `2px 6px 10px 1px ${theme.palette.secondary.main}`
                                    : `2px 6px 10px 1px ${theme.palette.primary.dark}`
                            }`,
                            cursor: "pointer",
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            {" "}
                            <CardMedia
                                component={"img"}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                }}
                                src={image}
                            />
                            <Box
                                position={"absolute"}
                                top={0}
                                left={0}
                                p={1}
                                width={"100%"}
                                height={"100%"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                sx={{
                                    background: `${
                                        servicesSelected.find((s) => s.id == service.id)
                                            ? "rgba(61,16,61,0.9)"
                                            : "rgba(0,0,6,0.7)"
                                    }`,
                                    "&:hover": { background: "rgba(61,16,61,0.8)" },
                                }}
                            >
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        // border: "2px solid blue",
                                        height: "100%",
                                    }}
                                >
                                    <Typography
                                        color={theme.palette.secondary.main}
                                        textTransform={"capitalize"}
                                        variant={"h6"}
                                        fontWeight={600}
                                        textAlign={"center"}
                                    >
                                        {service.name}
                                    </Typography>

                                    <Typography
                                        textAlign={"center"}
                                        fontSize={"12px"}
                                        sx={{
                                            display: { xs: "none", sm: "block" },
                                        }}
                                    >
                                        {service.description}
                                    </Typography>
                                    <Typography textAlign={"center"} variant={"h6"}>
                                        {service.duration}min - ${service.duration}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Box>
                    </Card>
                ))
            ) : (
                <Loading />
            )}
        </Box>
    );
};

export default EmployeeServicesForm;
