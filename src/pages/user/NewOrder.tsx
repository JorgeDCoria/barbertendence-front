import { useState, useEffect } from "react";
import {
    Box,
    Stack,
    Typography,
    Grid,
    Stepper,
    Step,
    StepLabel,
    Button,
    useMediaQuery,
    Theme,
    useTheme,
} from "@mui/material";
import { Service, Barber } from "src/types";
import CardService from "./components/CardService";
import CaruselCard from "./components/CaruselCard";
import CardBarber from "./components/CardBarber";

import ScheduleUser from "../../components/schedule/ScheduleUser";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import { actionGetServicesAndBarbers } from "../../redux/actions/barberShopAction";
import Loading from "../../components/Loading/Loading";

const NewOrder = () => {
    //const theme: Theme = useTheme();
    const [activeStep, setActiveStep] = useState<number>(0);
    const [serviceSelected, setServiceSelected] = useState<Service | null>(null);
    const [barberSelected, setBarberSelected] = useState<Barber | null>(null);
    const [barbers, setBarbers] = useState<Barber[] | null>(null);
    const theme: Theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only("xs"));
    const { services } = useAppSelector((state) => state.servicesState);
    const { barbers: barbersState } = useAppSelector((state) => state.barbers);
    const dispatch = useAppDispatch();
    type Step = {
        title: string;
        subTitle: string;
        note: string;
    };
    const steps: Step[] = [
        {
            title: "Nuestro Servicios",
            subTitle: "Servicios",
            note: "¡Renueva tu estilo en nuestra barbería-peluquería de primera clase! Experimenta cortes de cabello y barba excepcionales, con expertos estilistas que te brindarán un look impecable. Además, ofrecemos tratamientos para el cuidado capilar y facial, utilizando productos de alta calidad. Si buscas un servicio de excelencia y un ambiente acogedor, ¡visítanos hoy mismo y descubre tu mejor versión!",
        },
        {
            title: "Los Mejores Profesionales",
            subTitle: "Barber",
            note: "Nuestros talentosos profesionales te esperan con sus habilidades excepcionales. Con años de experiencia y un amor apasionado por su oficio. Desde cortes de tendencia hasta estilos clásicos, su destreza te dejará impresionado. Confía en nuestras manos expertas para transformar tu imagen y realzar tu belleza.",
        },
        {
            title: "Genial, Estas a un paso !!",
            subTitle: "Seleccion de Fecha",
            note: "Solo resta elegir cuando quieres ser atendido, selecciona la fecha y el jorario que mas se acomode a tus tiempos.",
        },
    ];

    const handleNext = () => {
        if (activeStep === 0 && serviceSelected) {
            const barbersFilter = barbersState?.filter((barber) =>
                barber.services?.includes(serviceSelected.id)
            );
            barbersFilter && setBarbers(barbersFilter);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setServiceSelected(null);
        setBarberSelected(null);
        setActiveStep(0);
    };

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
    const handleDisabledNext = (): boolean => {
        if (activeStep === 0 && serviceSelected) return false;
        if (activeStep === 1 && barberSelected) return false;
        return true;
    };
    useEffect(() => {
        if (!barbersState || !services) {
            dispatch(actionGetServicesAndBarbers());
        }
    }, []);
    return barbersState && services ? (
        <Stack
            component={"form"}
            justifyContent={{
                xs: "space-between",
                sm: "space-around",
            }}
            alignItems={"center"}
            width={"100%"}
            minHeight={{ xs: "80vh", md: "100vh" }}
        >
            {activeStep < steps.length && (
                <>
                    <Typography variant={"h4"} color={"primary"} textAlign={"center"}>
                        {steps[activeStep].title}
                    </Typography>
                    <Typography textAlign={"center"} maxWidth={{ xs: "95%", md: "70%" }}>
                        {isXs
                            ? steps[activeStep].note.substring(0, 100) + "..."
                            : steps[activeStep].note}
                    </Typography>
                </>
            )}
            <Stepper activeStep={activeStep} sx={{ width: { sm: "70%", xs: "100%" } }}>
                {steps.map(({ subTitle }, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: { optional?: React.ReactNode } = {};
                    return (
                        <Step key={index} {...stepProps}>
                            <StepLabel {...labelProps}>{subTitle}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            {activeStep === steps.length ? (
                <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            pt: 2,
                        }}
                    >
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </>
            ) : (
                <>
                    {/* ***************** Seleccion de Servicios ******************** */}
                    {activeStep === 0 && (
                        <Box p={2} width={"100%"}>
                            <CaruselCard>
                                {services.map((s) => (
                                    <CardService
                                        handleSelectedService={handleSelectedService}
                                        key={s.id}
                                        service={s}
                                        selected={
                                            serviceSelected ? serviceSelected.id === s.id : false
                                        }
                                    />
                                ))}
                            </CaruselCard>
                        </Box>
                    )}
                    {/* ***************** Seleccion de barbero ******************** */}
                    {activeStep === 1 && (
                        <Box p={2} width={"100%"}>
                            {barbers?.length ? (
                                <CaruselCard numDesktop={4}>
                                    {barbers.map((b) => (
                                        <CardBarber
                                            handleClick={handleSelectBarber}
                                            selected={
                                                barberSelected ? barberSelected.id === b.id : false
                                            }
                                            key={b.name}
                                            barber={b}
                                        />
                                    ))}
                                </CaruselCard>
                            ) : (
                                <Box
                                    display={"grid"}
                                    sx={{
                                        placeContent: "center",
                                    }}
                                >
                                    <Typography textAlign={"center"} maxWidth={"80ch"}>
                                        Lo sentimos, en este momento todos nuestros profesionales
                                        que atienden el servicio elegido estan ocupados. Intentelo o
                                        mas tarde o seleccione otro servicio.
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}
                    {/* ***************** Seleccion de fecha ******************** */}
                    {activeStep === 2 && (
                        <Grid container justifyContent={"center"}>
                            <Grid item xs={12} md={8} display={"flex"} justifyContent={"flex-end"}>
                                <Box
                                    display={"flex"}
                                    justifyContent={"center"}
                                    p={4}
                                    flexDirection={"column"}
                                    gap={4}
                                    width={{ xs: "100%" }}
                                    alignSelf={"center"}
                                >
                                    <ScheduleUser
                                        handleReset={handleReset}
                                        service={serviceSelected ? serviceSelected : null}
                                        barber={barberSelected ? barberSelected : null}
                                    />
                                </Box>
                            </Grid>{" "}
                        </Grid>
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            pt: 2,
                        }}
                    >
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>

                        <Button onClick={handleNext} disabled={handleDisabledNext()}>
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </Box>
                </>
            )}
        </Stack>
    ) : (
        <Loading />
    );
};

export default NewOrder;
