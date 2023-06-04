import { useState } from "react";
import { Box, Stack, Typography, Theme, useTheme, Grid } from "@mui/material";
import { Service } from "src/types/Service";
import CardService from "./components/CardService";
import CaruselCard from "./components/CaruselCard";
import { Barber } from "src/types/Barber";
import CardBarber from "./components/CardBarber";

import ButtonLg from "./components/ButtonLg";
import { Order } from "src/types/Order";
import ScheduleUser from "./components/ScheduleUser";
const NewOrder = () => {
    const theme: Theme = useTheme();
    const [newOrder, setNewOrder] = useState<Order | null>(null);
    const [serviceSelected, setServiceSelected] = useState<Service | null>(
        null
    );
    const [barberSelected, setBarberSelected] = useState<Barber | null>(null);
    // const today = dayjs();
    // const lastMonday = today.startOf("week");
    // const nextSunday = today.endOf("week").startOf("day");
    // const maxDate = today.add(30, "day");
    // configuracion de tiempo
    // const initAm = dayjs().set('hour',8).startOf('hour');
    // const endAm = dayjs().set('hour',12).endOf('hour');
    // const initPm  = dayjs().set('hour', 16).startOf('hour');
    // const endPm = dayjs().set('hour', 20).endOf('hour');

    // const shouldDisableTime: TimePickerProps<Dayjs>["shouldDisableTime"] = (
    //     value,
    //     view
    // ) => view === "hours" && value.hour() < 8 && value.hour() > 12;

    // const isTimeAvailable = (time: dayjs.Dayjs) => {
    //     // Filtrar horarios que no sean de 08:00 a 12:00 y de 16:00 a 20:00
    //     const startTime1 = time.set("hour", 0);
    //     const endTime1 = time.set("hour", 8);
    //     const startTime2 = time.set("hour", 11);
    //     const endTime2 = time.set("hour", 16);
    //     const startTime3 = time.set("hour", 19);
    //     const endTime3 = time.set("hour", 24);

    // return (
    //     (time.isAfter(startTime1) && time.isBefore(endTime1)) ||
    //     (time.isAfter(startTime2) && time.isBefore(endTime2)) ||
    //     (time.isAfter(startTime3) && time.isBefore(endTime3))
    // );
    // const startTime1 = time
    //     .set("hour", 0)
    //     .set("minute", 0)
    //     .set("second", 0);
    // const endTime1 = time.set("hour", 8).set("minute", 0).set("second", 0);
    // const startTime2 = time
    //     .set("hour", 11)
    //     .set("minute", 30)
    //     .set("second", 0);
    // const endTime2 = time
    //     .set("hour", 16)
    //     .set("minute", 0)
    //     .set("second", 0);
    // const startTime3 = time
    //     .set("hour", 19)
    //     .set("minute", 30)
    //     .set("second", 0);
    // const endTime3 = time
    //     .set("hour", 24)
    //     .set("minute", 0)
    //     .set("second", 0);

    // const conditionOne =
    //     time.isAfter(startTime1) && time.isBefore(endTime1);
    // const conditionTwo =
    //     time.isAfter(startTime2) && time.isBefore(endTime2);
    // return conditionOne && conditionTwo;
    // };

    // const isWeekend = (date: Dayjs): boolean => {
    //     const day = date.day();
    //     return day === 0 || day === 6;
    // };

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

    const handleSelectBarber = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        barber: Barber
    ): void => {
        e.stopPropagation();
        if (!barberSelected) setBarberSelected(barber);
        else if (barberSelected.id === barber.id) setBarberSelected(null);
        else setBarberSelected(barber);
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
                            <CardBarber
                                handleClick={handleSelectBarber}
                                selected={
                                    barberSelected
                                        ? barberSelected.id === b.id
                                        : false
                                }
                                key={b.name}
                                barber={b}
                            />
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
                        sm={10}
                        display={"flex"}
                        justifyContent={"flex-end"}
                    >
                        <Box
                            display={"flex"}
                            justifyContent={"center"}
                            p={4}
                            flexDirection={"column"}
                            gap={4}
                            width={{ xs: "100%" }}
                            alignSelf={"center"}
                        >
                            <ScheduleUser />
                            {/* <DatePicker
                                label="Seleccione una"
                                defaultValue={today}
                                disablePast
                                maxDate={maxDate}
                                shouldDisableDate={isWeekend}
                            />
                            <MobileTimePicker
                                label="Seleccione un horario"
                                defaultValue={dayjs("2022-04-17T15:30")}
                                shouldDisableTime={isTimeAvailable}
                            /> */}
                        </Box>
                    </Grid>{" "}
                    <Grid item xs={12} sm={2}>
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
