import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React from "react";
import { Order } from "src/types/Order";
import AddIcon from "@mui/icons-material/Add";
import banner from "../../assets/banner.jpg";
import CaruselCard from "./components/CaruselCard";
import PaginationCard from "./components/PaginationCard";
import CardOrder from "./components/CardOrder";

const orders: Order[] = [
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "george",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "Edgar",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "Rodolfo",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "Matias",
        nameService: "Corte de Pelo",
    },
];
const ordersPrev: Order[] = [
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "george",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "Edgar",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "Rodolfo",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "Matias",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "Brayan",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "Lucas",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "Lautaro",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "Roman",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "Leticia",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "Matias",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "Marcos",
        nameService: "Corte de Pelo",
    },
    {
        date: new Date(),
        time: "20:45",
        nameBarber: "Barber",
        nameClient: "Rodrigo",
        nameService: "Corte de Pelo",
    },
];
const UserHome: React.FC<{}> = ({}) => {
    const theme: Theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.only("xs"));

    return (
        <Box width={"100%"}>
            <Stack spacing={3} width={"100%"}>
                <Typography
                    color={theme.palette.primary.main}
                    fontWeight={600}
                    variant="h4"
                    textAlign={"center"}
                >
                    Turnos Pendientes
                </Typography>
                <Grid container justifyContent={"center"}>
                    <Grid item xs={12} sm={9}>
                        <Box
                            width={"100%"}
                            p={2}
                            border={`2px solid ${theme.palette.primary.main}`}
                            borderRadius={"16px"}
                        >
                            {" "}
                            <CaruselCard>
                                {orders.map((order, index) => (
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
                            <Button
                                sx={{
                                    color: "white",
                                    width: "7rem",
                                    background: theme.palette.primary.dark,
                                    boxShadow: `2px 2px 10px 1px ${theme.palette.primary.main}`,
                                    "&:hover": {
                                        background: theme.palette.primary.main,
                                    },
                                }}
                            >
                                <Stack>
                                    <IconButton>
                                        <AddIcon
                                            sx={{
                                                fontSize: "3rem",
                                                color: "white",
                                            }}
                                        />
                                    </IconButton>
                                    <Typography>Agregar Turno</Typography>
                                </Stack>
                            </Button>
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
                        <Box
                            display={"flex"}
                            justifyContent={"end"}
                            alignItems={"center"}
                        ></Box>
                        <Typography color={"white"} textAlign={"center"}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Consequatur ipsa facere distinctio iusto quod
                            ducimus assumenda cupiditate beatae blanditiis
                            voluptate, laudantium voluptatum itaque fuga
                            reiciendis doloribus harum consequuntur dolore
                            laborum.
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

                <PaginationCard
                    orders={ordersPrev}
                    orderPerPage={isXs ? 4 : 8}
                />
            </Stack>
        </Box>
    );
};

export default UserHome;
