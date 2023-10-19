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
import { useEffect } from "react";

import banner from "../../assets/banner.jpg";
import CaruselCard from "./components/CaruselCard";
import PaginationCard from "./components/PaginationCard";
import CardOrder from "./components/CardOrder";
import ButtonLg from "./components/ButtonLg";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hook/useStore";
import { actionGetServicesAndBarbers } from "../../redux/actions/barberShopAction";

const orders: any = [
    {
        id: "",
        date: new Date(),
        time: "20:45",
        barber: {
            name: "Juan",
            description: "",
            avatar: "",
            id: "",
        },
        service: {
            id: "",
            description: "",
            duration: 0,
            image: "",
            name: "Corte de pelo",
            price: 800,
        },
    },
    {
        id: "",
        date: new Date(),
        time: "20:45",
        barber: {
            name: "Roberto",
            description: "",
            avatar: "",
            id: "",
        },
        service: {
            id: "",
            description: "",
            duration: 0,
            image: "",
            name: "Corte de pelo",
            price: 800,
        },
    },
    {
        id: "",
        date: new Date(),
        time: "20:45",
        barber: {
            name: "Lautaro",
            description: "",
            avatar: "",
            id: "",
        },
        service: {
            id: "",
            description: "",
            duration: 0,
            image: "",
            name: "Corte de pelo",
            price: 800,
        },
    },
];

const UserHome: React.FC<{}> = ({}) => {
    const theme: Theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only("xs"));
    const dispatch = useAppDispatch();
    useEffect(() => {
        try {
            dispatch(actionGetServicesAndBarbers());
        } catch (e: any) {
            console.log(e.message);
        }
    });
    return (
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
                        <Box
                            width={"100%"}
                            p={2}
                            border={`2px solid ${theme.palette.primary.main}`}
                            borderRadius={"16px"}
                        >
                            {/* Carousel de turnos pendientes */}
                            <CaruselCard>
                                {orders.slice(0, 5).map((order, index) => (
                                    <CardOrder key={index} order={order} />
                                ))}
                            </CaruselCard>
                        </Box>
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
                <PaginationCard orders={orders} orderPerPage={isXs ? 4 : 8} />
            </Stack>
        </Box>
    );
};

export default UserHome;
