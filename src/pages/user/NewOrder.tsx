import { useState } from "react";
import { Box, Stack, Typography, Theme, useTheme, Grid } from "@mui/material";
import { Service } from "src/types/Service";
import CardService from "./components/CardService";
import CaruselCard from "./components/CaruselCard";
import { Barber } from "src/types/Barber";
import CardBarber from "./components/CardBarber";
import { DatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import ButtonLg from "./components/ButtonLg";
import { Order } from "src/types/Order";
const NewOrder = () => {
    const theme: Theme = useTheme();
    const [newOrder, setNewOrder] = useState<Order | null>(null);
    const [serviceSelected, setServiceSelected] = useState<Service | null>(
        null
    );
    const [barberSelected, setBarberSelected] = useState<Barber | null>(null);
    const services: Service[] = [
        {
            id: "1",
            name: "corte de pelo",
            duration: 0.5,
            image: "",
            price: 800,
            description:
                "corte de pelo ya sea clasico o con degradado. No incluye diseño/lavado",
        },

        {
            id: "2",
            name: "corte Premium",
            duration: 0.5,
            image: "",
            price: 800,
            description:
                "Corte de pelo ya sea clasico o degradado con un margen de trabajo mas amplio asesoramiento de visagismo y productos premium para un acabado aun mas profesional.",
        },
        {
            id: "3",
            name: "arreglo de barba",
            duration: 0.5,
            image: "",
            price: 800,
            description:
                "Arreglo de barba con disminucion, afeitado completo y/o perfilado.",
        },
        {
            id: "4",
            name: "afeitado tradicional",
            duration: 0.5,
            image: "",
            price: 800,
            description:
                "ageitado o arreglo de barba con el metodo tradicional, toallas calientes/frias y vapor de ozono.",
        },
        {
            id: "5",
            name: "corte niño",
            duration: 0.5,
            image: "",
            price: 800,
            description:
                "Corte de pelo clasico o degradado para niños hasta 12 años ",
        },
        {
            id: "6",
            name: "perfilado de cejas",
            duration: 0.5,
            image: "",
            price: 800,
            description:
                "Arrego de cejas con disminucion, utilizamos tecnicas especializadas para que tus cejas queden implecables.",
        },
    ];
    const barbers: Barber[] = [
        {
            id: "1",
            name: "Juan",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
        {
            id: "2",
            name: "Joquin",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
        {
            id: "3",
            name: "Marcos",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
        {
            id: "4",
            name: "Emiliano",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
        {
            id: "5",
            name: "Ernesto",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
        {
            id: "6",
            name: "Lorenzo",
            description: "cuento con 5 años de experiencia, animate te espero",
            avatar: "",
        },
    ];
    const handleSelectedService = (service: Service): void => {
        // service.selected = true;
        if (!serviceSelected) setServiceSelected(service);
        else if (service.id === serviceSelected.id) setServiceSelected(null);
        else setServiceSelected(service);
    };

    return (
        <Box width={"100%"}>
            <Stack
                component={"form"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"100%"}
            >
                <Typography
                    variant={"h4"}
                    color={"primary"}
                    textAlign={"center"}
                >
                    Agregar Un Nuevo Turno
                </Typography>
                <Box p={2} width={"100%"}>
                    <CaruselCard>
                        {services.map((s) => (
                            <CardService
                                handleSelectedService={handleSelectedService}
                                key={s.id}
                                service={s}
                                selected={
                                    serviceSelected
                                        ? serviceSelected.id === s.id
                                        : false
                                }
                            />
                        ))}
                    </CaruselCard>
                </Box>
                <Typography variant="h4" color={"primary"} textAlign={"center"}>
                    Nuestros Profesionales
                </Typography>
                <Box p={2} width={"100%"}>
                    <CaruselCard numDesktop={4}>
                        {barbers.map((b) => (
                            <CardBarber key={b.name} barber={b} />
                        ))}
                    </CaruselCard>
                </Box>
                <Typography
                    variant="h4"
                    fontFamily={"Poppins"}
                    color={"primary"}
                    textAlign={"center"}
                >
                    ¿Cuando?
                </Typography>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        display={"flex"}
                        justifyContent={"flex-end"}
                    >
                        <Box
                            display={"flex"}
                            justifyContent={"center"}
                            p={4}
                            flexDirection={"column"}
                            gap={4}
                            width={{ xs: "100%", sm: "80%", md: "50%" }}
                            alignSelf={"center"}
                        >
                            <DatePicker
                                label="Seleccione una fecha"
                                defaultValue={dayjs("2022-04-17")}
                            />
                            <MobileTimePicker
                                label="Seleccione un horario"
                                defaultValue={dayjs("2022-04-17T15:30")}
                            />
                        </Box>
                    </Grid>{" "}
                    <Grid item xs={12} sm={4}>
                        <Box
                            height={"100%"}
                            display={"flex"}
                            justifyContent={{ xs: "center", md: "start" }}
                            alignItems={"center"}
                        >
                            <ButtonLg
                                label="Agregar Turno"
                                handleClick={() => {}}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
};

export default NewOrder;
