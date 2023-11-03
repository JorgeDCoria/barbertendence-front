import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

import banner from "../../assets/banner.jpg";
import CaruselCard from "./components/CaruselCard";
import PaginationCard from "./components/PaginationCard";
import CardOrder from "./components/CardOrder";
import ButtonLg from "./components/ButtonLg";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import { actionGetServicesAndBarbers } from "../../redux/actions/barberShopAction";
import { usePersistData } from "../../hook/usePersistData";
import { actionGetAppointmentsPending } from "../../redux/actions/appointmentActions";
import Loading from "../../components/Loading/Loading";
import { Appointment } from "../../types";

const UserHome: React.FC<{}> = ({}) => {
    const theme: Theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only("xs"));
    const dispatch = useAppDispatch();
    const { getIdBarberShop, getToken } = usePersistData();
    const [loading, setLoading] = useState<boolean>(true);
    const { appointmentsPending, appointmentsUserHistory } = useAppSelector(
        (state) => state.appointments
    );
    useEffect(() => {
        try {
            dispatch(actionGetServicesAndBarbers()).then(() => {
                if (getToken() && getIdBarberShop()) {
                    dispatch(
                        actionGetAppointmentsPending(getIdBarberShop() as string, getToken())
                    ).then(() => {
                        setLoading(false);
                    });
                }
            });
        } catch (e: any) {
            console.log(e.message);
        }
    }, []);
    return loading ? (
        <Loading />
    ) : (
        <Box width={"100%"}>
            <Stack spacing={3} width={"100%"}>
                <Typography
                    color={theme.palette.primary.main}
                    fontWeight={600}
                    variant="h4"
                    textAlign={"center"}
                >
                    Mis Turnos
                </Typography>
                <Grid container justifyContent={"center"}>
                    <Grid item xs={12} sm={9}>
                        {" "}
                        {appointmentsPending && appointmentsPending.length ? (
                            <Box
                                width={"100%"}
                                p={2}
                                border={`2px solid ${theme.palette.primary.main}`}
                                borderRadius={"16px"}
                            >
                                {/* Carousel de turnos pendientes */}

                                <CaruselCard>
                                    {appointmentsPending.map((app: Appointment, index) => (
                                        <CardOrder key={index} data={app} allowDelete />
                                    ))}
                                </CaruselCard>
                            </Box>
                        ) : (
                            <Box
                                display={"grid"}
                                sx={{
                                    placeContent: "center",

                                    height: "100%",
                                }}
                            >
                                {" "}
                                <Typography variant="h5">
                                    Usted no tiene turnos pendientes
                                </Typography>{" "}
                            </Box>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            height={"100%"}
                            width={"100%"}
                            justifyContent={"center"}
                            mt={{ xs: "16px", sm: "0" }}
                        >
                            {/* Boton agregar turno */}
                            <Link to={"newOrder"}>
                                <ButtonLg label="Agregar Turno" />
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <Card
                    sx={{
                        height: "200px",
                        borderRadius: "16px",
                        position: "relative",
                    }}
                >
                    <CardMedia
                        component={"img"}
                        alt="image banner"
                        src={banner}
                        height={"100%"}
                        width={"100%"}
                        sx={{
                            objectPosition: "center bottom",
                        }}
                    />
                    <CardContent
                        sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: { xs: "100%", sm: "80%", md: "50%" },
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Box display={"flex"} justifyContent={"end"} alignItems={"center"}></Box>
                        <Typography color={"white"} textAlign={"center"}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur
                            ipsa facere distinctio iusto quod ducimus assumenda cupiditate beatae
                            blanditiis voluptate, laudantium voluptatum itaque fuga reiciendis
                            doloribus harum consequuntur dolore laborum.
                        </Typography>
                    </CardContent>
                </Card>
                <Typography
                    color={theme.palette.primary.main}
                    fontWeight={600}
                    variant="h4"
                    textAlign={"center"}
                >
                    Turnos Anteriores
                </Typography>
                {appointmentsUserHistory && (
                    <PaginationCard orders={appointmentsUserHistory} orderPerPage={isXs ? 4 : 8} />
                )}
            </Stack>
        </Box>
    );
};

export default UserHome;
